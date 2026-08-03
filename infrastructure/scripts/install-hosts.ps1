<#
.SYNOPSIS
    Install CyberConnect local development host entries.

.DESCRIPTION
    Adds local DNS mappings for CyberConnect development services.

    Required domains:
        cyberconnect.local
        app.cyberconnect.local
        api.cyberconnect.local
        auth.cyberconnect.local
        storage.cyberconnect.local
        console.cyberconnect.local
        search.cyberconnect.local
        traefik.cyberconnect.local

.NOTES
    Run PowerShell as Administrator.

.EXAMPLE
    .\install-hosts.ps1
#>

$ErrorActionPreference = "Stop"


################################################################################
# Configuration
################################################################################

$HostsFile = "$env:SystemRoot\System32\drivers\etc\hosts"

$Entries = @(
    @{
        IP = "127.0.0.1"
        Host = "cyberconnect.local"
    },
    @{
        IP = "127.0.0.1"
        Host = "app.cyberconnect.local"
    },
    @{
        IP = "127.0.0.1"
        Host = "api.cyberconnect.local"
    },
    @{
        IP = "127.0.0.1"
        Host = "auth.cyberconnect.local"
    },
    @{
        IP = "127.0.0.1"
        Host = "storage.cyberconnect.local"
    },
    @{
        IP = "127.0.0.1"
        Host = "console.cyberconnect.local"
    },
    @{
        IP = "127.0.0.1"
        Host = "search.cyberconnect.local"
    },
    @{
        IP = "127.0.0.1"
        Host = "traefik.cyberconnect.local"
    }
)


################################################################################
# Functions
################################################################################

function Write-Info($Message)
{
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}


function Write-Success($Message)
{
    Write-Host "[OK]   $Message" -ForegroundColor Green
}


function Write-WarningMessage($Message)
{
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}


function Test-Administrator
{
    $currentUser =
        New-Object Security.Principal.WindowsPrincipal(
            [Security.Principal.WindowsIdentity]::GetCurrent()
        )

    return $currentUser.IsInRole(
        [Security.Principal.WindowsBuiltInRole]::Administrator
    )
}


################################################################################
# Main
################################################################################


if (!(Test-Administrator))
{
    Write-Host ""
    Write-Host "This script requires Administrator privileges." `
        -ForegroundColor Red

    Write-Host ""
    Write-Host "Run PowerShell as Administrator and execute again."

    exit 1
}


if (!(Test-Path $HostsFile))
{
    Write-Host "Hosts file not found:"
    Write-Host $HostsFile `
        -ForegroundColor Red

    exit 1
}


Write-Info "Reading hosts file..."

$HostsContent = Get-Content $HostsFile


foreach ($Entry in $Entries)
{

    $IP = $Entry.IP
    $HostName = $Entry.Host


    $Exists =
        $HostsContent |
        Select-String `
            -Pattern "^\s*$IP\s+$HostName\s*$"


    if ($Exists)
    {
        Write-WarningMessage "$HostName already exists"
        continue
    }


    Write-Info "Adding $HostName"


    Add-Content `
        -Path $HostsFile `
        -Value "$IP`t$HostName"


    Write-Success "$HostName added"
}


################################################################################
# Flush DNS Cache
################################################################################

Write-Info "Flushing DNS cache..."

ipconfig /flushdns | Out-Null


Write-Success "CyberConnect hosts installation completed."


################################################################################
# Summary
################################################################################

Write-Host ""

Write-Host "Available local endpoints:" `
    -ForegroundColor Cyan

foreach ($Entry in $Entries)
{
    Write-Host "https://$($Entry.Host)"
}

Write-Host ""