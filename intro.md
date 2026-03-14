# Learn LLM

A hands-on learning book for Large Language Models — from core concepts to production.

Each chapter is a runnable Jupyter Notebook combining explanations and code examples.
All examples run against a single unified client; switching providers requires only a `.env` change.

## Quick Start

```bash
bash setup.sh          # create .venv, install deps
source .venv/bin/activate
cp .env.example .env   # then fill in your API key
jupyter notebook       # open any notebook
```

## Planned Modules

| # | Module | Topics |
|---|--------|--------|
| 01 | Foundations | Tokens, Embeddings, Context Window, Sampling params |
| 02 | Prompting | Zero/Few-shot, Chain-of-Thought, Structured Output |
| 03 | API Patterns | Streaming, Function Calling, Vision/Multimodal |
| 04 | RAG | Chunking, Vector DB, Retrieval strategies |
| 05 | Agents | ReAct, Memory, Multi-agent |
| 06 | Fine-tuning | When to fine-tune, LoRA/PEFT |
| 07 | Production | Evaluation, Cost optimization, Observability |

## Building the Book

```bash
jb build .                        # build static site
open _build/html/index.html       # preview locally
ghp-import -n -p -f _build/html  # deploy to GitHub Pages
```
