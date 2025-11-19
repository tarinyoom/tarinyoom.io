import { useEffect, useRef } from 'react';
import { initSPHRenderer } from '../sph/renderer';

export function SPHPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderer: Awaited<ReturnType<typeof initSPHRenderer>> | null = null;

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

      const context = canvas.getContext('webgpu');
      if (!context) {
        console.error('Failed to get WebGPU context');
        return;
      }

      // Get preferred format from browser API
      const preferredFormat = navigator.gpu.getPreferredCanvasFormat();

      // Initialize the SPH renderer with the required WebGPU objects
      renderer = await initSPHRenderer({ adapter, context, preferredFormat });
    };

    initWebGPU().catch(console.error);

    // Cleanup on unmount
    return () => {
      renderer?.destroy();
    };
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
