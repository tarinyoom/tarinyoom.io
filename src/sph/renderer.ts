import vertexShaderCode from './shaders/sph.vert.wgsl?raw';
import fragmentShaderCode from './shaders/sph.frag.wgsl?raw';

export interface SPHRendererConfig {
  canvas: HTMLCanvasElement;
  adapter: GPUAdapter;
  context: GPUCanvasContext;
}

export async function initSPHRenderer(config: SPHRendererConfig): Promise<void> {
  const { canvas, adapter, context } = config;

  const device = await adapter.requestDevice();

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
}
