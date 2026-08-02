#!/usr/bin/env python3
"""Export LQ screen images + a filled ChatGPT prompt into ../hq-regen/<screen-id>/."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path


def repo_root_from_script() -> Path:
    # .../odyx-FE3/.agents/skills/odyx-screen-from-image/scripts/this.py
    return Path(__file__).resolve().parents[4]


def skill_dir() -> Path:
    return Path(__file__).resolve().parents[1]


def infer_role(name: str) -> str:
    stem = Path(name).stem.lower()
    for prefix in (
        "hero",
        "app",
        "compat",
        "case",
        "feature",
        "icon",
        "card",
        "thumb",
        "device",
        "clinical",
    ):
        if stem == prefix or stem.startswith(prefix + "-") or stem.startswith(prefix + "_"):
            return prefix
    return "asset"


def image_size(path: Path) -> dict[str, int] | None:
    try:
        from PIL import Image  # type: ignore
    except ImportError:
        return None
    with Image.open(path) as im:
        w, h = im.size
    return {"width": w, "height": h}


def fill_prompt(template: str, screen_id: str, assets: list[dict]) -> str:
    rows = ["| Filename | Role | Source | Size |", "|---|---|---|---|"]
    for a in assets:
        size = a.get("size")
        size_s = f"{size['width']}×{size['height']}" if size else "—"
        rows.append(
            f"| `{a['filename']}` | {a['role']} | `{a['source']}` | {size_s} |"
        )
    file_list = "\n".join(f"- `{a['filename']}`" for a in assets)
    return (
        template.replace("{{SCREEN_ID}}", screen_id)
        .replace("{{ASSET_TABLE}}", "\n".join(rows))
        .replace("{{FILE_LIST}}", file_list)
    )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Copy LQ images and write ChatGPT HQ-regen pack for a screen."
    )
    parser.add_argument(
        "--screen-id",
        required=True,
        help="Kebab-case screen id (used as pack folder name).",
    )
    parser.add_argument(
        "--images",
        nargs="+",
        required=True,
        help="Paths to LQ images (relative to cwd or absolute).",
    )
    parser.add_argument(
        "--out",
        default=None,
        help="Output pack directory (default: <repo>/../hq-regen/<screen-id>).",
    )
    args = parser.parse_args()

    screen_id = args.screen_id.strip()
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", screen_id):
        print(
            "error: --screen-id must be kebab-case (a-z, 0-9, hyphens)",
            file=sys.stderr,
        )
        return 2

    root = repo_root_from_script()
    out = (
        Path(args.out).expanduser().resolve()
        if args.out
        else (root.parent / "hq-regen" / screen_id).resolve()
    )
    lq_dir = out / "lq"
    lq_dir.mkdir(parents=True, exist_ok=True)

    template_path = skill_dir() / "chatgpt-prompt.md"
    if not template_path.is_file():
        print(f"error: missing template {template_path}", file=sys.stderr)
        return 1
    template = template_path.read_text(encoding="utf-8")

    assets: list[dict] = []
    for raw in args.images:
        src = Path(raw).expanduser()
        if not src.is_absolute():
            src = (Path.cwd() / src).resolve()
        else:
            src = src.resolve()
        if not src.is_file():
            print(f"error: not a file: {src}", file=sys.stderr)
            return 1

        dest = lq_dir / src.name
        if dest.exists() and any(a["filename"] == src.name for a in assets):
            print(f"error: duplicate filename in pack: {src.name}", file=sys.stderr)
            return 1
        shutil.copy2(src, dest)

        try:
            rel_source = str(src.relative_to(root))
        except ValueError:
            rel_source = str(src)

        assets.append(
            {
                "filename": src.name,
                "role": infer_role(src.name),
                "source": rel_source,
                "pack_path": f"lq/{src.name}",
                "size": image_size(src),
            }
        )

    prompt_body = fill_prompt(template, screen_id, assets)
    # Drop the leading template title block before the --- separator for the pack copy
    if "\n---\n" in prompt_body:
        prompt_body = prompt_body.split("\n---\n", 1)[1].lstrip()
    (out / "PROMPT.md").write_text(prompt_body, encoding="utf-8")

    manifest = {
        "screenId": screen_id,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "repoRoot": str(root),
        "packDir": str(out),
        "assets": assets,
        "instructions": (
            "Attach every file in lq/ to ChatGPT, paste PROMPT.md, "
            "then save HQ outputs with the same filenames into the original source paths."
        ),
    }
    (out / "manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )

    print(f"Pack written: {out}")
    print(f"  lq/          {len(assets)} file(s)")
    print("  PROMPT.md")
    print("  manifest.json")
    for a in assets:
        print(f"  - {a['filename']} ({a['role']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
