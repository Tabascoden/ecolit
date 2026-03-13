# Ecolit Builder Landing

Static builder-first landing page prototype for Ecolit USA.

## Local Run

Use any simple HTTP server from the repository root.

```powershell
python -m http.server 8085 --bind 127.0.0.1
```

Open:

- `http://127.0.0.1:8085/`
- `http://127.0.0.1:8085/builders/`

## GitHub Pages

This repository is ready for GitHub Pages because it is a static site:

- `index.html` at the root
- static routes in folders
- no build step required

Enable Pages in repository settings and publish from the `main` branch root.

## Notes

- The form is prototype-only and does not submit to a backend.
- Direct file upload UI is present, but production upload handling still needs backend wiring.
