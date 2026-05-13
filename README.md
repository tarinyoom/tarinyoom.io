# Personal Website

Available at [https://tarinyoom.io/](https://www.tarinyoom.io/).

Built with [Hugo](https://gohugo.io/) using the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme (pulled in as a Hugo Module). Deployed to Cloudflare Pages via GitHub Actions.

## Local development

```sh
hugo server -D
```

## Build

```sh
hugo --minify --gc
```

Output goes to `public/`.

## Adding a post

```sh
hugo new content posts/my-new-post.md
```

For posts with math, set `math: true` in the frontmatter to load KaTeX. Use the `{{</* video src="/videos/foo.webm" caption="..." */>}}` shortcode for video embeds.
