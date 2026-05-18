#!/usr/bin/env python3
"""Prepare MediaKids gallery images.

Creates web-ready thumbnail and display WebP files from an input folder and can
archive originals outside the repo after successful conversion. The script never
deletes originals.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable

try:
    from PIL import Image, ImageOps
except ModuleNotFoundError as exc:  # pragma: no cover - depends on runtime
    raise SystemExit(
        "Pillow is required. On the main Mac, use the bundled Codex Python. "
        "On another computer, install Pillow first: python -m pip install Pillow"
    ) from exc


SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".heic",
    ".heif",
    ".tif",
    ".tiff",
}


@dataclass(frozen=True)
class Variant:
    suffix: str
    max_width: int


DEFAULT_VARIANTS = (
    Variant("thumb", 520),
    Variant("display", 1800),
)


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
    return slug or "gallery"


def iter_images(input_dir: Path) -> Iterable[Path]:
    for path in sorted(input_dir.iterdir()):
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
            yield path


def resize_image(image: Image.Image, max_width: int) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    image = image.convert("RGB")
    if image.width <= max_width:
        return image.copy()
    ratio = max_width / float(image.width)
    height = round(image.height * ratio)
    return image.resize((max_width, height), Image.Resampling.LANCZOS)


def save_webp(image: Image.Image, output_path: Path, quality: int) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(output_path, "WEBP", quality=quality, method=6)


def archive_original(source: Path, archive_dir: Path, dry_run: bool) -> Path:
    archive_dir.mkdir(parents=True, exist_ok=True)
    target = archive_dir / source.name
    if target.exists():
        stem = target.stem
        suffix = target.suffix
        counter = 2
        while target.exists():
            target = archive_dir / f"{stem}-{counter}{suffix}"
            counter += 1
    if not dry_run:
        shutil.move(str(source), str(target))
    return target


def build_manifest(album_slug: str, files: list[dict[str, object]]) -> dict[str, object]:
    return {
        "album": album_slug,
        "generatedAt": datetime.now().isoformat(timespec="seconds"),
        "count": len(files),
        "images": files,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Prepare MediaKids gallery images")
    parser.add_argument("--input", required=True, type=Path, help="Folder with original images")
    parser.add_argument("--output", required=True, type=Path, help="Repo output folder for web-ready images")
    parser.add_argument("--slug", required=True, help="Album/file slug, for example songkran-2026")
    parser.add_argument("--quality", type=int, default=88, help="WebP quality, default 88")
    parser.add_argument("--thumb-width", type=int, default=520)
    parser.add_argument("--display-width", type=int, default=1800)
    parser.add_argument("--archive", type=Path, help="Archive folder for originals")
    parser.add_argument("--archive-originals", action="store_true", help="Move originals to archive after success")
    parser.add_argument("--dry-run", action="store_true", help="Show planned work without writing images")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    input_dir = args.input.expanduser().resolve()
    output_dir = args.output.expanduser().resolve()
    album_slug = slugify(args.slug)
    variants = (
        Variant("thumb", args.thumb_width),
        Variant("display", args.display_width),
    )

    if not input_dir.exists() or not input_dir.is_dir():
        print(f"Input folder does not exist: {input_dir}", file=sys.stderr)
        return 2

    sources = list(iter_images(input_dir))
    if not sources:
        print(f"No supported images found in {input_dir}", file=sys.stderr)
        return 1

    manifest_images: list[dict[str, object]] = []
    output_dir.mkdir(parents=True, exist_ok=True)

    for index, source in enumerate(sources, start=1):
        file_stem = f"{album_slug}-{index:03d}"
        print(f"Preparing {source.name} -> {file_stem}")
        with Image.open(source) as original:
            item: dict[str, object] = {
                "source": source.name,
                "width": original.width,
                "height": original.height,
                "variants": {},
            }
            for variant in variants:
                output_name = f"{file_stem}-{variant.suffix}.webp"
                output_path = output_dir / output_name
                item["variants"][variant.suffix] = output_name
                if not args.dry_run:
                    resized = resize_image(original, variant.max_width)
                    save_webp(resized, output_path, args.quality)
            manifest_images.append(item)

    manifest = build_manifest(album_slug, manifest_images)
    manifest_path = output_dir / "gallery-manifest.json"
    if not args.dry_run:
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    if args.archive_originals:
        if not args.archive:
            print("--archive is required when --archive-originals is used", file=sys.stderr)
            return 2
        archive_dir = args.archive.expanduser().resolve()
        for source in sources:
            target = archive_original(source, archive_dir, args.dry_run)
            print(f"Archived original: {source.name} -> {target}")

    print(f"Prepared {len(sources)} image(s). Manifest: {manifest_path}")
    if args.dry_run:
        print("Dry run only; no images or manifests were written.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
