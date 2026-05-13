# Personal Website

Available at [https://tarinyoom.io/](https://www.tarinyoom.io/).

Built with [Hugo](https://gohugo.io/). Two pages total: a long-form stream of all posts at `/`, and a contact page at `/contact/`. Custom minimal templates — no external theme. Deployed to Cloudflare Pages via GitHub Actions.

## Local development

```sh
hugo server
```

## Build

```sh
hugo --minify --gc
```

Output goes to `public/`.

## Adding a post

Drop a markdown file in `content/posts/`. Required frontmatter:

```yaml
---
title: "My Post"
date: 2026-01-01
tags: [thoughts]
math: true   # optional — only set if the post uses $...$ or $$...$$
---
```

Posts don't get their own URL — they're rendered inline on the home page, with an anchor at `#<filename>` (e.g. `/#my-post`).

Use the `{{</* video src="/videos/foo.webm" caption="..." */>}}` shortcode for video embeds. Drop images/videos in `static/images/` and `static/videos/`; reference them with absolute paths starting with `/`.
