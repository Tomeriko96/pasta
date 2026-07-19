.PHONY: pdf clean

pdf: menu_new.pdf

menu_new.pdf: menu_new.html
	uv run weasyprint menu_new.html menu_new.pdf

clean:
	rm -f menu_new.pdf
