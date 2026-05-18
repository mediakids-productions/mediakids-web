#!/usr/bin/env python3
"""Update js/version.js BUILD_VERSION with a timestamp."""

from __future__ import annotations

import argparse
import re
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
VERSION_FILE = ROOT / "js" / "version.js"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Bump MediaKids cache-busting version")
    parser.add_argument("--version", help="Explicit YYYYMMDDHHMM version. Defaults to current local time.")
    parser.add_argument("--dry-run", action="store_true", help="Print the change without writing.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    version = args.version or datetime.now().strftime("%Y%m%d%H%M")
    if not re.fullmatch(r"\d{12}", version):
        raise SystemExit("Version must be YYYYMMDDHHMM, for example 202605170930")

    text = VERSION_FILE.read_text(encoding="utf-8")
    pattern = r"const BUILD_VERSION = '\d{12}';"
    replacement = f"const BUILD_VERSION = '{version}';"
    new_text, count = re.subn(pattern, replacement, text, count=1)
    if count != 1:
        raise SystemExit("Could not find BUILD_VERSION in js/version.js")

    print(replacement)
    if not args.dry_run:
        VERSION_FILE.write_text(new_text, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
