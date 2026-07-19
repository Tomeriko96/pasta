.PHONY: pdf dev gallery clean

dev:
	uv run python3 -m http.server 8080

gallery:
	./scripts/gen_gallery_manifest.sh
	@echo "Menu gallery: http://localhost:8090/menus/"
	uv run python3 -m http.server 8090

pdf: menu_improved.pdf

menu_improved.pdf: menu_improved.html
	uv run weasyprint menu_improved.html menu_improved.pdf

clean:
	rm -f menu_improved.pdf
