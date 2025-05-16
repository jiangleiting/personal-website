# 创建目录（如果不存在）
$toolsDir = "assets/images/tools"
if (-not (Test-Path $toolsDir)) {
    New-Item -ItemType Directory -Path $toolsDir -Force
}

# Logo URLs
$logos = @{
    "midjourney" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/midjourney.svg"
    "stable-diffusion" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/stablediffusion.svg"
    "canva" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/canva.svg"
    "adobe-firefly" = "https://www.adobe.com/content/dam/cc/icons/firefly.svg"
    "unsplash" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/unsplash.svg"
    "pexels" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pexels.svg"
    "pixabay" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pixabay.svg"
    "freepik" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/freepik.svg"
}

# 下载每个logo
foreach ($logo in $logos.GetEnumerator()) {
    $outputPath = Join-Path $toolsDir "$($logo.Key).svg"
    Write-Host "Downloading $($logo.Key) logo to $outputPath"
    Invoke-WebRequest -Uri $logo.Value -OutFile $outputPath
} 