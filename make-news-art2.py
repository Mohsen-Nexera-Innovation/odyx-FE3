"""Art for the three carousel items past the mock's five.

The mock only draws five cards but paginates in four dots, so the real deck runs
eight items.  These three are cut from the repo's existing photography (no image
generation available here) to the same 382x360 image-band ratio the mock's cards
use, and toned to sit on their card's field: darkened for the navy card, warmed
for the beige one.
"""
from PIL import Image, ImageEnhance
import os

OUT = '/Users/khaledrek/Documents/ODYX/odyx-FE3/public/img/hv2-news'
IN = '/Users/khaledrek/Documents/ODYX/odyx-FE3/public/img'
AR = 382 / 360          # card image-band ratio
W = 764                 # 2x the widest card

JOBS = [
    # src, out, focal x/y (0..1), zoom, brightness, colour, warm tint
    ('news-3.jpg', 'design-suite.webp', 0.44, 0.42, 1.30, 0.72, 0.92, None),
    ('news-1.jpg', 'open-house.webp',   0.34, 0.46, 1.18, 1.02, 1.00, None),
    ('news-2.jpg', 'scan-live.webp',    0.42, 0.44, 1.22, 1.00, 0.90, (1.06, 1.0, 0.92)),
]

for src, out, fx, fy, zoom, bright, color, warm in JOBS:
    im = Image.open(f'{IN}/{src}').convert('RGB')
    w, h = im.size
    # largest AR-ratio window that fits, then zoom in on the focal point
    cw, ch = (h * AR, h) if w / h > AR else (w, w / AR)
    cw, ch = cw / zoom, ch / zoom
    cx, cy = fx * w, fy * h
    x0 = min(max(cx - cw / 2, 0), w - cw)
    y0 = min(max(cy - ch / 2, 0), h - ch)
    im = im.crop((round(x0), round(y0), round(x0 + cw), round(y0 + ch)))
    im = im.resize((W, round(W / AR)), Image.LANCZOS)
    im = ImageEnhance.Brightness(im).enhance(bright)
    im = ImageEnhance.Color(im).enhance(color)
    if warm:
        r, g, b = im.split()
        im = Image.merge('RGB', (r.point(lambda v: min(255, round(v*warm[0]))),
                                g.point(lambda v: min(255, round(v*warm[1]))),
                                b.point(lambda v: min(255, round(v*warm[2])))))
    im.save(f'{OUT}/{out}', quality=86, method=6)
    print(out, im.size, os.path.getsize(f'{OUT}/{out}') // 1024, 'KB')
