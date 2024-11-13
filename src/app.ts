import { sayHello } from './utils';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
sayHello(ctx);

// canvas drawing
if (ctx) {
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(50, 50, 200, 100);
}

