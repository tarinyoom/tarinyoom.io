---
title: "Under Pressure"
date: 2025-08-23
tags: [SPH]
---

This is a continuation of my $N$-part series on getting this SPH renderer working. My goal here is to model some kind of liquid. To do that, I'll need to numerically solve the incompressible Navier-Stokes equations:

$$\mu \nabla^2 u - \nabla p + f_{ext} = \rho\frac{D u}{D t},$$

subject to

$$\nabla \cdot u = 0.$$

$u$, $p$, $f_{ext}$, and $\rho$ are all functions defined over time and space representing velocity, pressure, external force (gravity), and density, respectively. $\mu$ is a special viscosity constant. $\frac{D u}{D t}$ is the *material derivative* of the velocity of the fluid, which is just acceleration for our particle-based approach. The second equation is our incompressibility constraint, which requires that nowhere in our fluid do we expand or compress our material.

For the first equation, the important intuition is that if you squint, it really just looks like the more familiar $F = ma$ equation, where our "mass" in this case is replaced by "density", mass per unit volume. On our left-hand side, we have forces pushing on our fluid material, and on the right-hand side, we get the corresponding acceleration. In this simulation, we're going to calculate the forces on the left-hand side, and then use them to compute the acceleration of the fluid, which will then let us move our fluid particles.

To actually calculate our left-hand side forces and our densities, we'll lean heavily on the approach in J. Monaghan's 1988 paper, ["An Introduction to SPH"](https://www.sciencedirect.com/science/article/abs/pii/0010465588900264). The approach rests on this idea that you can approximate smooth functions (pressure, density, velocity) by storing these values only at discrete particles by smoothing them over with convolutional kernels. Once you have the smoothed functions, you can do the calculus you need to solve our Navier-Stokes equations.

The goal here is to define a set of points $X = \{x_1, \dots, x_n\} \subset \mathbb{R}^2$ and a function $f: X \rightarrow \mathbb{R}$, and try to generate a smoothed function $\hat f: X \rightarrow \mathbb{R}$ that generally represents $f$. We don't need $\hat f$ to exactly interpolate between our points, and instead we choose a smoothing kernel $W: \mathbb{R}^2 \rightarrow \mathbb{R}$ that takes in a displacement between two points and returns their relevance to each other. *If* $\hat f$ was everywhere defined, then we could define our smoothed function $f$ as:

$$f(x) = \int_{\mathbb{R}^2}\hat f(x') W(x - x') dx' = \int_{\mathbb{R}^2} \frac{\hat f(x')}{\rho(x')} W(x - x') \rho(x') dx'.$$

where the first equality is a kernel convolution, and the second is some simple arithmetic. But it's not defined everywhere (that's the point). So instead we *approximate our approximation* as:

$$f(x) \approx \sum_{i} \frac{\hat f(x_i)}{\rho(x_i)} W(x - x_i) m_i,$$

replacing $\rho(x') dx'$ with $m_i$, the mass of particle $i$. For example, to find a smooth approximation for density, we have:

$$\rho(x) \approx \sum_{i} \frac{\hat \rho(x_i)}{\hat \rho(x_i)} W(x - x_i) m_i = \sum_{i} W(x - x_i) m_i,$$

which we previously implemented:

![Density visualization](videos/somewhere_over_the_rainbow.webm)

Higher density regions are red, while lower density regions are blue.

Back to our original equation:

$$\mu \nabla^2 u - \nabla p + f_{ext} = \rho\frac{D u}{D t}.$$

The first term $\mu \nabla^2 u$ is a viscosity term, so I'm going to ignore that for now to get a faster proof of concept. The third term $f_{ext}$ is just gravity for now, which was simple enough to implement. But how about the second term, $-\nabla p$? Intuitively, this is telling us that the fluid will experience a force along our pressure gradient. Wherever our pressure decreases most sharply is where our fluid will locally be pushed to go. If we can compute our smooth pressure function with this SPH trick, then we can compute our pressure gradient and we're good to finally start moving our particles as a fluid.

For this initial implementation, we'll take a cheap approach to computing pressure using an equation of state. Under this approach, we use an equation that relates pressures and densities at each point. In particular, we'll use the [Tait equation](https://en.wikipedia.org/wiki/Tait_equation):

$$p = K\left[\left(\frac{\rho}{\rho_0}\right)^\gamma - 1\right],$$

where $K$ and $\gamma$ are just constants that need to be tuned (I'm using $\gamma = 7$ for now), and $\rho_0$ is the rest density of the fluid. This is a little hand-wavey, so we'll have to keep an eye on this. Just as in the previous video, we can create a pressure visualization under this equation of state:

![Pressure visualization](videos/just_tait.webm)

This looks fairly similar to our density visualization, but with a less smooth gradient. Values are more aggressively categorized into low- or high- pressure colors. With $\gamma = 7$ this tracks, since we're magnifying any discrepancies in density by exponentiating by 7. So we're going to introduce some sharp pressure gradients to push particles away from high density zones and into low density zones, which is what we need to do to get close to our incompressibility constraint $\nabla \cdot u = 0$.

What does our smoothed pressure function look like? We can compute this as a sum of convolutions:
$$p(x) = \sum_{i} \int_{\mathbb{R}^2} W(x - x_i) p_i dx,$$

that is, t


[live demo](https://sph.tarinyoom.io)
