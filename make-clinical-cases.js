// Builds the Clinical Cases deck art for the Home V2 screen.
//
// Different crop brief from make-clinical-cards.js: this deck fans the other
// way, so the active card carries its copy over the art's LEFT third while the
// rear cards only show a narrow left strip. Every crop therefore pushes its
// subject as far right as the source allows (dark negative space under the
// scrim) while still leaving some subject in the left strip, so a rear sliver
// never reads as an empty dark panel.
//
//   node make-clinical-cases.js

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Card box at a 2048px viewport: 700 x 504. That is the *pre-perspective* box
// (it projects to the reference's 631 wide), so it is the ratio the art has to
// match — cutting to the projected 631x504 instead would leave object-fit:cover
// trimming ~9% off the top and bottom of every card.
const RATIO = 700 / 504;
const OUT_W = 1700;
const OUT_H = Math.round(OUT_W / RATIO);
const SRC_DIR = path.join(__dirname, "public/img");
const OUT_DIR = path.join(__dirname, "public/img/hv2-cases");

// Crop window in the 1280x853 sources. Trimming the frame to 740px tall buys
// ~250px of horizontal room, which is what moves each subject clear of the copy
// column: at this crop the implant bridge starts at 36% of the frame, matching
// the reference. Going shorter buys more offset but zooms in far enough that the
// subject fills the copy area again, which is worse. `left` is clamped to the
// widest legal offset per source, so all four land on the same 252.
const CROP_TOP = 60;
const CROP_H = 740;
const CARDS = [
  { out: "implant.webp", src: "crowns.jpg", left: 252 },
  { out: "restorative.webp", src: "temp.jpg", left: 252 },
  { out: "surgical.webp", src: "implant.jpg", left: 252 },
  { out: "orthodontic.webp", src: "ortho.jpg", left: 252 },
];

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const c of CARDS) {
    const src = path.join(SRC_DIR, c.src);
    const { width, height } = await sharp(src).metadata();
    const cropH = Math.min(CROP_H, height - CROP_TOP);
    const cropW = Math.round(cropH * RATIO);
    const left = Math.min(c.left, width - cropW);
    await sharp(src)
      .extract({ left, top: CROP_TOP, width: cropW, height: cropH })
      .resize(OUT_W, OUT_H, { fit: "cover" })
      // One grade across the four so the fan reads as a single set.
      .modulate({ saturation: 1.05, brightness: 1.02 })
      .webp({ quality: 86, effort: 5 })
      .toFile(path.join(OUT_DIR, c.out));
    console.log(`${c.out}  <- ${c.src} @${left},${CROP_TOP} (${cropW}x${cropH})`);
  }
})();
