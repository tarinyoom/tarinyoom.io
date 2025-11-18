import { useEffect, useRef } from 'react';
import vertexShaderCode from '../shaders/sph.vert.wgsl?raw';
import fragmentShaderCode from '../shaders/sph.frag.wgsl?raw';

export function SPHPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initWebGPU = async () => {
      if (!canvasRef.current) return;

      // Check if WebGPU is supported
      if (!navigator.gpu) {
        console.error('WebGPU is not supported in this browser');
        return;
      }

      const canvas = canvasRef.current;
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error('Failed to get GPU adapter');
        return;
      }

      const device = await adapter.requestDevice();
      const context = canvas.getContext('webgpu');
      if (!context) {
        console.error('Failed to get WebGPU context');
        return;
      }

      const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      });

      const vertexShaderModule = device.createShaderModule({
        code: vertexShaderCode,
      });

      const fragmentShaderModule = device.createShaderModule({
        code: fragmentShaderCode,
      });

      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: vertexShaderModule,
          entryPoint: 'main',
        },
        fragment: {
          module: fragmentShaderModule,
          entryPoint: 'main',
          targets: [
            {
              format: presentationFormat,
            },
          ],
        },
        primitive: {
          topology: 'triangle-list',
        },
      });

      // Render function
      const render = () => {
        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

        const renderPassDescriptor: GPURenderPassDescriptor = {
          colorAttachments: [
            {
              view: textureView,
              clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        // 6 vertices per quad, 100 instances (10x10 grid)
        passEncoder.draw(6, 100, 0, 0);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);
      };

      render();
    };

    initWebGPU().catch(console.error);
  }, []);

  return (
    <div className="flex-1">
      <div className="mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-8 border-b border-border pb-8">
          <h1 className="mb-2 text-4xl text-foreground md:text-5xl">
            SPH
          </h1>
        </header>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
        />
      </div>
    </div>
  );
}
