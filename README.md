# levihuff.net

Personal portfolio website built with [Eleventy](https://www.11ty.dev/).

**Live Site:** [levihuff.net](https://levihuff.net)

## Screenshots

### Homepage
![Homepage](docs/screenshots/homepage.png)

### Projects
![Projects](docs/screenshots/projects.png)

### Blog
![Blog](docs/screenshots/blog.png)

## Tech Stack

- **Generator:** Eleventy (11ty)
- **Templates:** Nunjucks, Markdown
- **Styling:** CSS custom properties
- **Deploy:** GitHub Actions → FTP

## Development

```bash
npm install
npm start       # Dev server
npm run build   # Production build
```

## Structure

```
src/
├── _layouts/     # Templates
├── blog/         # Posts (Markdown)
├── css/          # Styles
├── images/       # Assets
└── *.njk         # Pages
```
