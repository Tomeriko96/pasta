"""Streamlit gallery for browsing every pasta menu HTML version.

Run with:  uv run --with streamlit streamlit run streamlit_gallery.py
(or: make streamlit)
"""
import json
import os
import re
import threading
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import streamlit as st
from streamlit.components.v1 import html as st_html

ASSET_PORT = 8765
ROOT = Path(__file__).resolve().parent
MENUS_DIR = ROOT / "menus"

SECTIONS = {
    "agent": "Agent menus",
    "print": "Print menus",
    "signage": "Signage (LG)",
}

AGENT_LABELS = {
    "tourist": "Tourist friendly",
    "designer": "Graphic designer",
    "connoisseur": "Italian connoisseur",
    "owner": "Restaurant owner",
}


def discover_entries():
    """Return list of dicts: {section, name, base(Path), sort}."""
    entries = []

    # Agent menus live in menus/
    for p in sorted(MENUS_DIR.glob("menu_*.html")):
        if p.name == "index.html":
            continue
        entries.append({"section": "agent", "name": p.name, "base": MENUS_DIR,
                        "sort": (agent_of(p.name), version_of(p.name))})

    # Print menus: menu_improved / menu_agentic* in parent dir
    for p in sorted(ROOT.glob("menu_*.html")):
        if p.name.startswith("menu_screen"):
            continue
        entries.append({"section": "print", "name": p.name, "base": ROOT,
                        "sort": (version_of(p.name), p.name)})

    # Signage: the LG signage page
    screen = ROOT / "menu_screen.html"
    if screen.exists():
        entries.append({"section": "signage", "name": screen.name, "base": ROOT,
                        "sort": (0, screen.name)})

    return sorted(entries, key=lambda e: (list(SECTIONS).index(e["section"]), e["sort"]))


def agent_of(fname):
    m = re.match(r"^menu_([a-z]+?)(?:_v\d+)?\.html$", fname)
    return m.group(1) if m else "other"


def version_of(fname):
    m = re.search(r"_v(\d+)\.html$", fname)
    if m:
        return int(m.group(1))
    if fname == "menu_improved.html":
        return 0
    if fname.startswith("menu_agentic"):
        return 1
    return 1


def label(entry):
    n = entry["name"]
    if entry["section"] == "agent":
        return f"{AGENT_LABELS.get(agent_of(n), agent_of(n))} v{version_of(n)}"
    if entry["section"] == "print":
        return n.replace("menu_", "").replace(".html", "").replace("_", " ").title()
    return "LG Signage (menu_screen)"


def start_asset_server():
    """Serve menus/ and the repo root over HTTP on a side port."""
    if getattr(start_asset_server, "started", False):
        return

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *a):
            # map /menus/<file> and /root/<file>
            super().__init__(*a, directory=str(ROOT))

        def log_message(self, *a):
            pass

    srv = ThreadingHTTPServer(("127.0.0.1", ASSET_PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    start_asset_server.started = True


def main():
    st.set_page_config(page_title="Pasta Menu Gallery", layout="wide")
    start_asset_server()
    st.title("Pasta Menu Gallery")

    entries = discover_entries()
    if not entries:
        st.error("No menu HTML files found.")
        return

    # Group entries by section for the sidebar
    by_section = {s: [] for s in SECTIONS}
    for e in entries:
        by_section[e["section"]].append(e)
    section_order = [s for s in SECTIONS if by_section[s]]

    with st.sidebar:
        st.header("Sections")
        sel_sections = st.multiselect(
            "Show",
            section_order,
            format_func=lambda s: SECTIONS[s],
            default=section_order,
        )
        visible = [e for e in entries if e["section"] in sel_sections]
        mode = st.radio("Mode", ["Single", "Compare two"])
        if mode == "Single":
            choice = st.selectbox("Menu", visible, format_func=label)
        else:
            left = st.selectbox("Left", visible, format_func=label, index=0)
            right = st.selectbox(
                "Right", visible, format_func=label,
                index=min(1, len(visible) - 1),
            )

        st.markdown("---")
        st.caption(f"{len(entries)} menu files total")

    def url_for(entry):
        # menus/ files served at /menus/<name>, root files at /<name>
        if entry["base"] == MENUS_DIR:
            return f"http://127.0.0.1:{ASSET_PORT}/menus/{entry['name']}"
        return f"http://127.0.0.1:{ASSET_PORT}/{entry['name']}"

    def render(entry):
        url = url_for(entry)
        frame = (
            f'<iframe src="{url}" width="100%" height="1100" '
            'style="border:1px solid #d9cdb6; background:#fff;" '
            'sandbox="allow-same-origin allow-scripts"></iframe>'
        )
        st_html(frame, height=1100, scrolling=True)

    if mode == "Single":
        col1, col2, col3 = st.columns([1, 6, 1])
        with col1:
            if st.button("Prev", use_container_width=True) and visible:
                idx = (visible.index(choice) - 1) % len(visible)
                st.session_state["choice"] = visible[idx]
        with col3:
            if st.button("Next", use_container_width=True) and visible:
                idx = (visible.index(choice) + 1) % len(visible)
                st.session_state["choice"] = visible[idx]
        if "choice" in st.session_state:
            choice = st.session_state["choice"]
        st.subheader(label(choice))
        render(choice)
        st.download_button(
            "Download HTML",
            (choice["base"] / choice["name"]).read_bytes(),
            file_name=choice["name"],
        )
    else:
        c1, c2 = st.columns(2)
        with c1:
            st.subheader(label(left))
            render(left)
        with c2:
            st.subheader(label(right))
            render(right)


if __name__ == "__main__":
    main()
