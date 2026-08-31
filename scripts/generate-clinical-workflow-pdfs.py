#!/usr/bin/env python3
"""Generate one-page ODYX clinical workflow PDFs (Helvetica, no extra deps)."""

from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "docs" / "workflows"

BLUE = (0, 80 / 255, 216 / 255)
INK = (0.06, 0.08, 0.13)
MUTED = (0.36, 0.39, 0.46)
RULE = (0.91, 0.92, 0.95)

WORKFLOWS = [
    {
        "slug": "same-day-crown",
        "category": "Restorative",
        "title": "Same-Day Crown",
        "subtitle": "From scan to cementation in one visit.",
        "body": "Deliver strong, esthetic crowns in a single appointment with the ODYX digital workflow.",
        "total": "Total Time: ~30–45 min",
        "steps": [
            ("1", "Scan", "Full arch or quadrant scan with ODYX S1.", "~30 sec"),
            ("2", "Design", "Design the crown with your preferred CAD software.", "~3 min"),
            ("3", "Print", "Print the crown with ODYX P1-26 using Ceramic Crown Resin.", "~18 min"),
            ("4", "Cure", "Cure with ODYX Cure for optimal strength and esthetics.", "~5 min"),
            ("5", "Finish & Cement", "Simple finishing and polishing. Ready to cement.", "~5 min"),
        ],
        "params": [
            ("Layer Thickness", "50 μm"),
            ("Exposure Time", "2.5 – 3.0 s"),
            ("Bottom Exposure", "25 – 30 s"),
            ("Bottom Layers", "5"),
            ("Build Plate Temp.", "30 – 35 °C"),
            ("Resin", "Ceramic Crown Resin"),
        ],
        "tips": [
            "Ensure proper isolation and shade selection.",
            "Minimal adjustments needed after try-in.",
            "Use fine diamonds and polishing kit for best results.",
            "Follow recommended curing time for maximum properties.",
        ],
    },
    {
        "slug": "veneers",
        "category": "Restorative",
        "title": "Veneers",
        "subtitle": "Esthetic veneers in a single visit.",
        "body": "Print thin, highly esthetic veneers chairside with the ODYX digital workflow — precise fit, natural translucency.",
        "total": "Total Time: ~35–50 min",
        "steps": [
            ("1", "Scan", "Capture prep and antagonist with ODYX S1.", "~45 sec"),
            ("2", "Design", "Design veneer morphology and emergence in CAD.", "~5 min"),
            ("3", "Print", "Print veneers on P1-26 with Ceramic Crown Resin.", "~15 min"),
            ("4", "Cure", "Post-cure for strength and optical properties.", "~5 min"),
            ("5", "Finish & Bond", "Polish and bond with conventional protocols.", "~8 min"),
        ],
        "params": [
            ("Layer Thickness", "50 μm"),
            ("Exposure Time", "2.5 – 3.0 s"),
            ("Bottom Exposure", "25 – 30 s"),
            ("Bottom Layers", "5"),
            ("Build Plate Temp.", "30 – 35 °C"),
            ("Resin", "Ceramic Crown Resin"),
        ],
        "tips": [
            "Verify shade under multiple light sources before bonding.",
            "Keep veneer thickness within material indications.",
            "Use a calibrated try-in paste for shade confirmation.",
            "Polish margins carefully to preserve enamel seal.",
        ],
    },
    {
        "slug": "inlays",
        "category": "Restorative",
        "title": "Inlays & Onlays",
        "subtitle": "Precise partial restorations, chairside.",
        "body": "Restore cusps and proximal anatomy with accurately printed inlays and onlays — conservative prep, excellent margins.",
        "total": "Total Time: ~30–45 min",
        "steps": [
            ("1", "Scan", "Quadrant scan with clear prep margins.", "~30 sec"),
            ("2", "Design", "Design inlay/onlay contacts and occlusion.", "~4 min"),
            ("3", "Print", "Print on P1-26 at recommended layer height.", "~16 min"),
            ("4", "Cure", "Fully cure before try-in and cementation.", "~5 min"),
            ("5", "Finish & Cement", "Adjust contacts lightly, then cement.", "~6 min"),
        ],
        "params": [
            ("Layer Thickness", "50 μm"),
            ("Exposure Time", "2.5 – 3.0 s"),
            ("Bottom Exposure", "25 – 30 s"),
            ("Bottom Layers", "5"),
            ("Build Plate Temp.", "30 – 35 °C"),
            ("Resin", "Ceramic Crown Resin"),
        ],
        "tips": [
            "Capture sharp prep margins with powder-free scanning.",
            "Check proximal contacts on a solid model before cementation.",
            "Avoid over-thinning occlusal tables beyond material limits.",
            "Use dual-cure resin cement for deep preparations.",
        ],
    },
    {
        "slug": "surgical-guide",
        "category": "Implant",
        "title": "Surgical Guide",
        "subtitle": "Accurate implant placement, digitally planned.",
        "body": "Print rigid, precise surgical guides from CBCT-driven plans — transfer the digital plan to the chair with confidence.",
        "total": "Total Time: ~45–60 min",
        "steps": [
            ("1", "Scan & CBCT", "Merge IOS and CBCT for implant planning.", "~2 min"),
            ("2", "Design", "Plan implants and design the guide sleeves.", "~10 min"),
            ("3", "Print", "Print guide on P1-26 with Surgical Guide Resin.", "~25 min"),
            ("4", "Cure", "Wash and fully cure for clinical rigidity.", "~8 min"),
            ("5", "Verify", "Check fit on model, then sterilize per protocol.", "~5 min"),
        ],
        "params": [
            ("Layer Thickness", "50 – 100 μm"),
            ("Exposure Time", "2.0 – 2.8 s"),
            ("Bottom Exposure", "25 – 35 s"),
            ("Bottom Layers", "5 – 6"),
            ("Build Plate Temp.", "30 – 35 °C"),
            ("Resin", "Surgical Guide Resin"),
        ],
        "tips": [
            "Validate guide fit on the printed model before surgery.",
            "Confirm sleeve diameter against the surgical kit.",
            "Follow wash/cure protocols for biocompatible resins.",
            "Inspect for supports residue near sleeve openings.",
        ],
    },
    {
        "slug": "implant-model",
        "category": "Implant",
        "title": "Implant Model",
        "subtitle": "Detailed planning models for implant cases.",
        "body": "Print solid, accurate models with soft-tissue and analog options — ideal for prosthetic planning and patient communication.",
        "total": "Total Time: ~50–70 min",
        "steps": [
            ("1", "Scan", "Capture arch and soft tissue with ODYX S1.", "~1 min"),
            ("2", "Design", "Prepare model bases and analog sockets in CAD.", "~6 min"),
            ("3", "Print", "Print models on P1-26 with Model Resin.", "~35 min"),
            ("4", "Cure", "Wash and cure for dimensional stability.", "~8 min"),
            ("5", "Assemble", "Seat analogs and verify soft-tissue fit.", "~5 min"),
        ],
        "params": [
            ("Layer Thickness", "50 μm"),
            ("Exposure Time", "1.8 – 2.5 s"),
            ("Bottom Exposure", "20 – 28 s"),
            ("Bottom Layers", "4 – 5"),
            ("Build Plate Temp.", "28 – 32 °C"),
            ("Resin", "Model Resin"),
        ],
        "tips": [
            "Orient models to protect critical soft-tissue areas.",
            "Verify analog torque seating before wax-up or CAD.",
            "Label arches clearly for multi-unit cases.",
            "Store cured models away from direct light.",
        ],
    },
    {
        "slug": "aligners",
        "category": "Orthodontics",
        "title": "Aligners",
        "subtitle": "Clear aligner workflows, end to end.",
        "body": "Print precise thermoforming models for clear aligner series — consistent staging, efficient batch production.",
        "total": "Total Time: per series batch",
        "steps": [
            ("1", "Scan", "Full-arch scan with ODYX S1 for staging.", "~1 min"),
            ("2", "Setup", "Plan movements in your aligner software.", "~15 min"),
            ("3", "Print", "Batch-print staging models on P1-26.", "~40 min"),
            ("4", "Cure", "Wash and cure models before thermoforming.", "~10 min"),
            ("5", "Thermoform", "Form, trim, and polish aligners.", "~20 min"),
        ],
        "params": [
            ("Layer Thickness", "50 – 100 μm"),
            ("Exposure Time", "1.8 – 2.4 s"),
            ("Bottom Exposure", "20 – 28 s"),
            ("Bottom Layers", "4 – 5"),
            ("Build Plate Temp.", "28 – 32 °C"),
            ("Resin", "Model Resin"),
        ],
        "tips": [
            "Nest models efficiently to maximize build plate use.",
            "Fully dry models before thermoforming sheets.",
            "Inspect attachments on each staging model.",
            "Label stages clearly to avoid sequence errors.",
        ],
    },
    {
        "slug": "retainers",
        "category": "Orthodontics",
        "title": "Retainers",
        "subtitle": "Retention appliances, printed on demand.",
        "body": "Produce accurate models for clear retainers and retention appliances — fast replacements without new impressions.",
        "total": "Total Time: ~50–60 min",
        "steps": [
            ("1", "Scan", "Capture final occlusion with ODYX S1.", "~45 sec"),
            ("2", "Design", "Prepare retainer model bases in CAD.", "~3 min"),
            ("3", "Print", "Print models on P1-26 with Model Resin.", "~30 min"),
            ("4", "Cure", "Wash and cure before thermoforming.", "~8 min"),
            ("5", "Thermoform", "Form and trim the retainer.", "~12 min"),
        ],
        "params": [
            ("Layer Thickness", "50 μm"),
            ("Exposure Time", "2.5 – 3.0 s"),
            ("Bottom Exposure", "25 – 30 s"),
            ("Bottom Layers", "5"),
            ("Build Plate Temp.", "30 – 35 °C"),
            ("Resin", "Model Resin"),
        ],
        "tips": [
            "Archive final scans for lifetime retainer remakes.",
            "Check occlusion contacts after thermoforming.",
            "Polish edges for patient comfort.",
            "Provide care instructions with every delivery.",
        ],
    },
    {
        "slug": "dentures",
        "category": "Prosthetics",
        "title": "Dentures",
        "subtitle": "Complete & partial dentures, digitally.",
        "body": "Print bases and try-in components for efficient full and partial denture workflows — predictable fit, fewer appointments.",
        "total": "Total Time: depends on case type",
        "steps": [
            ("1", "Scan", "Capture arches and bite with ODYX S1.", "~2 min"),
            ("2", "Design", "Design base and tooth setup in CAD.", "~20 min"),
            ("3", "Print", "Print bases/teeth on P1-26.", "~45 min"),
            ("4", "Cure", "Wash and cure for biocompatibility.", "~12 min"),
            ("5", "Finish", "Polish, characterize, and deliver.", "~15 min"),
        ],
        "params": [
            ("Layer Thickness", "50 – 100 μm"),
            ("Exposure Time", "2.2 – 3.2 s"),
            ("Bottom Exposure", "28 – 40 s"),
            ("Bottom Layers", "5 – 6"),
            ("Build Plate Temp.", "30 – 35 °C"),
            ("Resin", "Denture Base Resin"),
        ],
        "tips": [
            "Verify vertical dimension at try-in before final cure finish.",
            "Follow manufacturer wash/cure for mucosal contact resins.",
            "Check border extension for comfort and retention.",
            "Document shade and tooth mold for remakes.",
        ],
    },
    {
        "slug": "try-ins",
        "category": "Prosthetics",
        "title": "Try-ins",
        "subtitle": "Perfect try-ins for better fit & function.",
        "body": "Print inexpensive try-in appliances to validate esthetics, occlusion, and phonetics before committing to the final prosthesis.",
        "total": "Total Time: ~60–75 min",
        "steps": [
            ("1", "Scan", "Record arches and occlusal relationship.", "~2 min"),
            ("2", "Design", "Design try-in from the proposed setup.", "~12 min"),
            ("3", "Print", "Print try-in on P1-26 with Temporary Resin.", "~30 min"),
            ("4", "Cure", "Cure enough for clinical try-in strength.", "~8 min"),
            ("5", "Evaluate", "Assess fit, esthetics, and phonetics.", "~10 min"),
        ],
        "params": [
            ("Layer Thickness", "50 μm"),
            ("Exposure Time", "2.5 – 3.0 s"),
            ("Bottom Exposure", "25 – 30 s"),
            ("Bottom Layers", "5"),
            ("Build Plate Temp.", "30 – 35 °C"),
            ("Resin", "Temporary Resin"),
        ],
        "tips": [
            "Photograph try-in for lab or in-house design notes.",
            "Check midline, plane, and lip support carefully.",
            "Mark adjustments on the try-in before redesign.",
            "Do not use try-in resin as a long-term prosthesis.",
        ],
    },
]


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def latin(text: str) -> str:
    return (
        text.replace("—", "-")
        .replace("–", "-")
        .replace("μ", "u")
        .replace("°", " deg")
        .replace("→", "->")
        .replace("&", "and")
    )


def wrap(text: str, width: float, char_w: float) -> list[str]:
    words = latin(text).split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if len(trial) * char_w <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines or [""]


class Page:
    def __init__(self) -> None:
        self.ops: list[str] = []

    def color(self, r: float, g: float, b: float) -> None:
        self.ops.append(f"{r:.3f} {g:.3f} {b:.3f} rg")
        self.ops.append(f"{r:.3f} {g:.3f} {b:.3f} RG")

    def rect(self, x: float, y: float, w: float, h: float, fill: bool = True) -> None:
        op = "f" if fill else "S"
        self.ops.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re {op}")

    def text(self, x: float, y: float, s: str, size: float, font: str = "F1") -> None:
        self.ops.append("BT")
        self.ops.append(f"/{font} {size:.1f} Tf")
        self.ops.append(f"1 0 0 1 {x:.2f} {y:.2f} Tm")
        self.ops.append(f"({pdf_escape(latin(s))}) Tj")
        self.ops.append("ET")


def build_pdf(doc: dict) -> bytes:
    p = Page()
    W, H = 595.28, 841.89
    m = 48

    p.color(*BLUE)
    p.rect(0, H - 92, W, 92)
    p.color(1, 1, 1)
    p.text(m, H - 42, "ODYX", 18, "F2")
    p.text(m + 72, H - 38, "Clinical Workflow", 10, "F1")
    p.text(m, H - 68, f"{doc['category'].upper()}  |  SCAN -> DESIGN -> PRINT -> WASH & CURE -> DELIVER", 8, "F1")

    y = H - 128
    p.color(*INK)
    p.text(m, y, doc["title"], 22, "F2")
    y -= 20
    p.color(*MUTED)
    p.text(m, y, doc["subtitle"], 11, "F1")
    y -= 18
    for line in wrap(doc["body"], W - 2 * m, 5.2):
        p.text(m, y, line, 10, "F1")
        y -= 13

    y -= 8
    p.color(*INK)
    p.text(m, y, "Workflow Timeline", 13, "F2")
    p.color(*MUTED)
    p.text(m + 160, y, doc["total"], 10, "F1")
    y -= 10
    p.color(*RULE)
    p.rect(m, y, W - 2 * m, 1)
    y -= 22

    for n, title, body, time in doc["steps"]:
        p.color(*BLUE)
        p.rect(m, y - 2, 18, 18)
        p.color(1, 1, 1)
        p.text(m + (6 if len(n) == 1 else 4), y + 2, n, 10, "F2")
        p.color(*INK)
        p.text(m + 28, y + 2, title, 11, "F2")
        p.color(*MUTED)
        p.text(W - m - 70, y + 2, time, 9, "F1")
        y -= 14
        for line in wrap(body, W - 2 * m - 28, 5.1):
            p.text(m + 28, y, line, 10, "F1")
            y -= 13
        y -= 6

    y -= 4
    p.color(*INK)
    p.text(m, y, "Printing Parameters (P1-26)", 13, "F2")
    y -= 10
    p.color(*RULE)
    p.rect(m, y, W - 2 * m, 1)
    y -= 18
    col2 = m + 260
    for i, (label, value) in enumerate(doc["params"]):
        row_y = y - (i * 16)
        if i % 2 == 0:
            p.color(0.95, 0.96, 0.98)
            p.rect(m, row_y - 4, W - 2 * m, 16)
        p.color(*INK)
        p.text(m + 8, row_y, label, 10, "F2")
        p.color(*MUTED)
        p.text(col2, row_y, value, 10, "F1")
    y -= 16 * len(doc["params"]) + 18

    p.color(*INK)
    p.text(m, y, "Clinical Tips", 13, "F2")
    y -= 10
    p.color(*RULE)
    p.rect(m, y, W - 2 * m, 1)
    y -= 18
    for tip in doc["tips"]:
        p.color(*BLUE)
        p.rect(m, y + 2, 7, 7)
        p.color(*INK)
        for i, line in enumerate(wrap(tip, W - 2 * m - 18, 5.1)):
            p.text(m + 16, y, line, 10, "F1")
            if i:
                y -= 12
        y -= 16

    p.color(*BLUE)
    p.rect(0, 0, W, 36)
    p.color(1, 1, 1)
    p.text(m, 14, "odyx.dental  |  Parameters are starting values. Validate on your P1-26 and resin lot.", 8, "F1")

    stream = "\n".join(p.ops).encode("latin-1")
    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
        b"<< /Length %d >>\nstream\n" % len(stream) + stream + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    ]

    out = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for i, obj in enumerate(objects, 1):
        offsets.append(len(out))
        out.extend(f"{i} 0 obj\n".encode())
        out.extend(obj)
        out.extend(b"\nendobj\n")
    xref = len(out)
    out.extend(f"xref\n0 {len(objects)+1}\n".encode())
    out.extend(b"0000000000 65535 f \n")
    for off in offsets[1:]:
        out.extend(f"{off:010d} 00000 n \n".encode())
    out.extend(f"trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode())
    return bytes(out)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for doc in WORKFLOWS:
        path = OUT / f"{doc['slug']}.pdf"
        path.write_bytes(build_pdf(doc))
        print(f"wrote {path.relative_to(ROOT)} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
