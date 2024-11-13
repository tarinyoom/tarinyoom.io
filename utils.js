export function sayHello(ctx) {
    if (ctx) {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Hello from TypeScript!', 60, 30);
    }
}
