import { createCanvas, loadImage } from "canvas";
import fs from "fs";

export async function findWhiteGapEdge(base64) {
    const img = await loadImage(base64);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    // 绘制图片
    ctx.drawImage(img, 0, 0);

    // 向output输出图片
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./output/sliderVerify.png", buffer);
  
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const { data, width, height } = imageData;
  
    function isWhite(x, y) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      return r === 255 && g === 255 && b === 255 && a === 255;
    }
  
    for (let x = 0; x < width; x++) {
      let count = 0;
      for (let y = 0; y < height; y++) {
        if (isWhite(x, y)) {
          count++;
          if (count >= 40) {
            // console.log(`白色缺口边缘在 x = ${x} 像素处`);
            return x;
          }
        } else {
          count = 0; // 重置连续计数
        }
      }
    }
  
    console.log('未找到满足条件的白色缺口');
    return -1;
}