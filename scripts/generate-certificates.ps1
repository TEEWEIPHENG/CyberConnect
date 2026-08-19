$ErrorActionPreference = "Stop"

$certDir = Join-Path $PSScriptRoot "..\certificates"

if (!(Test-Path $certDir)) {
    New-Item -ItemType Directory -Path $certDir | Out-Null
}

Write-Host "Installing local CA..."
mkcert -install

Set-Location $certDir

Write-Host "Generating CyberConnect certificate..."

mkcert `
-cert-file cyberconnect.local.pem `
-key-file cyberconnect.local-key.pem `
"cyberconnect.local" `
"*.cyberconnect.local" `
"localhost" `
"127.0.0.1" `
"::1"

Write-Host ""
Write-Host "Certificates created successfully."