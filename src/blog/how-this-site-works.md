---
title: How This Site Works - Building with Eleventy and Node.js
description: A technical overview of how levihuff.net is built using Eleventy (11ty) static site generator, Node.js, and automated deployment via GitHub Actions
date: 2025-01-19
tags: [eleventy, nodejs, static-site, web-development, github-actions]
layout: post.njk
thumbnail: /images/blog/site-build-terminal.jpg
---

# How This Site Works - Building with Eleventy and Node.js

This site is built with Eleventy (11ty), a simple and flexible static site generator that runs on Node.js. I chose this approach for its speed, simplicity, and the ability to write content in Markdown while maintaining full control over the HTML output.

## Why a Static Site?

![Terminal showing Eleventy build process output](/images/blog/site-build-terminal.jpg)

Static sites offer several advantages for a portfolio:

- **Fast load times**: No server-side processing means pages load quickly
- **Security**: No database or server-side code to exploit
- **Simple hosting**: Static files can be hosted almost anywhere
- **Version control**: The entire site lives in a Git repository
- **Low cost**: No need for expensive hosting with server-side capabilities

## The Technology Stack

### Node.js

Node.js serves as the runtime environment for the build process. The site uses Node.js 20 for building, though the output is plain HTML, CSS, and JavaScript that requires no server-side runtime.

The `package.json` is minimal:

```json
{
  "name": "levihuff.net",
  "version": "1.0.0",
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy",
    "watch": "eleventy --watch"
  },
  "dependencies": {
    "@11ty/eleventy": "^2.0.1"
  }
}
```

Three commands handle all development needs:
- `npm start` - Runs a local dev server with live reload
- `npm run build` - Builds the production site
- `npm run watch` - Watches for changes without serving

### Eleventy (11ty)

Eleventy is the static site generator that transforms templates and content into HTML. It's known for being zero-config by default while allowing extensive customization when needed.

Key features I use:

**Template Languages**: The site uses Nunjucks (`.njk`) for layouts and page templates, and Markdown (`.md`) for blog posts. Eleventy processes both and outputs plain HTML.

**Collections**: Blog posts are automatically collected from the `src/blog/` directory:

```javascript
eleventyConfig.addCollection("posts", function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/blog/**/*.md");
});
```

**Custom Filters**: Date formatting filters convert dates into readable formats:

```javascript
eleventyConfig.addFilter("dateReadable", function (date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
});
```

**Passthrough Copy**: Static assets like CSS and images are copied directly to the output:

```javascript
eleventyConfig.addPassthroughCopy("src/images");
eleventyConfig.addPassthroughCopy("src/css");
```

## Project Structure

```
levihuff.net/
├── src/
│   ├── _layouts/        # Base templates (base.njk, post.njk)
│   ├── _includes/
│   │   └── components/  # Reusable components (nav.njk, footer.njk)
│   ├── blog/            # Markdown blog posts
│   ├── css/             # Stylesheets
│   ├── images/          # Static images
│   ├── index.njk        # Homepage
│   ├── about.njk        # About page
│   ├── projects.njk     # Projects page
│   └── contact.njk      # Contact page
├── _site/               # Built output (generated)
├── .eleventy.js         # Eleventy configuration
└── package.json         # Node.js dependencies
```

The `src/` directory contains all source files. Eleventy processes these and outputs the final site to `_site/`.

## How Pages Are Built

### Layouts

Every page uses a layout defined in frontmatter. The base layout (`base.njk`) provides the HTML structure, head tags, navigation, and footer. Blog posts use `post.njk`, which extends the base layout and adds post-specific elements like the title, date, tags, and author attribution.

### Blog Posts

Blog posts are Markdown files with YAML frontmatter:

```markdown
---
title: Post Title
description: A brief description
date: 2025-01-19
tags: [tag1, tag2]
layout: post.njk
---

Post content in Markdown...
```

Eleventy processes the Markdown into HTML and inserts it into the post layout. The `posts` collection makes all posts available for listing on the blog index page.

### CSS

The site uses a single CSS file with CSS custom properties (variables) for consistent theming:

```css
:root {
  --color-primary: #004a7c;
  --color-text: #1a1a1a;
  --space-md: 1rem;
  /* ... */
}
```

This approach keeps styling maintainable without requiring a CSS preprocessor or build step for styles.

## Automated Deployment

The site deploys automatically when changes are pushed to the `main` branch. A GitHub Actions workflow handles the process:

1. **Checkout**: Pull the latest code
2. **Setup Node.js**: Install Node.js 20
3. **Install dependencies**: Run `npm ci`
4. **Build**: Run `npm run build` to generate `_site/`
5. **Deploy**: Upload `_site/` contents via FTP to the web host

The workflow uses repository secrets for FTP credentials, keeping them secure while enabling automated deployment.

```yaml
- name: Build project
  run: npm run build

- name: Upload to FTP
  uses: SamKirkland/FTP-Deploy-Action@v4.3.5
  with:
    server: ${{ secrets.FTP_SERVER }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    local-dir: ./_site/
```

## Development Workflow

My typical workflow:

1. Run `npm start` to start the local dev server
2. Edit templates, styles, or content
3. See changes instantly with live reload
4. Commit and push to `main`
5. GitHub Actions builds and deploys automatically

The entire process from edit to live takes just a couple of minutes, with most of that time being the FTP upload.

## Why Eleventy?

I chose Eleventy over other static site generators for several reasons:

- **Simplicity**: Minimal configuration needed to get started
- **Flexibility**: Works with multiple template languages
- **Speed**: Fast build times even with many pages
- **No client-side JavaScript required**: The output is pure HTML and CSS
- **Active community**: Good documentation and community support

Other options like Jekyll, Hugo, or Next.js are also capable, but Eleventy's Node.js foundation and straightforward approach fit my needs well.

## Conclusion

This site demonstrates that a professional portfolio doesn't require complex frameworks or heavy tooling. Eleventy and Node.js provide a simple, fast, and maintainable foundation. The automated deployment via GitHub Actions means I can focus on content rather than deployment processes.

The entire source code follows standard web technologies - HTML, CSS, and Markdown - making it easy to understand, modify, and maintain over time.
