const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const imagesDir = path.join(__dirname, '../src/assets/images')
const bgPath = path.join(imagesDir, 'bg.png')

// 检查文件是否存在
if (!fs.existsSync(bgPath)) {
  console.error('Background image not found:', bgPath)
  process.exit(1)
}

// 压缩背景图片
sharp(bgPath)
  .resize(375, 667, {
    // 缩小尺寸
    fit: 'cover',
    position: 'center'
  })
  .jpeg({
    // 改用 JPEG 格式
    quality: 70,
    progressive: true
  })
  .toFile(bgPath.replace('.png', '.jpg') + '.tmp')
  .then(() => {
    const originalSize = fs.statSync(bgPath).size
    const newPath = bgPath.replace('.png', '.jpg')
    const newSize = fs.statSync(newPath + '.tmp').size

    // 替换原文件
    fs.renameSync(newPath + '.tmp', newPath)
    // 删除原 PNG 文件
    fs.unlinkSync(bgPath)

    console.log('Background image compressed successfully')
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`)
    console.log(`New size: ${(newSize / 1024).toFixed(2)} KB`)
    console.log(`Saved: ${((originalSize - newSize) / 1024).toFixed(2)} KB`)
    console.log(`New file: ${newPath}`)
  })
  .catch(err => {
    console.error('Error compressing background:', err)
    process.exit(1)
  })
