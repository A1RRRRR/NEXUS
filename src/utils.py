"""Shared utilities: config loading, logging."""

import logging
import os
from functools import lru_cache
from pathlib import Path

import yaml
from dotenv import load_dotenv

load_dotenv()


@lru_cache(maxsize=1)
def load_config(path: str = "config.yaml") -> dict:
    with open(path) as f:
        return yaml.safe_load(f)


def get_logger(name: str) -> logging.Logger:
    cfg = load_config()
    level_str = os.getenv("LOG_LEVEL", cfg.get("log_level", "INFO"))
    level = getattr(logging, level_str.upper(), logging.INFO)

    log_file = os.getenv("LOG_FILE", "data/nexus.log")
    Path(log_file).parent.mkdir(parents=True, exist_ok=True)

    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(level)
        fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")

        sh = logging.StreamHandler()
        sh.setFormatter(fmt)
        logger.addHandler(sh)

        fh = logging.FileHandler(log_file)
        fh.setFormatter(fmt)
        logger.addHandler(fh)

    return logger
