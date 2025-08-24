---
title: "Under Pressure"
date: 2025-08-23
tags: [SPH]
---

This is a continuation of my $N$-part series on getting this SPH renderer working. My goal here is to model some kind of liquid. To do that, I'll need to numerically solve the incompressible Navier-Stokes equations:

$$\mu \nabla^2 u - \nabla p + f_{ext} = \rho\frac{D u}{D t},$$
$$\nabla \cdot u = 0.$$

$u$, $p$, $f_{ext}$, and $\rho$ are all functions defined over time and space representing velocity, pressure, external force (gravity), and density, respectively. $\mu$ is a special viscosity constant. $\frac{D u}{D t}$ is the *material derivative* of the velocity of the fluid, which will be the same as acceleration for our particle-based approach. The second equation is our incompressibility constraint, which is in calculus-ey terms requiring that nowhere in our fluid do we expand or compress our material.

For the first equation, the important intuition is that if you squint, it really just looks like the more familiar $F = ma$ equation, where our "mass" in this case is replaced by "density", mass per unit volume. On our left-hand side, we have forces pushing on our fluid material, and on the right-hand side, we get the corresponding acceleration. So in this simulation, we're going to calculate the forces on the left-hand side, and then use them to compute the acceleration of the fluid, which will then let us move our fluid particles.

To actually calculate our left-hand side forces and our densities, we'll lean heavily on the approach in J. Monaghan's 1988 paper, ["An Introduction to SPH"](https://www.sciencedirect.com/science/article/abs/pii/0010465588900264). The approach rests on this idea that you can approximate smooth functions (pressure, density, velocity) by storing these values only at discrete particles by smoothing them over with convolutional kernels. Once you have the smoothed functions, you can do the calculus you need to solve our Navier-Stokes equations.

Previously, I'd shown a method of computing the density of the fluid for each point in the computation:

![Density visualization](videos/somewhere_over_the_rainbow.webm)

The idea here is that we define a set of points $X = \{x_1, \dots, x_n\} \subset \mathbb{R}^2$, and a kernel $W: \mathbb{R}^2 \rightarrow \mathbb{R}$ that takes in a displacement between two points and returns their relative contribution. $W$ is smooth, normalized, symmetric, large when its input has small magnitude and small when its input has large magnitude. Then, for each of our points $x \in X$, we can approximate the density $\rho_i$ at $x_i$ as:

$$\rho_{i} = \frac{m_{tot}}{n}\sum_{j} W(x_i - x_j),$$

where $m_{tot}$ is the total mass of the fluid. For $x_j$ close to $x_i$, $x_i - x_j$ will have small magnitude, so $W$ will be large and $x_j$ will add significantly to the density at $x_i$. And for $x_j$ that are far away, $W$ will be zero, so there won't be any density contribution. In the above video, you can see that this results in more densely spaced points being assigned a higher-value color (redder) on the heat map. Where particles are evenly-spaced, the density function is mostly uniform.

Back to our original equation:

$$\mu \nabla^2 u - \nabla p + f_{ext} = \rho\frac{D u}{D t}.$$

The first term $\mu \nabla^2 u$ is a viscosity term, so I'm going to ignore that for now to get a faster proof of concept. The third term $f_{ext}$ is just gravity for now, which was simple enough to implement. But how about the second term, $-\nabla p$? Intuitively, this is telling us that the fluid will experience a force along our pressure gradient. Wherever our pressure decreases most sharply is where our fluid will locally be pushed to go. If we can compute our smooth pressure function with this SPH trick, then we can compute our pressure gradient and we're good to finally start moving our particles as a fluid.

This will be the handwaviest thing so far, but we're going to compute each particle's pressure directly from its density using the [Tait equation](https://en.wikipedia.org/wiki/Tait_equation):

$$p = K\left[\left(\frac{\rho}{\rho_0}\right)^\gamma - 1\right],$$

where $K$ and $\gamma$ are just constants that need to be tuned (I'm using $\gamma = 7$ for now), and $\rho_0$ is the rest density of the fluid. Admittedly, this choice is partly because *the robot* told me so. We'll have to keep an eye on this band-aid and check back in to see if we can improve it later. Just as in the previous video, we can create a pressure visualization under this Tait equation:

![Pressure visualization](videos/just_tait.webm)

This looks fairly similar to our density visualization, but with a less smooth gradient. Values are more aggressively categorized into low- or high- pressure colors. With $\gamma = 7$ this tracks, since we're magnifying any discrepancies in density by exponentiating by 7. So we're going to introduce some sharp pressure gradients to push particles away from high density zones and into low density zones, which is what we need to do to get close to our incompressibility constraint $\nabla \cdot u = 0$.

What does our smoothed pressure function look like? We can compute this as a sum of convolutions:
$$p(x) = \int_{\mathbb{R}^2} W(x - x_i) p_i dx.$$


[live demo](https://sph.tarinyoom.io)
