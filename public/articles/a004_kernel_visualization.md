---
title: "Kernel Visualization"
tags: [SPH]
---

The central insight of SPH is that discrete particles can collectively represent smooth fields if we assign each particle a smooth kernel of influence. So, in approximating the <a href="https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations">Navier-Stokes equations</a>, we can compute quantities like velocity and pressure at finitely many positions, which then yield differentiable velocity and pressure functions, which can then be used to evolve the fluid.

<video class="small" src="images/kernel_viz.webm" autoplay loop muted playsinline></video>
