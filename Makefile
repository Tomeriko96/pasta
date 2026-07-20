.PHONY: pdf dev gallery clean streamlit usb usb-video

dev:
	uv run python3 -m http.server 8080

gallery:
	./scripts/gen_gallery_manifest.sh
	@echo "Menu gallery: http://localhost:8090/menus/"
	uv run python3 scripts/serve_gallery.py 8090

# Streamlit gallery app (separate from the static one): `make streamlit`
streamlit:
	./scripts/gen_gallery_manifest.sh
	uv run --with streamlit streamlit run streamlit_gallery.py --server.port 8501

pdf: menu_improved.pdf

menu_improved.pdf: menu_improved.html
	uv run weasyprint menu_improved.html menu_improved.pdf

# Build a self-contained, offline webOS app (launcher + all HTML variants +
# bundled fonts/images) and zip it to dist/usb/application/pasta-signage.zip.
# Copy that application/ folder to a FAT32 USB stick and install via
# SI Server Setting (Application Launch Mode: Local, Type: ZIP, Upgrade: USB).
usb:
	python3 scripts/build_signage_usb.py

# Render menu_screen.html (real CSS motion: Ken Burns, shimmer, glow) into a
# looping MP4 for USB Plug & Play. No app install / SI Server Setting needed:
# just copy dist/usb/menu-signage.mp4 to a FAT32 stick and it auto-plays.
# The live clock and 10-min reload are stripped (a frozen clock on a loop looks
# wrong). Set the TV orientation to PORTRAIT before playing.
usb-video:
	node scripts/build_signage_video.js

clean:
	rm -f menu_improved.pdf
