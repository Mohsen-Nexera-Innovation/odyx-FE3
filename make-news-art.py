"""Cut the five Latest-Updates card images out of the client mock.

The mock draws cards 1/4/5 with a slight Y-axis perspective, so each is a
trapezoid on screen: fit the quad, invert the perspective back to a rectangle,
keep only the band above the card's own title.  Then paint out everything the
DOM owns on the real screen — the badge pill (requirement: no baked text), the
carousel chevron that leaks over card 1's edge, and the mock's rounded-corner
background bleed — with a harmonic (diffusion) fill so the soft fields close
without a seam.
"""
from PIL import Image, ImageFilter
import numpy as np, os

SRC = '/Users/khaledrek/Documents/ODYX/odyx-FE3/knowledge_base/screens/043-latest-updates-reference.png'
OUT = '/Users/khaledrek/Documents/ODYX/odyx-FE3/public/img/hv2-news'
S   = 2852 / 2048          # mock device-pixel ratio
R   = 27                   # card corner radius, CSS px
os.makedirs(OUT, exist_ok=True)
im = Image.open(SRC).convert('RGB')

# name, quad TL/TR/BR/BL (mock px), image-band height (CSS px), badge rect (CSS
# px, card-local, generous), extra keep-outs (CSS px, card-local), card field
# colour.  The mock's own fade runs on PAST the band we keep, so the band's last
# row is still a few levels off the flat card field and butts against it as a
# visible line once the card is scaled; the last rows are ramped into the field
# colour so the asset can meet it seamlessly at any size.
CARDS = [
    ('aeedc-event', [(113.5,325.6),(577.0,350.3),(577.0,1107.8),(111.0,1129.5)], 342,
     (12, 14, 120, 76), [(-2, 185, 10, 280)], (0x04, 0x0F, 0x28)),
    ('resin-line',  [(628.0,337.0),(1118.0,337.0),(1118.0,1117.0),(628.0,1117.0)], 364,
     (8, 10, 126, 78), [], (0xF0, 0xF2, 0xF9)),
    ('workflow',    [(1159.0,338.0),(1691.0,338.0),(1691.0,1121.0),(1159.0,1121.0)], 360,
     (10, 12, 134, 82), [], (0x02, 0x0A, 0x1D)),
    ('webinar',     [(1732.0,351.0),(2224.0,342.4),(2224.0,1133.5),(1732.0,1125.4)], 358,
     (8, 10, 128, 80), [], (0xF0, 0xE1, 0xD2)),
    ('partners',    [(2276.5,355.7),(2716.0,334.3),(2716.0,1147.9),(2276.5,1119.9)], 308,
     (12, 14, 126, 78), [], (0x0C, 0x10, 0x21)),
]

def coeffs(dst, src):
    """PERSPECTIVE coefficients mapping output (dst) coords -> input (src)."""
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A += [[x, y, 1, 0, 0, 0, -x*u, -y*u], [0, 0, 0, x, y, 1, -x*v, -y*v]]
        B += [u, v]
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()

def inpaint(arr, hole, iters=900):
    """Harmonic fill: relax the hole toward the average of its neighbours."""
    a = arr.astype(np.float32).copy()
    ys, xs = np.nonzero(hole)
    if not len(ys):
        return arr
    # seed with the mean of the ring around the hole so relaxation converges fast
    ring = np.array(Image.fromarray(hole.astype(np.uint8)*255)
                    .filter(ImageFilter.MaxFilter(13))) > 0
    edge = ring & ~hole
    a[hole] = a[edge].mean(axis=0)
    for _ in range(iters):
        p = np.pad(a, ((1, 1), (1, 1), (0, 0)), mode='edge')
        nb = (p[:-2, 1:-1] + p[2:, 1:-1] + p[1:-1, :-2] + p[1:-1, 2:]) / 4.0
        a[hole] = nb[hole]
    out = arr.copy()
    out[hole] = np.clip(a[hole], 0, 255).astype(np.uint8)
    # feather the patch boundary
    blurred = np.array(Image.fromarray(out).filter(ImageFilter.GaussianBlur(2.4)))
    soft = (np.array(Image.fromarray((hole * 255).astype(np.uint8))
                     .filter(ImageFilter.GaussianBlur(3.0))).astype(np.float32) / 255)[..., None]
    return (out * (1 - soft) + blurred * soft).astype(np.uint8)

for name, quad, band_css, badge, extra, field in CARDS:
    (tl, tr, br, bl) = quad
    w = round((tr[0]-tl[0] + br[0]-bl[0]) / 2)
    h = round((bl[1]-tl[1] + br[1]-tr[1]) / 2)
    band = round(band_css * S)
    flat = im.transform((w, h), Image.PERSPECTIVE,
                        coeffs([(0,0),(w,0),(w,h),(0,h)], quad), Image.BICUBIC)
    a = np.asarray(flat.crop((0, 0, w, band))).copy()

    hole = np.zeros((band, w), bool)
    for (x0, y0, x1, y1) in [badge] + extra:
        hole[max(0, round(y0*S)):round(y1*S), max(0, round(x0*S)):round(x1*S)] = True
    # the mock's page background bleeds outside the card's rounded top corners
    r = round(R * S)
    yy, xx = np.mgrid[0:band, 0:w]
    for cx in (r, w - r):
        hole |= ((yy < r) & (((xx - cx)**2 + (yy - r)**2) > r*r)
                 & ((xx < r) if cx == r else (xx > w - r)))
    a = inpaint(a, hole)

    # ramp the band's last rows into the flat card field
    tail = max(8, round(band * .085))
    ramp = (np.linspace(0, 1, tail) ** 1.5)[:, None, None]
    a[-tail:] = (a[-tail:] * (1 - ramp) + np.array(field, float) * ramp).round().astype(np.uint8)

    css_w = w / S
    T = 3   # trim the mock's own border/edge halo; the ~0.6% zoom is invisible
    art = Image.fromarray(a[T:, T:w-T]).resize(
        (round(css_w*2), round(band_css*2)), Image.LANCZOS)
    art.save(f'{OUT}/{name}.webp', quality=88, method=6)
    print(f'{name}: card {w}x{h}px ({css_w:.1f}x{h/S:.1f} css) band {band_css} css '
          f'-> {art.size}  {os.path.getsize(f"{OUT}/{name}.webp")//1024}KB')
