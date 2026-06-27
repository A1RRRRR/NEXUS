#!/bin/bash
# NEXUS — One-command setup script
# Run this once on a fresh server: bash setup.sh

set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

echo ""
echo "╔════════════════════════════════════════╗"
echo "║        NEXUS TikTok Engine Setup       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# ------------------------------------------------------------------
# 1. System dependencies
# ------------------------------------------------------------------
info "Checking system dependencies..."

if ! command -v python3 &>/dev/null; then
    error "Python 3.11+ is required. Install it first."
fi

PYTHON_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
info "Python version: $PYTHON_VERSION"

if ! command -v ffmpeg &>/dev/null; then
    info "Installing FFmpeg..."
    if command -v apt-get &>/dev/null; then
        sudo apt-get update -qq && sudo apt-get install -y ffmpeg
    elif command -v brew &>/dev/null; then
        brew install ffmpeg
    else
        error "Please install FFmpeg manually: https://ffmpeg.org/download.html"
    fi
fi
ok "FFmpeg: $(ffmpeg -version 2>&1 | head -1 | cut -d' ' -f3)"

# ------------------------------------------------------------------
# 2. Python virtual environment
# ------------------------------------------------------------------
if [ ! -d ".venv" ]; then
    info "Creating virtual environment..."
    python3 -m venv .venv
fi
source .venv/bin/activate
info "Installing Python packages (this takes ~2 minutes)..."
pip install --quiet --upgrade pip
pip install --quiet -r requirements.txt
ok "Python packages installed."

# ------------------------------------------------------------------
# 3. Create .env if it doesn't exist
# ------------------------------------------------------------------
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ""
    warn "No .env file found — created one from .env.example"
    warn "You MUST fill in your TikTok credentials before running."
    warn ""
    warn "Steps to get credentials (10 minutes):"
    warn "  1. Go to https://developers.tiktok.com"
    warn "  2. Create an app (category: Content Publishing)"
    warn "  3. Add redirect URI: http://localhost:8080/callback"
    warn "  4. Copy Client Key + Client Secret into .env"
    echo ""
    read -p "Press Enter after you've filled in .env, or Ctrl+C to do it later..."
fi

# ------------------------------------------------------------------
# 4. Validate credentials
# ------------------------------------------------------------------
source .env
if [ -z "$TIKTOK_CLIENT_KEY" ] || [ "$TIKTOK_CLIENT_KEY" = "your_client_key_here" ]; then
    error "TIKTOK_CLIENT_KEY is not set in .env. See docs/TIKTOK_SETUP.md"
fi
if [ -z "$TIKTOK_CLIENT_SECRET" ] || [ "$TIKTOK_CLIENT_SECRET" = "your_client_secret_here" ]; then
    error "TIKTOK_CLIENT_SECRET is not set in .env. See docs/TIKTOK_SETUP.md"
fi
ok "TikTok credentials found."

# ------------------------------------------------------------------
# 5. Create data directories
# ------------------------------------------------------------------
mkdir -p data/{generated,temp,accounts}
ok "Data directories ready."

# ------------------------------------------------------------------
# 6. Test video generation
# ------------------------------------------------------------------
info "Generating a test video to verify the pipeline..."
python scripts/generate_test_video.py
ok "Video generation works!"

# ------------------------------------------------------------------
# 7. Add first TikTok account
# ------------------------------------------------------------------
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " STEP: Authorize your TikTok accounts"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo " Each account takes ~5 minutes to authorize."
echo " To post 150–350 videos/day you need 30–70 accounts."
echo " You can always add more later with: python scripts/add_account.py"
echo ""

read -p "Add accounts now? (y/n): " ADD_ACCOUNTS
if [[ "$ADD_ACCOUNTS" == "y" ]]; then
    while true; do
        python scripts/add_account.py
        read -p "Add another account? (y/n): " ANOTHER
        [[ "$ANOTHER" != "y" ]] && break
    done
fi

ACCOUNT_COUNT=$(python scripts/list_accounts.py 2>/dev/null | grep "Total active" | grep -oP '\d+' || echo "0")
echo ""
if [ "$ACCOUNT_COUNT" -gt 0 ] 2>/dev/null; then
    ok "Accounts configured: $ACCOUNT_COUNT"
else
    warn "No accounts added yet. Add later with: python scripts/add_account.py"
fi

# ------------------------------------------------------------------
# 8. Install systemd service (optional)
# ------------------------------------------------------------------
echo ""
read -p "Install as a systemd service (auto-starts on reboot)? (y/n): " INSTALL_SERVICE
if [[ "$INSTALL_SERVICE" == "y" ]]; then
    NEXUS_DIR=$(pwd)
    NEXUS_USER=$(whoami)
    VENV_PYTHON="$NEXUS_DIR/.venv/bin/python"

    sudo tee /etc/systemd/system/nexus.service > /dev/null <<SVCEOF
[Unit]
Description=NEXUS TikTok Automation Engine
After=network.target

[Service]
Type=simple
User=$NEXUS_USER
WorkingDirectory=$NEXUS_DIR
ExecStart=$VENV_PYTHON main.py start
Restart=always
RestartSec=30
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SVCEOF

    sudo systemctl daemon-reload
    sudo systemctl enable nexus
    sudo systemctl start nexus
    ok "Systemd service installed and started."
    echo "  Check status: sudo systemctl status nexus"
    echo "  View logs:    sudo journalctl -u nexus -f"
fi

# ------------------------------------------------------------------
# Done
# ------------------------------------------------------------------
echo ""
echo "╔════════════════════════════════════════╗"
echo "║          Setup Complete!               ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo " Start manually:    source .venv/bin/activate && python main.py start"
echo " Live dashboard:    source .venv/bin/activate && python main.py dashboard"
echo " Add accounts:      source .venv/bin/activate && python scripts/add_account.py"
echo " Today's stats:     source .venv/bin/activate && python main.py status"
echo ""
