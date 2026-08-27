#!/usr/bin/env bash
# Universal AI Agent Skills Library Installer (macOS / Linux)
# Usage: curl -fsSL https://raw.githubusercontent.com/<username>/universal-agent-skills/main/install.sh | bash

set -e

TARGET_DIR="${1:-$(pwd)}"

echo -e "\033[1;36m=================================================================\033[0m"
echo -e "\033[1;32m 🚀 Installing Universal AI Agent Skills (279 Skills) \033[0m"
echo -e "\033[1;33m Target Directory: ${TARGET_DIR}\033[0m"
echo -e "\033[1;36m=================================================================\033[0m"

TEMP_DIR=$(mktemp -d)
SKILLS_REPO="https://github.com/aakash1552005/universal-agent-skills.git"

echo -e "\033[1;36m⬇️  Cloning skills repository...\033[0m"
git clone --depth 1 "$SKILLS_REPO" "$TEMP_DIR"

mkdir -p "${TARGET_DIR}/.agents/skills"
mkdir -p "${TARGET_DIR}/.agent/skills"

echo -e "\033[1;36m📦 Copying skills to .agents/skills and .agent/skills...\033[0m"
cp -r "${TEMP_DIR}/.agents/skills/"* "${TARGET_DIR}/.agents/skills/"
cp -r "${TEMP_DIR}/.agent/skills/"* "${TARGET_DIR}/.agent/skills/"

rm -rf "$TEMP_DIR"

echo ""
echo -e "\033[1;32m✅ Installation Complete! 279 production-ready agent skills are now active.\033[0m"
echo -e "\033[1;33m🔥 Compatible with: Antigravity IDE, Claude Code, Cursor, Windsurf, OpenCode.\033[0m"
echo -e "\033[1;36m🚀 Go build something amazing!\033[0m"
