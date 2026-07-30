// Builds the Clinical Applications deck art for the Home V2 screen.
//
// The five cards in the client mock are dark clinical close-ups in a shared
// visual language. Only ~20% of each rear card is visible in the resting
// stack, so every crop is pushed right until its subject sits in the left
// fifth of the frame — otherwise the slivers read as empty dark panels.
//
//   node make-clinical-cards.js

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Card box in the mock: 680 x 585 at a 2048px viewport.
const RATIO = 680 / 585;
const OUT_W = 1400;
const OUT_H = Math.round(OUT_W / RATIO);
const SRC_DIR = path.join(__dirname, "public/img");
const OUT_DIR = path.join(__dirname, "public/img/hv2-clinical");

// `left` is the crop origin in the 1280x853 source. Crop height is always the
// full 853px, so width is fixed at 853 * RATIO and left maxes out at 289.
const CARDS = [
  { out: "restorative.webp", src: "crowns.jpg", left: 240 },
  { out: "prosthetics.webp", src: "denture.jpg", left: 289 },
  { out: "implant-dentistry.webp", src: "implant.jpg", left: 289 },
  { out: "dental-models.webp", src: "temp.jpg", left: 289 },
  { out: "clear-aligners.webp", src: "ortho.jpg", left: 200 },
];

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const c of CARDS) {
    const src = path.join(SRC_DIR, c.src);
    const { width, height } = await sharp(src).metadata();
    const cropW = Math.round(height * RATIO);
    const left = Math.min(c.left, width - cropW);
    await sharp(src)
      .extract({ left, top: 0, width: cropW, height })
      .resize(OUT_W, OUT_H, { fit: "cover" })
      // Deck art sits under a cool veil; a touch of contrast keeps the
      // subject readable once the veil lands on the rear cards.
      .modulate({ saturation: 1.06 })
      .webp({ quality: 84, effort: 5 })
      .toFile(path.join(OUT_DIR, c.out));
    console.log(`${c.out}  <- ${c.src} @${left} (${cropW}x${height})`);
  }
})();
