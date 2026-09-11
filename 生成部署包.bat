@echo off
chcp 65001 >nul
cd /d "%~dp0"
node build.mjs
if errorlevel 1 (
  echo 生成失败，请检查上面的错误信息。未更新部署包。
  pause
  exit /b 1
)
powershell -NoProfile -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'anthocyanin-pages.zip' -Force"
if errorlevel 1 (
  echo 压缩失败。请手动压缩 dist 中的全部文件。
  pause
  exit /b 1
)
echo 已生成 anthocyanin-pages.zip，可上传到 Cloudflare Pages。
pause
