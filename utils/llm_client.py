"""
Unified LLM client for all notebooks.

Configure via .env — see .env.example for all supported providers.

Usage:
    from utils.llm_client import chat, stream_chat, multi_turn_chat

    response = chat("Explain what a token is.")
    for chunk in stream_chat("Write a haiku."):
        print(chunk, end="", flush=True)
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv
import litellm

# Load .env from repo root regardless of where the notebook is located
_root = Path(__file__).resolve().parents[1]
load_dotenv(_root / ".env")

# Suppress provider-specific params that a given model doesn't support
litellm.drop_params = True

# Models that only accept temperature=1 (reasoning/o-series style)
_TEMP_RESTRICTED_PREFIXES = ("openai/gpt-5", "openai/o1", "openai/o3", "openai/o4")


def _model() -> str:
    model = os.getenv("LLM_MODEL")
    if not model:
        raise EnvironmentError(
            "LLM_MODEL is not set. Copy .env.example to .env and configure it."
        )
    return model


def _safe_kwargs(model: str, temperature: float, max_tokens: int) -> dict:
    """Return completion kwargs, omitting temperature for models that don't support custom values."""
    kwargs: dict = {"max_tokens": max_tokens}
    if not any(model.startswith(p) for p in _TEMP_RESTRICTED_PREFIXES):
        kwargs["temperature"] = temperature
    return kwargs


def chat(
    prompt: str,
    *,
    system: str | None = None,
    temperature: float = 0.7,
    max_tokens: int = 4096,
    **kwargs,
) -> str:
    """Single-turn chat. Returns the full response as a string."""
    model = _model()
    messages = _build_messages(system, prompt)
    response = litellm.completion(
        model=model,
        messages=messages,
        **_safe_kwargs(model, temperature, max_tokens),
        **kwargs,
    )
    return response.choices[0].message.content or ""


def stream_chat(
    prompt: str,
    *,
    system: str | None = None,
    temperature: float = 0.7,
    max_tokens: int = 4096,
    **kwargs,
) -> Generator[str, None, None]:
    """Single-turn streaming chat. Yields text chunks as they arrive."""
    model = _model()
    messages = _build_messages(system, prompt)
    response = litellm.completion(
        model=model,
        messages=messages,
        stream=True,
        **_safe_kwargs(model, temperature, max_tokens),
        **kwargs,
    )
    for chunk in response:
        delta = chunk.choices[0].delta
        # Some reasoning models put output in reasoning_content instead of content
        content = delta.content or getattr(delta, "reasoning_content", None)
        if content:
            yield content


def multi_turn_chat(
    messages: list[dict],
    *,
    temperature: float = 0.7,
    max_tokens: int = 4096,
    **kwargs,
) -> str:
    """
    Multi-turn chat. Pass the full message history.

    Example:
        messages = [
            {"role": "system", "content": "You are a helpful teacher."},
            {"role": "user", "content": "What is a token?"},
            {"role": "assistant", "content": "A token is ..."},
            {"role": "user", "content": "How is that different from a word?"},
        ]
        reply = multi_turn_chat(messages)
    """
    model = _model()
    response = litellm.completion(
        model=model,
        messages=messages,
        **_safe_kwargs(model, temperature, max_tokens),
        **kwargs,
    )
    return response.choices[0].message.content or ""


def _build_messages(system: str | None, prompt: str) -> list[dict]:
    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})
    return messages
