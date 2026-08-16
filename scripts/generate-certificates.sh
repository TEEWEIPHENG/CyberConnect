#!/bin/bash

set -e

CERT_DIR="$(dirname "$0")/../certificates"

mkdir -p "$CERT_DIR"

cd "$CERT_DIR"

echo "Installing local CA..."
mkcert -install

echo "Generating certificate..."

mkcert \
-cert-file cyberconnect.local.pem \
-key-file cyberconnect.local-key.pem \
cyberconnect.local \
'*.cyberconnect.local' \
localhost \
127.0.0.1 \
::1

echo ""
echo "Certificates created successfully."