import { useEffect, useRef } from 'react';

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

      // Vertex shader
      const vertexShaderCode = `
        struct VSOut {
          @builtin(position) position : vec4f,
          @location(0) localPos : vec2f,
        };

        @vertex
        fn main(
          @builtin(vertex_index) vertexIndex : u32,
          @builtin(instance_index) instanceIndex : u32,
        ) -> VSOut {
          // 2 triangles forming a quad in local space [-1, 1] x [-1, 1]
          var quad = array<vec2f, 6>(
            vec2f(-1.0, -1.0),
            vec2f( 1.0, -1.0),
            vec2f(-1.0,  1.0),
            vec2f(-1.0,  1.0),
            vec2f( 1.0, -1.0),
            vec2f( 1.0,  1.0),
          );

          // Grid config
          let gridSize : u32 = 10u;      // 10 x 10
          let gx = f32(instanceIndex % gridSize);
          let gy = f32(instanceIndex / gridSize);

          // Size of each cell in NDC (approx)
          let cellSize = 2.0 / f32(gridSize);
          let radius   = cellSize * 0.4; // circle radius (fraction of cell)

          // Compute center of this instance in NDC
          let center = vec2f(
            -1.0 + cellSize * (gx + 0.5),
            -1.0 + cellSize * (gy + 0.5)
          );

          let local = quad[vertexIndex] * radius; // offset from center
          var out : VSOut;
          out.localPos = quad[vertexIndex];      // in [-1, 1]^2 for circle test
          out.position = vec4f(center + local, 0.0, 1.0);
          return out;
        }
      `;

      // Fragment shader
      const fragmentShaderCode = `
        @fragment
        fn main(@location(0) localPos : vec2f) -> @location(0) vec4f {
          let r = length(localPos); // distance from quad center in [-1,1]^2
          if (r > 1.0) {
            discard; // outside unit circle -> transparent
          }

          return vec4f(0.2, 0.7, 1.0, 1.0); // color of the circle
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
