---
title: "Dependency Shedding"
tags: [thoughts]
---

This is the second time I've set up a personal site. Previously, I had a simple website I'd made with a tool called [*create-react-app*](https://create-react-app.dev/docs/getting-started/), with components from [MaterialUI](https://mui.com/material-ui/).
It had a few cards pointing to personal projects I've worked on in the past, like so:

![Old Personal Website](/images/old_site.png)

This worked well, until the years passed and my dependabot began harassing me with streams of urgent security vulnerabilities that needed my attention.
Of course, I could `npm audit fix` to upgrade to newer patched versions of my dependencies.
But even then, my project needed further updating.
*create-react-app* had lost popularity to next.js, and I now had to reason about an entirely different framework for setting up my website.
The entire React ecosystem seemed to have reinvented itself.

I once had a professor tell me that learning web technologies is like catching a tiger by its tail: it's hard to catch on, and once you do, you need to hold on tight.
For me, front-end frameworks may just not be a tiger I'm trying to catch.

Some key takeaways:
1. Dependencies can bring quick functionality, but they're also additional developer responsibility. Make sure you understand the role of the recursive dependencies you're bringing in before committing to them.
2. Take time to understand the stability of the technology. Just because a technology is widely used doesn't mean it won't change. In some cases, *because* it's widely used, the technology may change more as the community demands richer and richer features.
3. Unstable technologies are okay, but they should really be in your most active area of development. Because most of my current work deals in high-performance computing, I have less bandwidth to keep abreast of trends in front-end frameworks.

My current website just uses plain HTML + CSS.
That sounds just fine to me for now.
