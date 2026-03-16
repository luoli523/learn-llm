# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Hands-on LLM learning book built with Jupyter Book. Each concept is a runnable Jupyter Notebook. All provider switching is done via `.env` — code never changes.

## Environment Setup

```bash
bash setup.sh               # create .venv, install deps, register repo root on Python path
source .venv/bin/activate
cp .env.example .env        # then set LLM_MODEL + API key
```

## Common Commands

```bash
jupyter notebook            # launch notebooks interactively
jb build .                  # build static book site
open _build/html/index.html # preview locally
ghp-import -n -p -f _build/html  # deploy to GitHub Pages
```

## Architecture

```
learn_llm/
├── utils/llm_client.py     # unified multi-provider client (LiteLLM)
├── chapters/               # one subfolder per module, one .ipynb per concept
│   └── 00_setup/verify.ipynb
├── _config.yml             # Jupyter Book metadata
├── _toc.yml                # book table of contents (add entries as chapters are written)
├── intro.md                # book landing page
├── .env                    # LLM_MODEL + API key (gitignored)
└── .env.example            # provider config template
```

**`utils/llm_client.py`** exposes three functions used by all notebooks:
- `chat(prompt, *, system, temperature, max_tokens)` — single-turn, returns string
- `stream_chat(prompt, ...)` — single-turn, yields chunks
- `multi_turn_chat(messages, ...)` — full history, returns string

**Switching providers**: change `LLM_MODEL` in `.env` (format: `provider/model-name`) and set the matching `*_API_KEY`. No code changes needed.

**Adding a chapter**: create `chapters/NN_topic/title.ipynb`, then add it to `_toc.yml`.

## Services & Infrastructure

### 书籍网站
- GitHub Pages: https://luoli523.github.io/learn_llm/
- GitHub repo: https://github.com/luoli523/learn_llm

### Waline 评论系统
- Vercel 服务地址: https://waline-server-amber.vercel.app
- Waline 管理后台: https://waline-server-amber.vercel.app/ui
- GitHub repo: https://github.com/luoli523/waline-server

### Supabase 数据库
- Project ref: hceznobsksxpzmcvdjkn
- Region: ap-south-1 (Transaction pooler)
- Host: aws-1-ap-south-1.pooler.supabase.com, Port: 6543, DB: postgres
- User: postgres.hceznobsksxpzmcvdjkn
- ⚠️ 密码和 Token 存在本地 memory/project_services.md，不提交到 git

### Telegram 通知
- Bot: @Guige_AI_knowledge_bot (ID: 8681630743)
- 新评论时自动推送到 bot owner 的 Telegram

## Working Guidelines

1. Before writing any code, describe your approach and wait for approval.
2. If the requirements I give you are ambiguous, ask clarifying questions before writing any code.
3. After you finish writing any code, list the edge cases and suggest test cases to cover them.
4. If a task requires changes to more than 3 files, stop and break it into smaller tasks first.
5. When there's a bug, start by writing a test that reproduces it, then fix it until the test passes.
6. Every time I correct you, reflect on what you did wrong and come up with a plan to never make the same mistake again.
