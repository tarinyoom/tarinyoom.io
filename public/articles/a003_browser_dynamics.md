---
title: "Browser Dynamics"
tags: [SPH]
---

This is my first post on implementing fluid dynamics in the browser. The goal is to implement a real-time fluid solver in my browser. Previously, I'd implemented an <a href="https://ode.tarinyoom.io/">online ODE integrator</a> for comparing explicit Euler, implicit Euler, and RK4 integration methods for a particle in a gravity field. I don't plan on working on that project further, but it did provide me with some context for what I like and what I don't like.

What I liked:
1. Physical simulation in the browser. It just seems like an interesting medium. I've seen a fair number of physics solvers that follow a common paradigm: run a monstrous executable built on the tears of a few generations of Ph.D. students, and then make sense of the result. But with modern improvements to JavaScript engines, I don't see why we can't model simple physical phenomena in a more interactive way.
2. A focus on using this kind of app as a learning tool. At some level, I don't think the math underpinning these phenomena is that hard... *once you get it*. But to get it, you have to have the right picture in your head of what's going on. A real-time browser app is just a modern way of getting that image in your head.

What I want to do differently:
1. I want to solve a PDE instead of an ODE. This is less of a philosophical change and more just seeking a challenge. It's also the type of differential equation that's closer to the world of AI. So that's interesting.
2. I added way too many "things" last time. I got involved with backending some of the numerical computation with a Lambda, as well as procedurally generated sound, and some other unneeded frills. So this time, narrowly scoping the project is a priority.
3. I want this to be real-time. Again with the challenge part, this just seems like a tricky problem: how can you get this little browser to simulate the right thing with its tight computational budget? Some potential tasking will involve benchmarking, cross-browser validation, and perhaps a foray into WASM, à la Rust.

So far, I've implemented a simple particles-in-a-box example, using a library called <a href="https://threejs.org/">three.js</a>. This is a lightweight library that sits atop WebGL, providing the structure of a scene and basic rendering.

So far I've added gravity and some simple elastic collisions against invisible walls:

<video src="images/particles_in_a_box.webm" autoplay loop muted playsinline></video>

So at this point it doesn't really look like a fluid, as much as a lot of tiny bouncing balls. The goal will be to implement <a href="https://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics">smoothed-particle hydrodynamics</a> (SPH), a technique for approximating the continuous properties of a fluid with discrete particles by interpolating between them via smooth kernel functions. Or so the lore goes.
