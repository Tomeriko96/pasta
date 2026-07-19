.PHONY: pdf dev clean

dev:
	uv run python3 -m http.server 8080

pdf: menu_improved.pdf

menu_improved.pdf: menu_improved.html
	uv run weasyprint menu_improved.html menu_improved.pdf

clean:
	rm -f menu_improved.pdf
