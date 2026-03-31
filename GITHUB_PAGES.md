# GitHub Pages Auto Deploy

This project is configured to deploy automatically with GitHub Actions.

## One-time GitHub setting

In the repository:

1. Open `Settings` -> `Pages`
2. Set `Source` to `GitHub Actions`

## Daily update flow

Run:

```bash
cd "/Users/bytedance/Desktop/心生一计/Dream’s Digital Garden"
git add .
git commit -m "update site"
git push
```

After pushing to `main`, GitHub Actions will build and deploy the site automatically.
