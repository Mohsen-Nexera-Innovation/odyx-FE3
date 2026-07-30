# Cuts the Learning / Support product art for the home-v2 ecosystem hub out of
# the client mock (knowledge_base/screens/041-hub-learning-support-reference.png,
# 2850x1116 = that row cropped at the container's own edges).
#
# Same approach as the ecosystem patches on this screen: no matting, no
# generation — a soft-feathered patch of the mock, placed back at its exact
# reference-relative position over a card background that matches the mock's
# flat #F4F6FC field. Anything the DOM re-draws is taken out of the patch: the
# headline tails are erased from its alpha, and the mock's chip rail is painted
# back out of the artwork so the DOM chips can be translucent over the laptop's
# screen the way the mock's are.
#
#   python3 make-hub-art.py \
#     knowledge_base/screens/041-hub-learning-support-reference.png \
#     public/img/hv2-hub

import numpy as np
from PIL import Image, ImageFilter

import sys
SRC = sys.argv[1] if len(sys.argv) > 1 else "knowledge_base/screens/041-hub-learning-support-reference.png"
OUT = sys.argv[2] if len(sys.argv) > 2 else "public/img/hv2-hub"

# Row geometry in the reference (native px).
CARD_T, CARD_B = 92, 978

def rebuild_rail(im, bands, blur=4.5):
    """Paint the mock's own chip rail out of the laptop art.

    The chips are opaque in the mock, so what they cover has to be rebuilt.
    Right of the laptop's screen edge there is nothing but the card's own light
    field, and left of it the screen carries on — so each band is filled by
    repeating ONE clean source row (the row just outside the rail) shifted
    along the edge's slope. Blending the rows above and below instead drags the
    base's bright right corner up into the screen and leaves a pale strip.

    bands: (x0, x1, y0, y1, src_row, slope). Everything rebuilt sits under a
    DOM chip on desktop, so only the seams have to be convincing — and it lets
    the DOM chips be translucent over the screen the way the mock's are.
    """
    a = np.asarray(im).astype(np.float32)
    for (x0, x1, y0, y1, ys, slope) in bands:
        src = a[ys].copy()
        for y in range(y0, y1):
            dx = int(round(slope * (y - ys)))
            a[y, x0:x1] = np.roll(src, dx, axis=0)[x0:x1]
    out = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    # Blur over the rebuilt strip: repeating one row turns anything in it (the
    # mock's faint background arc) into a vertical stripe, and the mock's own
    # screen edge is soft anyway.
    reg = out.crop((min(b[0] for b in bands), min(b[2] for b in bands),
                    max(b[1] for b in bands), max(b[3] for b in bands)))
    out.paste(reg.filter(ImageFilter.GaussianBlur(blur)),
              (min(b[0] for b in bands), min(b[2] for b in bands)))
    return out

def ramp(n, f, invert=False):
    """0->1 linear ramp of length f at the start of an n-long axis."""
    v = np.ones(n)
    if f > 0:
        v[:f] = np.linspace(0, 1, f)
    return v[::-1] if invert else v

def cut(x0, x1, keepouts, holes, feather, out_name, rebuild=None):
    im = Image.open(SRC).convert("RGB")
    if rebuild:
        im = rebuild_rail(im, rebuild)
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

    # Hard holes under the chips (2px feather): the DOM chip is opaque and
    # covers each hole with room to spare.
    hole = np.zeros((h, w), np.float32)
    for (hx0, hy0, hx1, hy1) in holes:
        hole[hy0 - CARD_T:hy1 - CARD_T, max(hx0 - x0, 0):hx1 - x0] = 1
    if holes:
        hole = np.asarray(
            Image.fromarray((hole * 255).astype(np.uint8))
            .filter(ImageFilter.GaussianBlur(1.6))
        ).astype(np.float32) / 255
    a *= 1 - hole

    rgba = np.dstack([np.asarray(patch), (a * 255).astype(np.uint8)])
    img = Image.fromarray(rgba, "RGBA")
    img.save(f"{OUT}/{out_name}", "WEBP", quality=88, method=6)
    print(out_name, img.size)

import os
os.makedirs(OUT, exist_ok=True)

# --- Learning: laptop + its blue foot glow -------------------------------
cut(
    395, 1258,
    keepouts=[
        (395, 258, 700, 452, 26),   # "Master Digital Dentistry." tail + highlight
        (395, 496, 448, 630, 22),   # body-copy highlight tail
    ],
    holes=[],
    feather=(24, 26, 22, 22),
    out_name="learning-laptop.webp",
    # The mock's own chip boxes, rebuilt out of the art (DOM owns the chips).
    # The chip rail, in two bands: the screen's edge above the hinge (source
    # row 340, the edge's own slope) and the base's right corner below it
    # (source row 812, which recedes faster). The seam between them falls
    # inside the fourth chip.
    rebuild=[
        (1092, 1258, 348, 752, 340, -0.22),
        (1092, 1258, 752, 806, 812, -0.55),
    ],
)

# --- Support: headset on its lit pedestal --------------------------------
cut(
    1830, 2508,
    keepouts=[(1830, 344, 1992, 432, 24)],   # "Us." + highlight
    holes=[],
    feather=(24, 26, 22, 22),
    out_name="support-headset.webp",
)
