#!/bin/bash

# 1. 清理旧的构建目录
echo "清理旧的构建目录..."
rm -rf build

# 2. 执行项目构建
echo "执行项目构建..."
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
  echo "项目构建失败，请检查错误信息。"
  exit 1
fi

# 3. 获取版本号 (从 package.json 获取)
VERSION=$(node -p "require('./package.json').version")
ZIP_FILENAME="xhs-downloader-v${VERSION}.zip"

# 4. 创建 ZIP 文件
echo "创建 ZIP 文件: ${ZIP_FILENAME}"
cd build
zip -r "../${ZIP_FILENAME}" ./*
cd ..

echo "ZIP 文件已成功生成: ${ZIP_FILENAME}"
echo "您可以将此文件上传到 Chrome 网上应用店。"
