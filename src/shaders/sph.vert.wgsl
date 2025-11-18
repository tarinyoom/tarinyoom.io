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
