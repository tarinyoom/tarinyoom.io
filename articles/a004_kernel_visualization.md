---
title: "Kernel Visualization"
date: 2025-08-08
tags: [SPH]
---

$\mathbb{R}$

The central insight of SPH is that discrete particles can collectively represent smooth fields if we assign each particle a smooth kernel of influence. So, in approximating the [Navier-Stokes equations](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations), we can compute quantities like velocity and pressure at finitely many positions, which then yield differentiable velocity and pressure functions, which can then be used to evolve the fluid.

![Particles in a box](videos/particles_in_a_box.webm)
