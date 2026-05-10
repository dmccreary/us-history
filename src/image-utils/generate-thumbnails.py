"""
Generate missing thumbnails for chapter images.

Scans docs/img/chapter-images/ for PNG files that do not yet have a
corresponding -thumb.png file and creates them at THUMB_MAX_WIDTH wide
(preserving aspect ratio).

Usage:
    python src/image-utils/generate-thumbnails.py [--dry-run]
"""

import argparse
import sys
from pathlib import Path
from PIL import Image

THUMB_MAX_WIDTH = 400
IMAGE_DIR = Path(__file__).resolve().parents[2] / "docs" / "img" / "chapter-images"


def thumb_path(src: Path) -> Path:
    return src.with_name(src.stem + "-thumb.png")


def generate_thumbnail(src: Path, dry_run: bool = False) -> None:
    dest = thumb_path(src)
    with Image.open(src) as img:
        w, h = img.size
        scale = THUMB_MAX_WIDTH / w
        new_size = (THUMB_MAX_WIDTH, round(h * scale))
        if dry_run:
            print(f"  [dry-run] would create {dest.name}  ({w}x{h} → {new_size[0]}x{new_size[1]})")
            return
        thumb = img.resize(new_size, Image.LANCZOS)
        thumb.save(dest, format="PNG", optimize=True)
        kb = dest.stat().st_size // 1024
        print(f"  created  {dest.name}  ({new_size[0]}x{new_size[1]}, {kb} KB)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate missing chapter image thumbnails.")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be created without writing files.")
    args = parser.parse_args()

    if not IMAGE_DIR.is_dir():
        print(f"ERROR: image directory not found: {IMAGE_DIR}", file=sys.stderr)
        sys.exit(1)

    # Collect originals — exclude anything already named *-thumb.png
    originals = sorted(
        p for p in IMAGE_DIR.glob("*.png")
        if not p.stem.endswith("-thumb")
    )

    missing = [p for p in originals if not thumb_path(p).exists()]

    if not missing:
        print("All thumbnails are up to date.")
        return

    print(f"Generating {len(missing)} missing thumbnail(s) in {IMAGE_DIR}:\n")
    for src in missing:
        generate_thumbnail(src, dry_run=args.dry_run)

    if not args.dry_run:
        print(f"\nDone. {len(missing)} thumbnail(s) created.")


if __name__ == "__main__":
    main()
