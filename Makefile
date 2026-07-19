.PHONY: pdf dev gallery clean streamlit

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

clean:
	rm -f menu_improved.pdf
