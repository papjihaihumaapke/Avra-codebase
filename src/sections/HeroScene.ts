/**
 * Hero background: an abstract white room with a floating cantilevered staircase,
 * lit by one low directional "sun" through an off-screen window so long diagonal
 * shadows fall across the wall. The camera drifts slowly upward.
 * Loaded lazily (dynamic import) so it never blocks first paint.
 */
import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'

const PAPER = '#f2f1ee'
const BONE = '#fafaf8'
const GRAPHITE = '#111111'

export function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function mountHeroScene(
  container: HTMLElement,
  opts: { reduced: boolean; onReady?: () => void },
): () => void {
  const renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  // Light and geometry are static: compute the shadow map once, not every frame.
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true
  renderer.domElement.setAttribute('aria-hidden', 'true')
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  container.appendChild(renderer.domElement)

  const scene = new Scene()
  scene.background = new Color(PAPER)

  const camera = new PerspectiveCamera(30, 1, 0.1, 100)

  // ---- Room: wall + floor are pure "shadow catchers" over the Paper background,
  // so lit areas are exactly Paper and shadows are a soft Graphite tint.
  const shadowMat = new ShadowMaterial({ color: new Color(GRAPHITE), opacity: 0.13 })
  const wall = new Mesh(new PlaneGeometry(80, 40), shadowMat)
  wall.position.set(0, 10, -3)
  wall.receiveShadow = true
  scene.add(wall)

  const floor = new Mesh(new PlaneGeometry(80, 40), shadowMat)
  floor.rotation.x = -Math.PI / 2
  floor.position.set(0, 0, 10)
  floor.receiveShadow = true
  scene.add(floor)

  // ---- Floating staircase cantilevered from the wall, rising to the right.
  const stepMat = new MeshLambertMaterial({ color: new Color(BONE) })
  const stairs = new Group()
  const STEPS = 11
  const stepGeo = new BoxGeometry(1.25, 0.12, 1.0)
  for (let i = 0; i < STEPS; i++) {
    const s = new Mesh(stepGeo, stepMat)
    s.position.set(i * 0.62, 0.55 + i * 0.44, -3 + 0.5)
    s.castShadow = true
    s.receiveShadow = true
    stairs.add(s)
  }
  // A thin landing slab at the top.
  const landing = new Mesh(new BoxGeometry(3.2, 0.12, 1.0), stepMat)
  landing.position.set(STEPS * 0.62 + 1.0, 0.55 + STEPS * 0.44, -2.5)
  landing.castShadow = true
  landing.receiveShadow = true
  stairs.add(landing)
  scene.add(stairs)

  // A single freestanding column for architectural scale.
  const column = new Mesh(new BoxGeometry(0.7, 14, 0.7), stepMat)
  column.position.set(10.4, 7, -1.6)
  column.castShadow = true
  column.receiveShadow = true
  scene.add(column)

  // ---- Off-screen window frame: mullions cast long diagonal bands of shadow.
  const frameMat = new MeshLambertMaterial({ color: new Color(BONE) })
  const windowFrame = new Group()
  for (let i = 0; i < 4; i++) {
    const m = new Mesh(new BoxGeometry(0.35, 14, 0.35), frameMat)
    m.position.set(i * 2.1, 0, 0)
    m.castShadow = true
    windowFrame.add(m)
  }
  const transom = new Mesh(new BoxGeometry(7.5, 0.3, 0.35), frameMat)
  transom.position.set(3.15, 1.2, 0)
  transom.castShadow = true
  windowFrame.add(transom)
  windowFrame.position.set(-17, 8, 6)
  scene.add(windowFrame)

  // ---- Light
  scene.add(new HemisphereLight(0xffffff, 0xe9e7e2, 2.6))
  const sun = new DirectionalLight(0xfff6ea, 1.9)
  sun.position.set(-22, 13, 11)
  sun.target.position.set(2, 2, -3)
  sun.castShadow = true
  sun.shadow.mapSize.set(1536, 1536)
  sun.shadow.camera.left = -18
  sun.shadow.camera.right = 18
  sun.shadow.camera.top = 16
  sun.shadow.camera.bottom = -16
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 70
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.03
  sun.shadow.radius = 6
  scene.add(sun, sun.target)

  // ---- Framing: stairs sit to the right on wide screens, upper area on tall ones.
  const base = { pos: new Vector3(), look: new Vector3() }
  const frame = (w: number, h: number) => {
    const aspect = w / h
    camera.aspect = aspect
    if (aspect >= 1.15) {
      // Stairs occupy the right half; the left stays calm for the headline.
      camera.fov = 30
      base.pos.set(-2.6, 3.0, 15)
      base.look.set(-0.6, 3.6, -3)
    } else if (aspect >= 0.8) {
      camera.fov = 36
      base.pos.set(0.6, 4.2, 15)
      base.look.set(1.8, 4.8, -3)
    } else {
      // Tall screens: stairs float in the upper area, text sits below.
      camera.fov = 44
      base.pos.set(3.5, 6.5, 16)
      base.look.set(3.4, 1.2, -3)
    }
    camera.updateProjectionMatrix()
  }

  const resize = () => {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    frame(w, h)
  }
  resize()

  const look = new Vector3()
  const place = (t: number) => {
    // Slow upward drift (eased ping-pong, ~80s cycle) with a whisper of lateral sway.
    const rise = (1 - Math.cos(t * 0.078)) / 2
    camera.position.set(base.pos.x + Math.sin(t * 0.05) * 0.25, base.pos.y + rise * 2.2, base.pos.z)
    look.set(base.look.x, base.look.y + rise * 1.6, base.look.z)
    camera.lookAt(look)
  }

  let raf = 0
  let running = false
  let visible = true
  let t0 = performance.now()
  let elapsed = 0

  const render = () => renderer.render(scene, camera)

  const tick = (now: number) => {
    elapsed += (now - t0) / 1000
    t0 = now
    place(elapsed)
    render()
    raf = requestAnimationFrame(tick)
  }
  const start = () => {
    if (running || opts.reduced || !visible || document.hidden) return
    running = true
    t0 = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  place(opts.reduced ? 0 : 6)
  render()
  opts.onReady?.()
  start()

  const ro = new ResizeObserver(() => {
    resize()
    place(elapsed)
    render()
  })
  ro.observe(container)

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) start()
    else stop()
  })
  io.observe(container)

  const onVis = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVis)

  return () => {
    stop()
    ro.disconnect()
    io.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    scene.traverse((o) => {
      if (o instanceof Mesh) {
        o.geometry.dispose()
        const m = o.material
        if (Array.isArray(m)) m.forEach((x) => x.dispose())
        else m.dispose()
      }
    })
    renderer.dispose()
    renderer.domElement.remove()
  }
}
