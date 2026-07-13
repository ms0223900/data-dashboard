#!/usr/bin/env python3
"""Generate one .pen per dashboard screen (matches docs/design/ref HTML).

Outputs:
  designs/dashboard-screen-1.pen  — Dashboard 首頁（+ Mobile）
  designs/dashboard-screen-2.pen  — 章節進度與作品完成狀態
  designs/dashboard-screen-3.pen  — 學員列表與篩選（預設／MVP／空狀態／Mobile）
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DESIGNS = ROOT / "designs"
OUT_FILES = {
    1: DESIGNS / "dashboard-screen-1.pen",
    2: DESIGNS / "dashboard-screen-2.pen",
    3: DESIGNS / "dashboard-screen-3.pen",
}

# HTML design tokens (docs/design/ref/*.html)
C = {
    "text": "#2C2C2B",
    "muted": "#7D7A75",
    "canvas": "#FFFFFF",
    "soft": "#F9F8F7",
    "surface": "#F0EFED",
    "border": "#E6E5E3",
    "blue": "#2783DE",
    "blue_soft": "#E5F2FC",
    "green": "#46A171",
    "green_soft": "#E8F1EC",
    "orange": "#D5803B",
    "orange_soft": "#FBEBDE",
    "orange_deep": "#8F4E1D",
    "blue_deep": "#165E9F",
    "green_deep": "#276747",
    "insight": "#3F5F76",
}

FONT = "Inter"
_id = 0


def reset_ids() -> None:
    global _id
    _id = 0


def nid(prefix: str = "n") -> str:
    global _id
    _id += 1
    return f"{prefix}{_id}"


def stroke(color: str = C["border"], thickness: int = 1) -> dict:
    return {"align": "inside", "thickness": thickness, "fill": color}


def text(
    content: str,
    *,
    name: str | None = None,
    size: int = 14,
    weight: str | int = "normal",
    fill: str = C["text"],
    width: int | str | None = None,
) -> dict:
    node = {
        "type": "text",
        "id": nid("t"),
        "name": name or content[:24],
        "content": content,
        "fontFamily": FONT,
        "fontSize": size,
        "fontWeight": weight,
        "fill": fill,
    }
    if width is not None:
        node["width"] = width
    return node


def rect(
    w: int | str,
    h: int | str,
    fill: str,
    *,
    name: str = "rect",
    radius: int | float = 0,
) -> dict:
    return {
        "type": "rectangle",
        "id": nid("r"),
        "name": name,
        "width": w,
        "height": h,
        "fill": fill,
        "cornerRadius": radius,
    }


def frame(
    name: str,
    children: list,
    *,
    layout: str = "vertical",
    width: int | str | None = None,
    height: int | str | None = None,
    gap: int | None = None,
    padding: int | list | None = None,
    fill: str | None = None,
    radius: int | float | None = None,
    stroke_color: str | None = None,
    justify: str | None = None,
    align: str | None = None,
    clip: bool = False,
    x: int | None = None,
    y: int | None = None,
) -> dict:
    node: dict = {
        "type": "frame",
        "id": nid("f"),
        "name": name,
        "layout": layout,
        "children": children,
    }
    if width is not None:
        node["width"] = width
    if height is not None:
        node["height"] = height
    if gap is not None:
        node["gap"] = gap
    if padding is not None:
        node["padding"] = padding
    if fill is not None:
        node["fill"] = fill
    if radius is not None:
        node["cornerRadius"] = radius
    if stroke_color is not None:
        node["stroke"] = stroke(stroke_color)
    if justify is not None:
        node["justifyContent"] = justify
    if align is not None:
        node["alignItems"] = align
    if clip:
        node["clip"] = True
    if x is not None:
        node["x"] = x
    if y is not None:
        node["y"] = y
    return node


def badge(label: str = "Demo／假資料版") -> dict:
    return frame(
        "Demo Badge",
        [rect(8, 8, C["orange"], name="dot", radius=99), text(label, size=12, weight="600", fill=C["orange"])],
        layout="horizontal",
        gap=6,
        padding=[5, 12],
        fill=C["orange_soft"],
        radius=999,
        align="center",
    )


def card(name: str, children: list, *, padding: int | list = 20, fill: str = C["canvas"], gap: int = 16) -> dict:
    return frame(
        name,
        children,
        layout="vertical",
        width="fill_container",
        gap=gap,
        padding=padding,
        fill=fill,
        radius=12,
        stroke_color=C["border"],
    )


def kpi(label: str, value: str, value_fill: str = C["text"]) -> dict:
    return frame(
        f"KPI {label}",
        [
            text(label, size=13, weight="500", fill=C["muted"]),
            text(value, size=30, weight="700", fill=value_fill),
        ],
        layout="vertical",
        width="fill_container",
        gap=6,
        padding=[18, 16],
        fill=C["canvas"],
        radius=12,
        stroke_color=C["border"],
    )


def bar_row(label: str, pct: int, track_w: int = 280, thick: int = 10, fill: str = C["blue"]) -> dict:
    fill_w = max(8, int(track_w * pct / 100))
    return frame(
        f"Bar {label}",
        [
            text(label, size=13, weight="normal", fill=C["text"], width=96),
            frame(
                "Track",
                [rect(fill_w, thick, fill, name="fill", radius=99)],
                layout="horizontal",
                width="fill_container",
                height=thick,
                fill=C["surface"],
                radius=99,
                clip=True,
                align="center",
            ),
            text(f"{pct}%", size=13, weight="600", fill=C["text"], width=44),
        ],
        layout="horizontal",
        width="fill_container",
        gap=10,
        align="center",
    )


def status_row(name: str, count: str, dot: str) -> dict:
    return frame(
        f"Status {name}",
        [
            frame(
                "Left",
                [rect(8, 8, dot, name="dot", radius=99), text(name, size=13, fill=C["text"])],
                layout="horizontal",
                gap=10,
                align="center",
            ),
            text(count, size=14, weight="700", fill=C["text"]),
        ],
        layout="horizontal",
        width="fill_container",
        padding=[10, 0],
        justify="space_between",
        align="center",
    )


def pill(label: str, bg: str, fg: str) -> dict:
    return frame(
        f"Pill {label}",
        [text(label, size=12, weight="600", fill=fg)],
        layout="horizontal",
        padding=[4, 10],
        fill=bg,
        radius=999,
        align="center",
    )


def select_field(label: str, value: str) -> dict:
    return frame(
        f"Filter {label}",
        [
            text(label, size=12, weight="600", fill=C["muted"]),
            frame(
                "Select",
                [text(value, size=14, fill=C["text"]), text("▾", size=12, fill=C["muted"])],
                layout="horizontal",
                width=150,
                height=40,
                padding=[9, 12],
                fill=C["soft"],
                radius=8,
                stroke_color=C["border"],
                justify="space_between",
                align="center",
            ),
        ],
        layout="vertical",
        gap=6,
    )


def progress_cell(pct: int) -> dict:
    return frame(
        "Progress",
        [
            text(f"{pct}%", size=13, weight="600", fill=C["text"], width=34),
            frame(
                "pTrack",
                [rect(max(4, int(56 * pct / 100)), 6, C["blue"], name="pFill", radius=99)],
                layout="horizontal",
                width=56,
                height=6,
                fill=C["surface"],
                radius=99,
                clip=True,
            ),
        ],
        layout="horizontal",
        gap=8,
        align="center",
    )


LEARN_PILL = {
    "尚未開始": (C["surface"], C["muted"]),
    "學習中": (C["blue_soft"], C["blue"]),
    "已完成主要章節": (C["green_soft"], C["green"]),
    "已完課": (C["green_soft"], C["green"]),
    "近期未活動": (C["orange_soft"], C["orange"]),
}
WORK_PILL = {
    "尚未開始": (C["surface"], C["muted"]),
    "Build Sprint 中": (C["blue_soft"], C["blue"]),
    "已完成 MVP": (C["green_soft"], C["green"]),
    "已發布": (C["green_soft"], C["green"]),
}

STUDENTS = [
    ("林小安", "an@example.com", 82, "Build Sprint", "已完成主要章節", "已完成 MVP", "2026/07/09", "查看作品"),
    ("陳小宇", "yu@example.com", 54, "User Stories", "學習中", "Build Sprint 中", "2026/07/08", "—"),
    ("王小晴", "sunny@example.com", 18, "Spec", "近期未活動", "尚未開始", "2026/06/20", "—"),
    ("張哲遠", "cheyuan@example.com", 95, "發布／延伸應用", "已完課", "已發布", "2026/07/10", "查看作品"),
    ("李婷惟", "tingwei@example.com", 8, "想法收斂", "尚未開始", "尚未開始", "2026/05/28", "—"),
    ("吳佳玲", "chialing@example.com", 67, "Build Sprint", "學習中", "Build Sprint 中", "2026/07/07", "—"),
    ("黃敏惠", "minhui@example.com", 88, "驗收與修正", "已完成主要章節", "已完成 MVP", "2026/07/09", "查看作品"),
    ("蔡明軒", "mingxuan@example.com", 78, "驗收與修正", "已完成主要章節", "已完成 MVP", "2026/07/08", "查看作品"),
]


def table_header() -> dict:
    cols = ["姓名", "Email", "進度", "目前章節", "學習狀態", "作品狀態", "最後活動", "作品連結"]
    widths = [72, 150, 90, 110, 120, 110, 90, 80]
    cells = [
        frame(
            f"th {c}",
            [text(c, size=12, weight="600", fill=C["muted"])],
            layout="horizontal",
            width=w,
            padding=[10, 14],
            align="center",
        )
        for c, w in zip(cols, widths)
    ]
    return frame(
        "thead",
        cells,
        layout="horizontal",
        width="fill_container",
        fill=C["soft"],
        align="center",
    )


def table_row(s: tuple) -> dict:
    name, email, pct, chapter, learn, work, last, link = s
    lb, lf = LEARN_PILL[learn]
    wb, wf = WORK_PILL[work]
    link_node = text(link, size=13, weight="600", fill=C["blue"] if link != "—" else C["muted"])
    cells = [
        frame("td name", [text(name, size=13, weight="600")], layout="horizontal", width=72, padding=[12, 14]),
        frame("td email", [text(email, size=13, fill=C["muted"])], layout="horizontal", width=150, padding=[12, 14]),
        frame("td prog", [progress_cell(pct)], layout="horizontal", width=90, padding=[12, 14], align="center"),
        frame("td chapter", [text(chapter, size=13)], layout="horizontal", width=110, padding=[12, 14]),
        frame("td learn", [pill(learn, lb, lf)], layout="horizontal", width=120, padding=[12, 14], align="center"),
        frame("td work", [pill(work, wb, wf)], layout="horizontal", width=110, padding=[12, 14], align="center"),
        frame("td last", [text(last, size=13)], layout="horizontal", width=90, padding=[12, 14]),
        frame("td link", [link_node], layout="horizontal", width=80, padding=[12, 14]),
    ]
    return frame(
        f"row {name}",
        cells,
        layout="horizontal",
        width="fill_container",
        fill=C["canvas"],
        align="center",
    )


def build_screen_label(
    x: int,
    y: int,
    *,
    screen_no: int,
    title: str,
    html_ref: str,
    notes: list[str],
) -> dict:
    return frame(
        f"00 Screen {screen_no}｜說明",
        [
            text(f"畫面 {screen_no}｜{title}", size=22, weight="700", fill=C["text"]),
            text(f"HTML 參考：docs/design/ref/{html_ref}", size=13, fill=C["muted"]),
            text(f"Pencil：designs/dashboard-screen-{screen_no}.pen ↔ 實作時一檔一畫面", size=12, fill=C["muted"]),
            *[text(f"• {n}", size=13, fill=C["text"], width=520) for n in notes],
        ],
        layout="vertical",
        width=560,
        height=220,
        gap=10,
        padding=24,
        fill=C["canvas"],
        radius=14,
        stroke_color=C["border"],
        x=x,
        y=y,
        clip=True,
    )


def build_dashboard(x: int, y: int) -> dict:
    chapters = [
        ("想法收斂", 88),
        ("Spec", 73),
        ("User Stories", 65),
        ("Build Sprint", 46),
        ("驗收與修正", 35),
        ("發布／延伸應用", 19),
    ]
    chapter_card = card(
        "章節進度分布",
        [text("章節進度分布", size=15, weight="700")] + [bar_row(n, p) for n, p in chapters],
        gap=12,
    )
    status_card = card(
        "作品完成狀態",
        [
            text("作品完成狀態", size=15, weight="700"),
            status_row("尚未開始", "12", C["muted"]),
            status_row("Build Sprint 中", "17", C["orange"]),
            status_row("已完成 MVP", "11", C["blue"]),
            status_row("已發布", "4", C["green"]),
        ],
        gap=0,
    )
    summary = card(
        "課程學習成效摘要",
        [
            text("課程學習成效摘要", size=15, weight="700"),
            text("• 已開始學習：39／48 人", size=13, fill=C["text"]),
            text("• 平均完成進度：56%", size=13, fill=C["text"]),
            text("• 已完成或發布作品：15 人", size=13, fill=C["text"]),
            text("• 建議聚焦：Build Sprint 支援", size=13, weight="700", fill=C["orange"]),
        ],
        gap=10,
    )
    cta = frame(
        "學員列表入口",
        [
            frame(
                "cta text",
                [
                    text("學員列表", size=15, weight="700"),
                    text("從整體數字回到個別學員，篩選學習狀態、作品狀態與完成進度。", size=13, fill=C["muted"], width=320),
                ],
                layout="vertical",
                gap=8,
                width="fill_container",
            ),
            frame(
                "CTA btn",
                [text("查看與篩選學員 →", size=14, weight="600", fill="#FFFFFF")],
                layout="horizontal",
                padding=[11, 18],
                fill=C["blue"],
                radius=8,
                align="center",
            ),
        ],
        layout="vertical",
        width="fill_container",
        gap=16,
        padding=20,
        fill=C["blue_soft"],
        radius=12,
        stroke_color=C["border"],
        justify="space_between",
    )
    tip = frame(
        "教學展示重點",
        [
            text(
                "教學展示重點：首頁先回答三個問題──有沒有開始學、完成到哪裡、有沒有做出作品；KPI、章節進度與作品狀態皆來自同一組假資料；「Demo／假資料版」標示清楚可見。",
                size=12,
                fill=C["muted"],
                width=1040,
            )
        ],
        layout="vertical",
        width="fill_container",
        padding=[16, 20],
        fill=C["canvas"],
        radius=12,
        stroke_color=C["border"],
    )
    return frame(
        "01 Dashboard 首頁｜Desktop",
        [
            frame(
                "Header",
                [
                    frame(
                        "Title Row",
                        [text("課程學員數據儀表板", size=26, weight="700"), badge()],
                        layout="horizontal",
                        gap=12,
                        align="center",
                    ),
                    text("觀察學員是否跟上課程，並完成自己的 MVP", size=15, fill=C["text"]),
                    text("資料狀態：Mock data｜最後更新：2026/07/10", size=13, fill=C["muted"]),
                ],
                layout="vertical",
                width="fill_container",
                gap=8,
            ),
            frame(
                "KPI Grid",
                [
                    kpi("總學員數", "48"),
                    kpi("已開始學習", "39", C["blue"]),
                    kpi("平均完成進度", "56%", C["blue"]),
                    kpi("作品完成率", "31%", C["green"]),
                ],
                layout="horizontal",
                width="fill_container",
                gap=16,
            ),
            frame(
                "Charts Row",
                [chapter_card, status_card],
                layout="horizontal",
                width="fill_container",
                gap=16,
            ),
            frame(
                "Bottom Row",
                [summary, cta],
                layout="horizontal",
                width="fill_container",
                gap=16,
            ),
            tip,
        ],
        layout="vertical",
        width=1120,
        height=980,
        gap=24,
        padding=[32, 24, 40, 24],
        fill=C["soft"],
        x=x,
        y=y,
        clip=True,
    )


def chapter_bar_detail(label: str, count: str, pct: int, tone: str) -> dict:
    track_w = 360
    fill_w = max(10, int(track_w * pct / 100))
    fill = {"high": C["blue"], "mid": C["orange"], "low": "#A6A29B"}[tone]
    return frame(
        f"Chapter {label}",
        [
            text(label, size=15, weight="600", fill=C["text"], width=132),
            frame(
                "Track",
                [rect(fill_w, 18, fill, name="fill", radius=99)],
                layout="horizontal",
                width="fill_container",
                height=18,
                fill=C["surface"],
                radius=99,
                clip=True,
            ),
            text(f"{count} · {pct}%", size=14, fill=C["muted"], width=92),
        ],
        layout="horizontal",
        width="fill_container",
        gap=14,
        align="center",
    )


def work_status_item(icon: str, name: str, meta: str, pct: str, bg: str, fg: str) -> dict:
    return frame(
        f"WS {name}",
        [
            frame(
                "icon",
                [text(icon, size=14, weight="700", fill=fg)],
                layout="horizontal",
                width=44,
                height=44,
                fill=bg,
                radius=12,
                justify="center",
                align="center",
            ),
            frame(
                "meta",
                [text(name, size=14, weight="700"), text(meta, size=14, fill=C["muted"])],
                layout="vertical",
                gap=2,
                width="fill_container",
            ),
            text(pct, size=22, weight="700", fill=C["text"]),
        ],
        layout="horizontal",
        width="fill_container",
        gap=12,
        padding=12,
        fill=C["soft"],
        radius=14,
        stroke_color=C["border"],
        align="center",
    )


def build_chapter_screen(x: int, y: int) -> dict:
    left = frame(
        "章節進度面板",
        [
            frame(
                "panel title",
                [
                    text("章節進度分布", size=22, weight="700"),
                    text("完成率以 48 位學員計算", size=14, fill=C["muted"]),
                ],
                layout="horizontal",
                width="fill_container",
                justify="space_between",
                align="end",
            ),
            chapter_bar_detail("想法收斂", "42／48", 88, "high"),
            chapter_bar_detail("Spec", "35／48", 73, "high"),
            chapter_bar_detail("User Stories", "31／48", 65, "high"),
            chapter_bar_detail("Build Sprint", "22／48", 46, "mid"),
            chapter_bar_detail("驗收與修正", "17／48", 35, "mid"),
            chapter_bar_detail("發布／延伸應用", "9／48", 19, "low"),
            frame(
                "資料解讀提示",
                [
                    frame(
                        "i mark",
                        [text("i", size=14, weight="700", fill="#FFFFFF")],
                        layout="horizontal",
                        width=34,
                        height=34,
                        fill=C["blue"],
                        radius=10,
                        justify="center",
                        align="center",
                    ),
                    frame(
                        "insight text",
                        [
                            text("資料解讀提示", size=17, weight="700"),
                            text(
                                "最多學員已完成 Spec，但進入 Build Sprint 的比例下降；後續可評估是否補充實作示範、除錯案例或 Sprint 範例。",
                                size=14,
                                fill=C["insight"],
                                width=480,
                            ),
                        ],
                        layout="vertical",
                        gap=4,
                        width="fill_container",
                    ),
                ],
                layout="horizontal",
                width="fill_container",
                gap=14,
                padding=18,
                fill=C["blue_soft"],
                radius=16,
                stroke_color="#B7D6F3",
                align="start",
            ),
        ],
        layout="vertical",
        width="fill_container",
        gap=13,
        padding=22,
        fill=C["canvas"],
        radius=18,
        stroke_color=C["border"],
    )
    right = frame(
        "作品完成面板",
        [
            frame(
                "panel title",
                [
                    text("作品完成狀態", size=22, weight="700"),
                    text("分辨是否真的產出作品", size=14, fill=C["muted"]),
                ],
                layout="horizontal",
                width="fill_container",
                justify="space_between",
                align="end",
            ),
            work_status_item("0", "尚未開始", "12 人", "25%", C["surface"], C["text"]),
            work_status_item("B", "Build Sprint 中", "17 人", "35%", C["orange_soft"], C["orange_deep"]),
            work_status_item("M", "已完成 MVP", "11 人", "23%", C["green_soft"], C["green_deep"]),
            work_status_item("✓", "已發布", "4 人", "8%", C["blue_soft"], C["blue_deep"]),
            frame(
                "teaching",
                [
                    frame("p1", [text("章節圖表", size=13, weight="700"), text("回答學員主要完成到哪裡。", size=13, fill=C["muted"], width=140)], layout="vertical", gap=4, padding=14, fill=C["canvas"], radius=14, stroke_color=C["border"], width="fill_container"),
                    frame("p2", [text("作品狀態", size=13, weight="700"), text("回答是否真的做出作品。", size=13, fill=C["muted"], width=140)], layout="vertical", gap=4, padding=14, fill=C["canvas"], radius=14, stroke_color=C["border"], width="fill_container"),
                    frame("p3", [text("摘要提示", size=13, weight="700"), text("只做可理解判斷，不進入複雜 BI。", size=13, fill=C["muted"], width=140)], layout="vertical", gap=4, padding=14, fill=C["canvas"], radius=14, stroke_color=C["border"], width="fill_container"),
                ],
                layout="horizontal",
                width="fill_container",
                gap=12,
            ),
        ],
        layout="vertical",
        width=380,
        gap=12,
        padding=22,
        fill=C["canvas"],
        radius=18,
        stroke_color=C["border"],
    )
    return frame(
        "02 章節進度與作品完成狀態｜Desktop",
        [
            frame(
                "Header",
                [
                    frame(
                        "Left",
                        [
                            badge(),
                            text("章節進度與作品完成狀態", size=36, weight="700"),
                            text(
                                "協助管理者看出學員停留在哪個課程階段，並把「看課進度」和「實際做出作品」分開判斷。",
                                size=17,
                                fill=C["muted"],
                                width=660,
                            ),
                        ],
                        layout="vertical",
                        gap=12,
                        width="fill_container",
                    ),
                    frame(
                        "關鍵落差卡",
                        [
                            text("關鍵落差", size=13, fill=C["muted"]),
                            text("46%", size=32, weight="700"),
                            text("已進入 Build Sprint；低於完成 Spec 的 73%", size=14, fill=C["muted"], width=200),
                        ],
                        layout="vertical",
                        gap=2,
                        padding=16,
                        fill=C["canvas"],
                        radius=14,
                        stroke_color=C["border"],
                        width=220,
                    ),
                ],
                layout="horizontal",
                width="fill_container",
                gap=24,
                justify="space_between",
                align="start",
            ),
            frame(
                "Grid",
                [left, right],
                layout="horizontal",
                width="fill_container",
                gap=20,
            ),
        ],
        layout="vertical",
        width=1120,
        height=920,
        gap=24,
        padding=32,
        fill=C["canvas"],
        x=x,
        y=y,
        clip=True,
    )


def build_student_list(
    x: int,
    y: int,
    *,
    title_suffix: str,
    learn_val: str,
    work_val: str,
    progress_val: str,
    rows: list[tuple],
    empty: bool = False,
    height: int = 860,
) -> dict:
    filters = frame(
        "篩選列",
        [
            select_field("學習狀態", learn_val),
            select_field("作品狀態", work_val),
            select_field("完成進度", progress_val),
            frame(
                "重設",
                [text("重設", size=14, weight="600")],
                layout="horizontal",
                height=40,
                padding=[0, 16],
                fill=C["soft"],
                radius=8,
                stroke_color=C["border"],
                align="center",
                justify="center",
            ),
        ],
        layout="horizontal",
        width="fill_container",
        gap=12,
        padding=20,
        fill=C["canvas"],
        radius=12,
        stroke_color=C["border"],
        align="end",
    )
    count = frame(
        "Count",
        [text(f"目前顯示：{0 if empty else len(rows)} 位學員", size=13, fill=C["muted"])],
        layout="horizontal",
        width="fill_container",
    )
    if empty:
        body = frame(
            "空狀態",
            [
                frame(
                    "empty icon",
                    [text("🔍", size=20)],
                    layout="horizontal",
                    width=44,
                    height=44,
                    fill=C["surface"],
                    radius=999,
                    justify="center",
                    align="center",
                ),
                text("沒有符合目前篩選條件的學員", size=14, fill=C["muted"]),
                frame(
                    "清除篩選",
                    [text("清除篩選", size=14, weight="600")],
                    layout="horizontal",
                    height=40,
                    padding=[0, 16],
                    fill=C["soft"],
                    radius=8,
                    stroke_color=C["border"],
                    align="center",
                    justify="center",
                ),
            ],
            layout="vertical",
            width="fill_container",
            gap=12,
            padding=[56, 24],
            fill=C["canvas"],
            radius=12,
            stroke_color=C["border"],
            align="center",
            justify="center",
        )
    else:
        body = frame(
            "Table",
            [table_header()] + [table_row(r) for r in rows],
            layout="vertical",
            width="fill_container",
            fill=C["canvas"],
            radius=12,
            stroke_color=C["border"],
            clip=True,
        )
    return frame(
        f"03 學員列表｜{title_suffix}",
        [
            frame(
                "Header",
                [
                    frame(
                        "titles",
                        [
                            text("學員列表與篩選", size=22, weight="700"),
                            text("從整體數字回到個別學員，快速查看不同學習與作品狀態的群組", size=14, fill=C["muted"]),
                        ],
                        layout="vertical",
                        gap=4,
                        width="fill_container",
                    ),
                    badge(),
                ],
                layout="horizontal",
                width="fill_container",
                justify="space_between",
                align="start",
            ),
            filters,
            count,
            body,
            text("第一版僅提供顯示與篩選，不包含學員備註編輯、權限管理或完整 CRM。", size=12, fill=C["muted"]),
        ],
        layout="vertical",
        width=1080,
        height=height,
        gap=16,
        padding=[32, 24, 40, 24],
        fill=C["soft"],
        x=x,
        y=y,
        clip=True,
    )


def build_mobile_dashboard(x: int, y: int) -> dict:
    chapters = [("想法收斂", 88), ("Spec", 73), ("User Stories", 65), ("Build Sprint", 46), ("驗收與修正", 35), ("發布／延伸應用", 19)]
    return frame(
        "05 Dashboard｜Mobile 390",
        [
            frame(
                "Header",
                [
                    text("課程學員數據儀表板", size=20, weight="700", width=300),
                    badge(),
                    text("觀察學員是否跟上課程，並完成自己的 MVP", size=13, fill=C["text"], width=330),
                    text("Mock data｜2026/07/10", size=12, fill=C["muted"]),
                ],
                layout="vertical",
                width="fill_container",
                gap=8,
            ),
            frame(
                "KPI 2x2",
                [
                    frame("r1", [kpi("總學員數", "48"), kpi("已開始學習", "39", C["blue"])], layout="horizontal", width="fill_container", gap=10),
                    frame("r2", [kpi("平均完成進度", "56%", C["blue"]), kpi("作品完成率", "31%", C["green"])], layout="horizontal", width="fill_container", gap=10),
                ],
                layout="vertical",
                width="fill_container",
                gap=10,
            ),
            card("章節進度", [text("章節進度分布", size=14, weight="700")] + [bar_row(n, p, track_w=140) for n, p in chapters], gap=10, padding=14),
            card(
                "作品狀態",
                [
                    text("作品完成狀態", size=14, weight="700"),
                    status_row("尚未開始", "12", C["muted"]),
                    status_row("Build Sprint 中", "17", C["orange"]),
                    status_row("已完成 MVP", "11", C["blue"]),
                    status_row("已發布", "4", C["green"]),
                ],
                gap=0,
                padding=14,
            ),
            frame(
                "CTA",
                [text("查看與篩選學員 →", size=14, weight="600", fill="#FFFFFF")],
                layout="horizontal",
                width="fill_container",
                padding=14,
                fill=C["blue"],
                radius=8,
                justify="center",
                align="center",
            ),
        ],
        layout="vertical",
        width=390,
        height=1180,
        gap=16,
        padding=20,
        fill=C["soft"],
        x=x,
        y=y,
        clip=True,
    )


def build_mobile_list(x: int, y: int) -> dict:
    sample = STUDENTS[:3]
    rows = []
    for s in sample:
        name, email, pct, chapter, learn, work, last, link = s
        lb, lf = LEARN_PILL[learn]
        wb, wf = WORK_PILL[work]
        rows.append(
            frame(
                f"card {name}",
                [
                    frame("top", [text(name, size=15, weight="700"), text(f"{pct}%", size=14, weight="700", fill=C["blue"])], layout="horizontal", width="fill_container", justify="space_between"),
                    text(email, size=12, fill=C["muted"]),
                    text(f"{chapter} · {last}", size=12, fill=C["muted"]),
                    frame("pills", [pill(learn, lb, lf), pill(work, wb, wf)], layout="horizontal", gap=8),
                ],
                layout="vertical",
                width="fill_container",
                gap=8,
                padding=14,
                fill=C["canvas"],
                radius=12,
                stroke_color=C["border"],
            )
        )
    return frame(
        "06 學員列表｜Mobile 390",
        [
            frame(
                "Header",
                [text("學員列表與篩選", size=20, weight="700"), badge()],
                layout="vertical",
                gap=8,
                width="fill_container",
            ),
            frame(
                "Filters stack",
                [
                    select_field("學習狀態", "全部"),
                    select_field("作品狀態", "全部"),
                    select_field("完成進度", "全部"),
                    frame("重設", [text("重設", size=14, weight="600")], layout="horizontal", width="fill_container", height=40, fill=C["soft"], radius=8, stroke_color=C["border"], justify="center", align="center"),
                ],
                layout="vertical",
                width="fill_container",
                gap=10,
                padding=14,
                fill=C["canvas"],
                radius=12,
                stroke_color=C["border"],
            ),
            text(f"目前顯示：{len(sample)} 位學員", size=13, fill=C["muted"]),
            *rows,
            text("表格於窄版改為卡片堆疊；完整欄位可水平捲動。", size=12, fill=C["muted"], width=330),
        ],
        layout="vertical",
        width=390,
        height=980,
        gap=12,
        padding=20,
        fill=C["soft"],
        x=x,
        y=y,
        clip=True,
    )


def write_pen(path: Path, children: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    # Valid JSON only — never prefix with non-JSON characters
    doc = {"version": "2.6", "children": children}
    path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    parsed = json.loads(path.read_text(encoding="utf-8"))
    assert parsed["version"] == "2.6"
    assert parsed["children"]
    print(f"Wrote {path.relative_to(ROOT)} ({path.stat().st_size} bytes)")
    for c in parsed["children"]:
        print(f"  - {c['name']} @ ({c['x']},{c['y']}) {c['width']}x{c['height']}")


def build_screen_1() -> list[dict]:
    reset_ids()
    return [
        build_screen_label(
            0,
            0,
            screen_no=1,
            title="Dashboard 首頁總覽",
            html_ref="dashboard-screen-1.html",
            notes=[
                "KPI、章節進度、作品狀態、學員列表入口",
                "同一組假資料；清楚標示 Demo／假資料版",
            ],
        ),
        build_dashboard(0, 280),
        build_mobile_dashboard(1200, 280),
    ]


def build_screen_2() -> list[dict]:
    reset_ids()
    return [
        build_screen_label(
            0,
            0,
            screen_no=2,
            title="章節進度與作品完成狀態",
            html_ref="dashboard-screen-2.html",
            notes=[
                "章節完成人數／完成率＋作品狀態比例",
                "含資料解讀提示（Spec → Build Sprint 落差）",
            ],
        ),
        build_chapter_screen(0, 280),
    ]


def build_screen_3() -> list[dict]:
    reset_ids()
    mvp_rows = [s for s in STUDENTS if s[5] == "已完成 MVP"]
    return [
        build_screen_label(
            0,
            0,
            screen_no=3,
            title="學員列表與互動篩選",
            html_ref="dashboard-screen-3.html",
            notes=[
                "學習／作品／進度篩選、重設、空狀態",
                "本檔含：預設、已完成 MVP、空狀態、Mobile",
            ],
        ),
        build_student_list(
            0,
            280,
            title_suffix="預設 Desktop",
            learn_val="全部",
            work_val="全部",
            progress_val="全部",
            rows=STUDENTS[:6],
            height=780,
        ),
        build_student_list(
            1160,
            280,
            title_suffix="已完成 MVP 篩選",
            learn_val="全部",
            work_val="已完成 MVP",
            progress_val="全部",
            rows=mvp_rows,
            height=620,
        ),
        build_student_list(
            2320,
            280,
            title_suffix="空狀態",
            learn_val="近期未活動",
            work_val="已發布",
            progress_val="76–100%",
            rows=[],
            empty=True,
            height=520,
        ),
        build_mobile_list(0, 1160),
    ]


def main() -> None:
    write_pen(OUT_FILES[1], build_screen_1())
    write_pen(OUT_FILES[2], build_screen_2())
    write_pen(OUT_FILES[3], build_screen_3())

    legacy = DESIGNS / "course-student-dashboard.pen"
    if legacy.exists():
        legacy.unlink()
        print(f"Removed legacy {legacy.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
