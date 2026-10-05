// Particle targets for the canvas sculptures: xyz triplets, roughly within a unit sphere.
export type Shape = Float32Array

const rand = (a: number, b: number) => a + Math.random() * (b - a)

export function sphere(n: number): Shape {
  const out = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    const x = Math.cos(t) * r
    const z = Math.sin(t) * r
    // low-frequency displacement turns the ball into an organic "latent" blob;
    // a share of particles sit inside the shell to give it volume
    const bump = 1 + 0.16 * Math.sin(x * 3.2 + y * 1.7) * Math.cos(z * 2.6 - y * 1.1) + 0.06 * Math.sin(y * 7 + x * 4)
    const shell = Math.random() < 0.78 ? 1 + rand(-0.02, 0.02) : Math.cbrt(Math.random()) * 0.9
    const m = bump * shell
    out[i * 3] = x * m
    out[i * 3 + 1] = y * m
    out[i * 3 + 2] = z * m
  }
  return out
}

export function neuralNet(n: number): Shape {
  const layers = [4, 6, 6, 3]
  const nodes: [number, number, number][] = []
  const byLayer: [number, number, number][][] = []
  layers.forEach((count, li) => {
    const x = -1.05 + (li / (layers.length - 1)) * 2.1
    const row: [number, number, number][] = []
    for (let k = 0; k < count; k++) {
      const y = (k - (count - 1) / 2) * 0.34
      const node: [number, number, number] = [x, y, (li % 2 ? 0.12 : -0.12)]
      row.push(node)
      nodes.push(node)
    }
    byLayer.push(row)
  })
  const edges: [[number, number, number], [number, number, number]][] = []
  for (let li = 0; li < byLayer.length - 1; li++)
    for (const a of byLayer[li]) for (const b of byLayer[li + 1]) edges.push([a, b])

  const out = new Float32Array(n * 3)
  const nodeShare = Math.floor(n * 0.45)
  for (let i = 0; i < n; i++) {
    if (i < nodeShare) {
      const [cx, cy, cz] = nodes[i % nodes.length]
      const u = rand(0, Math.PI * 2)
      const v = Math.acos(rand(-1, 1))
      const r = 0.075 * Math.cbrt(Math.random())
      out[i * 3] = cx + r * Math.sin(v) * Math.cos(u)
      out[i * 3 + 1] = cy + r * Math.sin(v) * Math.sin(u)
      out[i * 3 + 2] = cz + r * Math.cos(v)
    } else {
      const [a, b] = edges[i % edges.length]
      const t = Math.random()
      out[i * 3] = a[0] + (b[0] - a[0]) * t
      out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t
      out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t
    }
  }
  return out
}

export function lossLandscape(n: number): Shape {
  const out = new Float32Array(n * 3)
  const side = Math.ceil(Math.sqrt(n))
  for (let i = 0; i < n; i++) {
    const gx = (i % side) / (side - 1)
    const gz = Math.floor(i / side) / (side - 1)
    const x = (gx - 0.5) * 2.2
    const z = (gz - 0.5) * 2.2
    // a couple of basins and a ridge — reads as an optimisation surface
    const y =
      -0.55 * Math.exp(-((x + 0.35) ** 2 + (z - 0.2) ** 2) * 2.4) -
      0.35 * Math.exp(-((x - 0.55) ** 2 + (z + 0.45) ** 2) * 3.5) +
      0.12 * Math.sin(x * 3.1) * Math.cos(z * 2.7)
    out[i * 3] = x
    out[i * 3 + 1] = y * 1.1 + 0.2
    out[i * 3 + 2] = z
  }
  return out
}

export function torusKnot(n: number): Shape {
  const out = new Float32Array(n * 3)
  const p = 2
  const q = 3
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const r = 0.62 + 0.28 * Math.cos(q * t)
    const cx = r * Math.cos(p * t)
    const cy = r * Math.sin(p * t)
    const cz = 0.28 * Math.sin(q * t)
    const a = rand(0, Math.PI * 2)
    const tube = 0.09 * Math.sqrt(Math.random())
    out[i * 3] = cx + Math.cos(a) * tube
    out[i * 3 + 1] = cy + Math.sin(a) * tube
    out[i * 3 + 2] = cz + Math.cos(a + 1.3) * tube
  }
  return out
}
