# Universal AI Agent Skills Library Installer (Windows PowerShell)
# Usage: irm https://raw.githubusercontent.com/<username>/universal-agent-skills/main/install.ps1 | iex
# Or locally: .\install.ps1

param (
    [string]$TargetDir = (Get-Location).Path
)

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " 🚀 Installing Universal AI Agent Skills (279 Skills) " -ForegroundColor Green
Write-Host " Target Directory: $TargetDir" -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Cyan

$SkillsRepoUrl = "https://github.com/aakashss/universal-agent-skills.git"
$TempDir = Join-Path $env:TEMP "universal_skills_tmp"

if (Test-Path $TempDir) {
    Remove-Item -Recurse -Force $TempDir
}

Write-Host "⬇️  Cloning skills repository..." -ForegroundColor Cyan
git clone --depth 1 $SkillsRepoUrl $TempDir

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to clone repository. Please check your internet connection or git installation." -ForegroundColor Red
    exit 1
}

$DestAgents = Join-Path $TargetDir ".agents\skills"
$DestAgent = Join-Path $TargetDir ".agent\skills"

New-Item -ItemType Directory -Force -Path $DestAgents | Out-Null
New-Item -ItemType Directory -Force -Path $DestAgent | Out-Null

Write-Host "📦 Copying skills to .agents\skills and .agent\skills..." -ForegroundColor Cyan
Copy-Item -Recurse -Force (Join-Path $TempDir ".agents\skills\*") $DestAgents
Copy-Item -Recurse -Force (Join-Path $TempDir ".agent\skills\*") $DestAgent

Remove-Item -Recurse -Force $TempDir

Write-Host ""
Write-Host "✅ Installation Complete! 279 production-ready agent skills are now active." -ForegroundColor Green
Write-Host "🔥 Compatible with: Antigravity IDE, Claude Code, Cursor, Windsurf, OpenCode." -ForegroundColor Yellow
Write-Host "🚀 Go build something amazing!" -ForegroundColor Cyan
