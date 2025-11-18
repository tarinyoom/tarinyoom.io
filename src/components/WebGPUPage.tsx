import { useEffect, useRef } from 'react';

export function WebGPUPage() {
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
      });

      // Vertex shader
      const vertexShaderCode = `
        @vertex
        fn main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
          var pos = array<vec2f, 3>(
            vec2f(0.0, 0.5),
            vec2f(-0.5, -0.5),
            vec2f(0.5, -0.5)
          );
          return vec4f(pos[vertexIndex], 0.0, 1.0);
        }
      `;

      // Fragment shader
      const fragmentShaderCode = `
        @fragment
        fn main() -> @location(0) vec4f {
          return vec4f(1.0, 0.5, 0.2, 1.0);
        }
      `;

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
              clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.draw(3, 1, 0, 0);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);
      };

      render();
    };

    initWebGPU().catch(console.error);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">WebGPU Triangle</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-gray-300"
      />
    </div>
  );
}
