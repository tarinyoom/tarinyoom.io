---
title: "Kernel Visualization"
tags: [SPH]
---

The central insight of SPH is that discrete particles can collectively represent smooth fields if we assign each particle a smooth kernel of influence. So, in approximating the [Navier-Stokes equations](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations), we can compute quantities like velocity and pressure at finitely many positions, which then yield differentiable velocity and pressure functions, which can then be used to evolve the fluid.

![Kernel Visualization](images/kernel_viz.webm)
