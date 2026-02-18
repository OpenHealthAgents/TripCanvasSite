# TripCanvasSite

Static customer-facing website for TripCanvas.

## Local preview

```bash
cd /home/kalyan/TripCanvasSite
python3 -m http.server 8080
```

Open: `http://localhost:8080`

## Deploy to Netlify (CLI)

```bash
cd /home/kalyan/TripCanvasSite
npm i -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

Netlify uses `netlify.toml` in this repo.

## Deploy to Vercel (CLI)

```bash
cd /home/kalyan/TripCanvasSite
npm i -g vercel
vercel login
vercel --prod
```

Vercel uses `vercel.json` in this repo.

## Deploy to GitHub Pages

1. Push this folder contents to a GitHub repo.
2. In GitHub: `Settings -> Pages`.
3. Source: `Deploy from a branch`.
4. Branch: `main` and folder: `/ (root)`.

No build step is required.

## Go-live checklist

Before launch, replace placeholder domain values in:

- `index.html`: canonical URL, Open Graph URL/image, Twitter image, JSON-LD URL
- `robots.txt`: sitemap URL
- `sitemap.xml`: `<loc>` value
