---
title: "Kernel Visualization"
date: 2025-08-09
tags: [SPH]
---

The core idea of SPH is to use values stored at discrete particles to model the differentiable functions used in partial differential equations (PDEs). We do this by interpolating between our stored values using a convolutional kernel, so that our differentiable function looks something like a weighted average of all nearby particles.

For example, say we have a discrete set of points $P = \{p_1, \dots, p_n\} \subset \mathbb{R}^3$, and a pressure function defined over that set of points $\hat\rho: P \rightarrow \mathbb{R}$. We know what $\hat\rho(p_1)$ and $\hat\rho(p_2)$ are, but not $\hat\rho(q)$ for any $q \notin P$. Can we construct a differentiable pressure function $\rho$ defined over all of $\mathbb{R}^3$?

The answer is yes, which I'll be implement and explain over the course of this project. The first step will be to implement a [convolutional kernel](https://en.wikipedia.org/wiki/Convolution), which will be the core mechanism that smooths our discrete values into continuous functions. Below is a visualization of that kernel affixed to a single point. No fluid physics yet, just some colors representing the value of the kernel as the particle travels through space.

![Kernel Visualization](videos/single_kernel.webm)

So I've chosen $p_1$ to be my particle of interest, and for each other particle $p$ in the simulation, I evaluate the kernel at $p$'s distance from $p_1$. If $p$ is close to $p_1$ it'll be red (high kernel value), and as $p$ drifts farther away, it fades to blue. At some threshold of distance $p$ is just the same blue, no matter how much farther it gets. Nothing too profound here, just measuring distances, passing them through this kernel, and rendering colors accordingly.

But what if we affixed this kernel to every particle in the simulation, and summed their contributions? Instead of the color at $p$ being a measure of its distance from $p_1$, it now becomes a measure of its kernel-weighted proximity to all other particles. Where particles are dense, they tend to be more red, and where they are sparse, they tend to be more blue:

![Density Visualization](videos/full_density.webm)

This computation on our particles will be our density calculation, which will be required in the computation of other fluid properties. Computationally, this is still fairly straightforward: around 100 lines of simulation code. But even so, we've already been able to approximate a continuous function using only finitely many points. 

[live demo](https://sph.tarinyoom.io)
