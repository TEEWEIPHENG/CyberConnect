# Local Development Certificates

This directory stores local TLS certificates generated with mkcert.

These certificates are trusted only on the local development machine.

Never commit certificate files to Git.

Generate certificates:

Windows

```powershell
./scripts/generate-certificates.ps1
```

Linux/macOS

```bash
chmod +x infrastructure/docker/scripts/generate-certificates.sh
./scripts/generate-certificates.sh
```