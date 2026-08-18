#!/usr/bin/env bash

set -euo pipefail

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

BACKUP_DIR="./backups/keycloak/${TIMESTAMP}"

mkdir -p "$BACKUP_DIR/database"
mkdir -p "$BACKUP_DIR/realm"

echo "Backing up Keycloak database..."

docker exec cyberconnect-keycloak-db \
    pg_dump \
    -U keycloak \
    -d keycloak \
    | gzip > "$BACKUP_DIR/database/keycloak.sql.gz"

echo "Exporting Keycloak realm..."

docker exec cyberconnect-keycloak \
    /opt/keycloak/bin/kc.sh export \
    --dir /tmp/keycloak-export \
    --realm cyberconnect

docker cp \
    cyberconnect-keycloak:/tmp/keycloak-export/. \
    "$BACKUP_DIR/realm/"

echo "Backup completed:"
echo "$BACKUP_DIR"