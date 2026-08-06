#!/usr/bin/env bash

################################################################################
# CyberConnect Development Environment
#
# Start Docker Compose stack
#
# Usage:
#   ./up.sh
#
################################################################################

set -euo pipefail


################################################################################
# Configuration
################################################################################

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

DOCKER_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

COMPOSE_FILE="$DOCKER_DIR/compose.yml"

OVERRIDE_FILE="$DOCKER_DIR/compose.override.yml"


################################################################################
# Colors
################################################################################

GREEN="\033[0;32m"
CYAN="\033[0;36m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"


################################################################################
# Functions
################################################################################

info()
{
    echo -e "${CYAN}[INFO]${RESET} $1"
}


success()
{
    echo -e "${GREEN}[OK]${RESET} $1"
}


warning()
{
    echo -e "${YELLOW}[WARN]${RESET} $1"
}


error()
{
    echo -e "${RED}[ERROR]${RESET} $1"
}


################################################################################
# Validation
################################################################################

check_docker()
{

    if ! command -v docker >/dev/null 2>&1
    then
        error "Docker is not installed."

        exit 1
    fi


    if ! docker info >/dev/null 2>&1
    then
        error "Docker daemon is not running."

        echo "Please start Docker Desktop or Docker Engine."

        exit 1
    fi

}


check_environment()
{

    if [[ ! -f "$DOCKER_DIR/.env" ]]
    then

        warning ".env file not found."

        echo ""

        echo "Create it from template:"

        echo ""

        echo "cp .env.example .env"

        echo ""

        exit 1

    fi

}


################################################################################
# Main
################################################################################


echo ""

echo "=========================================="
echo " CyberConnect Development Environment"
echo "=========================================="

echo ""


check_docker

check_environment


cd "$DOCKER_DIR"


info "Docker directory:"
echo "$DOCKER_DIR"

echo ""


################################################################################
# Start services
################################################################################


if [[ -f "$OVERRIDE_FILE" ]]
then

    info "Starting with development override..."

    docker compose \
        -f "$COMPOSE_FILE" \
        -f "$OVERRIDE_FILE" \
        up -d

else

    info "Starting base compose..."

    docker compose \
        -f "$COMPOSE_FILE" \
        up -d

fi



################################################################################
# Status
################################################################################


echo ""

info "Checking services..."

docker compose ps


echo ""

success "CyberConnect development environment started."


echo ""

echo "Available services:"
echo ""

echo "Traefik:"
echo "  https://traefik.cyberconnect.local"

echo ""

echo "Application:"
echo "  https://app.cyberconnect.local"

echo ""

echo "Auth API:"
echo "  https://auth.cyberconnect.local"

echo ""

echo "Storage:"
echo "  https://console.cyberconnect.local"

echo ""

echo "Search:"
echo "  https://search.cyberconnect.local"

echo ""

echo "Database:"
echo "  localhost:5432"

echo ""

echo "Redis:"
echo "  localhost:6379"

echo ""