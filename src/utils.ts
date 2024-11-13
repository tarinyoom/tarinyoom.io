export function sayHello(ctx: CanvasRenderingContext2D | null) {
  if (ctx) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Hello from TypeScript!', 60, 30);
  }
}

