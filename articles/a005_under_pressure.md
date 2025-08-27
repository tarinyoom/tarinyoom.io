---
title: "Under Pressure"
date: 2025-08-23
tags: [SPH]
---

This is a continuation of my $N$-part series on getting this SPH renderer working. My goal here is to model some kind of liquid. SPH is a technique that supposedly models water flow pretty well. So we'll see how well this works in the browser at interactive rates.

First, a little bit of math. We start with the incompressible Navier-Stokes equations:

$$\mu \nabla^2 u - \nabla p + f_{ext} = \rho\frac{D u}{D t},$$

subject to

$$\nabla \cdot u = 0.$$

$u$, $p$, $f_{ext}$, and $\rho$ are all functions defined over our spatial domain representing velocity, pressure, external force (gravity), and density, respectively. $\mu$ is a viscosity constant. $\frac{D u}{D t}$ is the *material derivative* of the velocity of the fluid, which is just acceleration for our particle-based approach. The second equation is our incompressibility constraint, which requires that nowhere in our fluid do we expand or compress our material.

The first equation may seem intimidating, but the key point is that it relates the forces on the left hand side of the equation to the acceleration on the right. So in that sense, it's a lot like the familiar $F = ma$ equation of Newtonian physics. The three forces the fluid experiences are a viscosity force (think friction), a pressure gradient force (where fluid is pushed from high to low pressure), and an external force (which is just gravity for now). If we can compute these forces and the fluid density, then we can compute the acceleration of the fluid and see it move.

As with many differential equations, it's hard to find an exact solution. So instead we need to choose some discrete approximation, which will be SPH. I'll lean heavily on the approach in J. Monaghan's 1988 paper, ["An Introduction to SPH"](https://www.sciencedirect.com/science/article/abs/pii/0010465588900264). The approach rests on this idea that you can approximate smooth functions (pressure, density, velocity) by storing these values only at discrete particles by smoothing them over with convolutional kernels. Once you have the smoothed functions, you can do the calculus you need to solve our Navier-Stokes equations.

So to compute densities, we have:

$$\rho(x) \approx \sum_{i} W(x - x_i) m_i,$$

and to compute our pressure gradient, we have:

$$\nabla p(x) \approx \rho(x) \sum_{i} \left(\frac{p(x)}{\rho(x)^2} + \frac{p(x_i)}{\rho(x_i)^2}\right) \nabla W(x - x_i) m_i.$$

which are consequences of this smoothing approach (smoothed with kernel $W$). Finally, we'll need to compute our pressure function, for which we can use an [equation of state](https://en.wikipedia.org/wiki/Tait_equation) (EoS). This is a cheap way of relating densities to pressures while still (mostly) respecting our divergence-free constraint $\nabla \cdot u = 0$. This EoS  will likely need to be refined later.

So our algorithm is:
1. From our particle positions, use kernel smoothing technique to compute our fluid density at each particle
2. From these density values, use our EoS to compute corresponding pressures
3. Use kernel smoothing again to compute our pressure gradient
4. Use our pressure gradient and density to accelerate our particle
5. Add accelerations from other effects (viscosity, external force)
6. Repeat!

So even though density, pressure, and acceleration are continuous functions over our spatial domain, we now have an algorithm that can approximately solve the Navier-Stokes equation by only computing values at discrete points.

Here are some visualizations. First, densities:
![Density visualization](videos/somewhere_over_the_rainbow.webm)
Higher density regions are red, while lower density regions are blue.

Here are pressures, computed using the EoS:
![Pressure visualization](videos/just_tait.webm)
It looks kind of similar to density but changes more sharply from low to high. So this is to say that our pressure force will be harsher than just "linear in our change in density", which will help us better enforce our zero-divergence condition.

Finally, here is most of the algorithm implemented. I've skipped viscosity for now.
![Fluid visualization](videos/its_alive.webm)

So we already get some fluid-like effects. We see our fluid flowing from the denser region in the lower left to the sparser region in the lower right. We also see some splashing, which is good.

It also seems to be gaining energy, which might be fixed by implementing viscosity. That seems like relatively low-hanging fruit.

This doesn't look that incompressible though, especially looking at the bottom left. The wave-like behavior in the lower left looks fluid-like, which is good, but is showing pressure waves, which we don't want in our incompressible fluid. In terms of our mathematical equations, we imposed our incompressibility as a zero-divergence constraint, and chose an EoS that could somewhat respect that constraint. But that EoS may need to be refined.

[live demo](https://sph.tarinyoom.io)
