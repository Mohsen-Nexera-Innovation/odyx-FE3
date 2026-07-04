// One-off: build a clean transparent cutout of the printer from feat-printer.jpg.
// Flood-fills the navy background inward from the image borders, which preserves
// the printer's interior (chamber) instead of punching white holes through it.
const sharp = require('sharp');
const path = require('path');

const SRC = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, '..', 'public', 'img', 'feat-printer.jpg');
const OUT = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(__dirname, '..', 'public', 'img', 'feat-printer-cutout.png');

// A pixel is "background" if it is navy-ish: blue >= green >= red, not bright, not red.
// Slightly tolerant thresholds so subtle lighting/vignette in the navy still keys out.
function isBg(r, g, b) {
  return b >= g - 10 && g >= r - 10 && b < 135 && r < 95;
}

(async () => {
  const img = sharp(SRC).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  const idx = (x, y) => (y * w + x) * channels;

  const visited = new Uint8Array(w * h);
  const stack = [];
  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (visited[p]) return;
    const i = idx(x, y);
    if (isBg(data[i], data[i + 1], data[i + 2])) {
      visited[p] = 1;
      stack.push(x, y);
    }
  };

  for (let x = 0; x < w; x++) { pushIf(x, 0); pushIf(x, h - 1); }
  for (let y = 0; y < h; y++) { pushIf(0, y); pushIf(w - 1, y); }

  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    const i = idx(x, y);
    data[i + 3] = 0; // transparent
    pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1);
  }

  await sharp(data, { raw: { width: w, height: h, channels } }).png().toFile(OUT);
  const cleared = visited.reduce((a, v) => a + v, 0);
  console.log(`cutout done ${w}x${h}, cleared ${cleared} bg px (${((cleared / (w * h)) * 100).toFixed(1)}%) -> ${OUT}`);
})();
