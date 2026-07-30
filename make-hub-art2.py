# Cuts the Store / Registration product art for the home-v2 ecosystem hub out
# of the client mock (knowledge_base/screens/042-hub-store-registration-reference.png,
# 2846x962 — the hub's SECOND row, shot with the row-1/row-2 gutter still in
# frame at the top, so the card box is y52..927 and the container x3..2839).
#
# Same approach (and the same helpers) as make-hub-art.py for row 1: no matting,
# no generation — a soft-feathered patch of the mock, placed back at its exact
# reference-relative position over a card background that matches the mock's
# flat #F4F6FC field. The only thing taken out of the patch is the mock's own
# copy (headline / body tails and the pale marker band behind them), because the
# DOM re-draws every word.
#
#   python3 make-hub-art2.py \
#     knowledge_base/screens/042-hub-store-registration-reference.png \
#     public/img/hv2-hub

import os
import sys

import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1] if len(sys.argv) > 1 else "knowledge_base/screens/042-hub-store-registration-reference.png"
OUT = sys.argv[2] if len(sys.argv) > 2 else "public/img/hv2-hub"

# Row geometry in the reference (native px): the card box, measured off the
# gutters either side of it (centres y44 / y934.5, gutter 14) — 875 tall, i.e.
# 11px shorter than row 1's 886.
CARD_T, CARD_B = 52, 927


def ramp(n, f, invert=False):
    """0->1 linear ramp of length f at the start of an n-long axis."""
    v = np.ones(n)
    if f > 0:
        v[:f] = np.linspace(0, 1, f)
    return v[::-1] if invert else v


def cut(x0, x1, keepouts, feather, out_name):
    im = Image.open(SRC).convert("RGB")
    patch = im.crop((x0, CARD_T, x1, CARD_B))
    w, h = patch.size
    fl, fr, ft, fb = feather

    a = np.ones((h, w), np.float32)
    a *= ramp(w, fl)[None, :]
    a *= ramp(w, fr, True)[None, :]
    a *= ramp(h, ft)[:, None]
    a *= ramp(h, fb, True)[:, None]

    # Soft keep-outs: DOM text sits here, so the mock's own text (and the pale
    # highlight behind it) has to go. Grown by f/2 first because the blur that
    # softens the edge also eats into the erased area.
    erase = np.zeros((h, w), np.float32)
    for (kx0, ky0, kx1, ky1, f) in keepouts:
        g = f // 2
        erase[max(ky0 - CARD_T - g, 0):ky1 - CARD_T + g,
              max(kx0 - x0 - g, 0):kx1 - x0 + g] = 1
        erase = np.asarray(
            Image.fromarray((erase * 255).astype(np.uint8))
            .filter(ImageFilter.GaussianBlur(f / 2.2))
        ).astype(np.float32) / 255
    a *= 1 - erase

    rgba = np.dstack([np.asarray(patch), (a * 255).astype(np.uint8)])
    img = Image.fromarray(rgba, "RGBA")
    img.save(f"{OUT}/{out_name}", "WEBP", quality=88, method=6)
    print(out_name, img.size)


os.makedirs(OUT, exist_ok=True)

# --- Store: resin bottles + carton on the lit pedestal --------------------
# Cut at x380 — left of the pedestal's own tip (x425) and of its blue floor
# glow, so the feather never eats into a product. Flush with the card's right
# edge (x1414) so the faint background arc up there survives intact.
cut(
    380, 1414,
    keepouts=[
        (380, 216, 648, 306, 26),   # "You Need." tail + its band
        (380, 292, 414, 372, 22),   # "In One Place." band tail
        (380, 448, 518, 512, 24),   # "and more -" tail + band
        (380, 502, 404, 566, 22),   # "your door." band tail
    ],
    feather=(26, 0, 22, 14),
    out_name="store-shelf.webp",
)

# --- Registration: shielded device on its base ----------------------------
# Cut at x1836 — just left of the base plate's tip (x1858) and right of the
# CTA (ends x1828). The body copy runs to x1853, so its tail is a keep-out.
cut(
    1836, 2839,
    keepouts=[
        (1836, 216, 2062, 392, 26),   # both headline tails + their bands
        (1836, 448, 1890, 570, 24),   # both body-copy tails + their bands
    ],
    feather=(20, 0, 22, 14),
    out_name="registration-device.webp",
)
