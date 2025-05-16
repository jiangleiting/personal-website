# 创建目录（如果不存在）
$toolsDir = "assets/images/tools"
if (-not (Test-Path $toolsDir)) {
    New-Item -ItemType Directory -Path $toolsDir -Force
}

# Logo URLs - 使用备用图标
$logos = @{
    "midjourney" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/discord.svg"
    "stable-diffusion" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pytorch.svg"
    "canva" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/canva.svg"
    "adobe-firefly" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/adobe.svg"
    "brusheezy" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/adobephotoshop.svg"
    "dafont" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/fontawesome.svg"
    "flaticon" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/svg.svg"
}

# 下载每个logo
foreach ($logo in $logos.GetEnumerator()) {
    $outputPath = Join-Path $toolsDir "$($logo.Key).svg"
    Write-Host "Downloading $($logo.Key) logo to $outputPath"
    try {
        Invoke-WebRequest -Uri $logo.Value -OutFile $outputPath
        Write-Host "Successfully downloaded $($logo.Key)"
    }
    catch {
        Write-Host "Failed to download $($logo.Key): $_"
    }
} 