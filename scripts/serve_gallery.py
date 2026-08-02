#!/usr/bin/env python3
"""Serve the repo over HTTP, redirecting / to /menus/ (the gallery app)."""
import socket
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a):
        super().__init__(*a, directory=str(ROOT))

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self.send_response(302)
            self.send_header("Location", "/menus/")
            self.end_headers()
            return
        return super().do_GET()

    def log_message(self, *a):
        pass


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8090
    srv = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    ip = socket.gethostbyname(socket.gethostname())
    print(f"Menu gallery: http://{ip}:{port}/menus/  (also http://localhost:{port}/menus/)")
    srv.serve_forever()


if __name__ == "__main__":
    main()
