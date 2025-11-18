@fragment
fn main(@location(0) localPos : vec2f) -> @location(0) vec4f {
  let r = length(localPos); // distance from quad center in [-1,1]^2
  if (r > 1.0) {
    discard; // outside unit circle -> transparent
  }

  return vec4f(0.2, 0.7, 1.0, 1.0); // color of the circle
}
