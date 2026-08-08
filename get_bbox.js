const fs = require('fs');

function parsePNG(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 8;
  let width, height;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buffer.readUInt32BE(offset + 8);
      height = buffer.readUInt32BE(offset + 12);
      break;
    }
    offset += length + 12;
  }
  return { width, height };
}
console.log(parsePNG('public/images/jaw-real.png'));
