export const hologramVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const hologramFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    // Scanlines
    float scanline = sin(vUv.y * 150.0 - uTime * 3.0) * 0.05 + 0.95;

    // Flicker
    float flicker = sin(uTime * 8.73) * 0.02 + sin(uTime * 11.31) * 0.02 + 0.96;

    // Edge fresnel
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
    fresnel = pow(fresnel, 2.0);

    // Horizontal glitch lines
    float glitchLine = step(0.98, sin(vUv.y * 50.0 + uTime * 0.5) * 0.5 + 0.5);
    float glitchStrength = step(0.997, fract(uTime * 0.3)) * 0.1;

    vec3 color = uColor * scanline * flicker;
    color += uColor * fresnel * 0.5;
    color += uColor * glitchLine * glitchStrength;

    float alpha = (0.7 + fresnel * 0.3) * scanline * uOpacity;

    gl_FragColor = vec4(color, alpha);
  }
`

export const gridVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const gridFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;

  varying vec2 vUv;

  float grid(vec2 uv, float divisions, float lineWidth) {
    vec2 gridUv = fract(uv * divisions);
    vec2 gridLines = step(1.0 - lineWidth, gridUv);
    return max(gridLines.x, gridLines.y);
  }

  void main() {
    // Moving grid (perspective scroll effect)
    vec2 movingUv = vec2(vUv.x, fract(vUv.y + uTime * 0.1));

    float mainGrid = grid(movingUv, 10.0, 0.025);
    float subGrid = grid(movingUv, 50.0, 0.015) * 0.3;
    float finalGrid = mainGrid + subGrid;

    // Perspective fade
    float fade = pow(1.0 - vUv.y, 2.5) * 0.8 + 0.2;

    // Pulse effect
    float pulse = sin(uTime * 2.0) * 0.1 + 0.9;

    // Center line glow
    float centerDist = abs(vUv.x - 0.5);
    float centerGlow = (1.0 - smoothstep(0.0, 0.5, centerDist)) * 0.3;

    vec3 color = uColor * (finalGrid + centerGlow) * fade * pulse;
    float alpha = (finalGrid + centerGlow * 0.5) * fade * 0.9;

    gl_FragColor = vec4(color, alpha);
  }
`

export const particleVertexShader = `
  attribute float aSize;
  attribute float aAlpha;

  varying float vAlpha;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vAlpha = aAlpha;

    vec3 pos = position;
    // Slow drift
    pos.y += sin(uTime * 0.5 + position.x * 0.3) * 0.1;
    pos.x += cos(uTime * 0.3 + position.z * 0.2) * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

export const particleFragmentShader = `
  varying float vAlpha;

  uniform vec3 uColor;

  void main() {
    // Circular point
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    // Soft glow falloff
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 3.0);

    gl_FragColor = vec4(uColor, strength * vAlpha);
  }
`

export const glowVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const glowFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    float glow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    vec3 color = uColor * (glow * uIntensity + 0.2);
    gl_FragColor = vec4(color, glow * 0.8);
  }
`

export const tunnelVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const tunnelFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;

  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Flowing lines along tunnel
    float lines = sin(vUv.x * 20.0) * 0.5 + 0.5;
    lines = step(0.95, lines);

    // Moving energy flow
    float flow = sin(vUv.y * 10.0 - uTime * 2.0) * 0.5 + 0.5;
    flow = pow(flow, 3.0);

    // Pulse
    float pulse = sin(uTime * 3.0) * 0.1 + 0.9;

    vec3 color = uColor * (lines * 0.7 + flow * 0.3) * pulse;
    float alpha = (lines * 0.8 + flow * 0.2) * 0.6;

    gl_FragColor = vec4(color, alpha);
  }
`
