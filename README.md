# Vlad Frolov portfolio

A static portfolio for GitHub Pages. It uses plain HTML, CSS, JavaScript, and a
single JSON file, with no build step or CMS.

Live site: <https://xladdd.github.io/>

## Project structure

```text
data/portfolio.json        Site copy, project order, and image lists
photos/brand/              Personal mark used by the interface
photos/projects/<project>/ Images grouped by portfolio project
index.html                 Home page
project.html               Shared project detail page
script.js                  JSON loading and page rendering
style.css                  Site styles and responsive layouts
site.webmanifest           Installable site metadata
```

Browser, Apple, Android, and Windows icons stay in the repository root because
browsers and platforms commonly request them there.

## Edit the portfolio

Edit [`data/portfolio.json`](./data/portfolio.json) to change site copy,
contact details, project order, project text, and images.

- Reorder projects by moving their complete objects in the `projects` array.
- Set `"published": false` to hide an unfinished project.
- Put new project images in `photos/projects/<project-id>/`.
- Reference local images with paths such as
  `./photos/projects/taktik/taktik-covers.webp`.
- Use `wide`, `half`, or `tall` for gallery layouts.
- Use `wide`, `narrow`, or `offset` for home page card sizes.
- A project can have a `posts` array for carousel tiles, a `gallery` array for
  standalone images, or both.

## Preview locally

The pages load `portfolio.json` with `fetch`, so preview through a local server:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.
