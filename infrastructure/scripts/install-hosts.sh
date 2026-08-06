#!/usr/bin/env bash

################################################################################
# CyberConnect Development Environment
#
# Install local hosts entries
#
# Supported:
#   - Linux
#   - macOS
#
# Usage:
#   sudo ./install-hosts.sh
#
################################################################################

set -euo pipefail


################################################################################
# Configuration
################################################################################

HOSTS_FILE="/etc/hosts"

ENTRIES=(
    "127.0.0.1 cyberconnect.local"
    "127.0.0.1 app.cyberconnect.local"
    "127.0.0.1 api.cyberconnect.local"
    "127.0.0.1 auth.cyberconnect.local"
    "127.0.0.1 storage.cyberconnect.local"
    "127.0.0.1 console.cyberconnect.local"
    "127.0.0.1 search.cyberconnect.local"
    "127.0.0.1 traefik.cyberconnect.local"
)


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


check_root()
{
    if [[ $EUID -ne 0 ]]; then

        error "This script requires root privileges."

        echo ""
        echo "Run:"
        echo ""
        echo "sudo ./install-hosts.sh"

        exit 1
    fi
}


check_hosts_file()
{
    if [[ ! -f "$HOSTS_FILE" ]]; then

        error "Hosts file not found: $HOSTS_FILE"

        exit 1

    fi
}


add_entry()
{
    local entry="$1"

    local hostname
    hostname=$(echo "$entry" | awk '{print $2}')


    if grep -qE "^[[:space:]]*127\.0\.0\.1[[:space:]]+$hostname([[:space:]]*)$" "$HOSTS_FILE"
    then

        warning "$hostname already exists"

    else

        info "Adding $hostname"

        echo "$entry" >> "$HOSTS_FILE"

        success "$hostname added"

    fi
}


flush_dns()
{
    info "Flushing DNS cache..."


    if command -v systemctl >/dev/null 2>&1
    then

        if systemctl is-active --quiet systemd-resolved
        then
            systemctl restart systemd-resolved
            success "systemd-resolved restarted"
            return
        fi

    fi


    if command -v dscacheutil >/dev/null 2>&1
    then

        dscacheutil -flushcache

        if command -v killall >/dev/null 2>&1
        then
            killall -HUP mDNSResponder || true
        fi

        success "macOS DNS cache flushed"

        return
    fi


    warning "DNS cache flush skipped"

}


################################################################################
# Main
################################################################################

check_root

check_hosts_file


info "Installing CyberConnect local domains..."


for entry in "${ENTRIES[@]}"
do

    add_entry "$entry"

done


flush_dns


echo ""

success "CyberConnect hosts installation completed."


echo ""

echo "Available endpoints:"

for entry in "${ENTRIES[@]}"
do

    hostname=$(echo "$entry" | awk '{print $2}')

    echo "https://$hostname"

done


echo ""