# GitHub Pages Deploy

## One-time setup

1. Create a GitHub repository for this project.
2. Push the project to the repository's default branch.

## Deploy

Run:

```bash
npm install
npm run deploy
```

This publishes the built site from `dist/` to the `gh-pages` branch.

## GitHub repo settings

In GitHub:

1. Open `Settings` -> `Pages`
2. Set `Source` to `Deploy from a branch`
3. Choose branch `gh-pages`
4. Choose folder `/ (root)`

After that, GitHub Pages will serve the site from the published branch.
