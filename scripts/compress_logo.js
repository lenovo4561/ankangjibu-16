const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const logoPath = path.join(__dirname, '../src/assets/images/logo.png')
const outputPath = path.join(__dirname, '../src/assets/images/logo.png')

// 检查文件是否存在
if (!fs.existsSync(logoPath)) {
  console.error('Logo file not found:', logoPath)
  process.exit(1)
}

// 压缩并调整 logo 尺寸为 192x192
sharp(logoPath)
  .resize(192, 192, {
    fit: 'cover',
    position: 'center'
  })
  .png({
    quality: 80,
    compressionLevel: 9
  })
  .toFile(outputPath + '.tmp')
  .then(() => {
    // 替换原文件
    fs.renameSync(outputPath + '.tmp', outputPath)
    console.log('Logo compressed successfully to 192x192')
    console.log('Output path:', outputPath)
  })
  .catch(err => {
    console.error('Error compressing logo:', err)
    process.exit(1)
  })
