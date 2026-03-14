#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_ROOT"

echo "==> Creating virtual environment..."
python3 -m venv .venv

echo "==> Installing dependencies..."
.venv/bin/pip install --upgrade pip -q
.venv/bin/pip install -r requirements.txt -q

# Add repo root to Python path so notebooks can do:
#   from utils.llm_client import chat
SITE_PACKAGES=$(.venv/bin/python -c "import site; print(site.getsitepackages()[0])")
echo "$REPO_ROOT" > "$SITE_PACKAGES/learn_llm.pth"
echo "==> Repo root added to Python path via .pth"

echo "==> Setting up .env..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "    .env created — fill in your API key before running notebooks"
else
    echo "    .env already exists, skipping"
fi

echo ""
echo "Done! Next steps:"
echo "  1. source .venv/bin/activate"
echo "  2. Edit .env and set LLM_MODEL + API key"
echo "  3. jupyter notebook"
