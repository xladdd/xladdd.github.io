# Vlad Frolov portfolio

A static portfolio for GitHub Pages. There is no build step or CMS.

The portfolio lives [here](https://xladdd.github.io/).

## Edit the portfolio

Site copy, contact details, project order, project text, and image lists live in
[`data/portfolio.json`](./data/portfolio.json).

- Reorder projects by moving their complete objects in the `projects` array.
- Hide a project with `"published": false`.
- Publish a project with `"published": true` after its text and images are ready.
- Add images to `photos/`, then reference them with a relative path such as
  `./photos/example.jpg`.
- Use `wide`, `half`, or `tall` for gallery image layouts.
- Use `wide`, `narrow`, or `offset` for home page card sizes.

Wellwet is already included as an unpublished draft, ready for the fuller social
media work when it is available.

## Preview locally

Because the page loads its content from JSON, preview it through a local web
server rather than opening `index.html` directly:

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.
