import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

/**
 * ThreeHeroScene - Interactive 3D Ecosystem Canvas for 23E NeeDS
 * Visualizes the Village-to-Town network with connected nodes, rotating orbital paths,
 * floating glowing tokens, particle atmosphere, and interactive mouse/touch controls.
 */
export default function ThreeHeroScene({ activeStage = 'all', onSelectModule }) {
  const mountRef = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [webGLSupported] = useState(checkWebGLSupport)
  const hoveredNodeRef = useRef(null)

  useEffect(() => {
    if (!webGLSupported) return
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 500
    const height = container.clientHeight || 480

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    // Soft atmospheric fog matching brand palette
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.04)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 24)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xf59e0b, 2.5, 50)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x10b981, 2.5, 50)
    pointLight2.position.set(-10, -8, 10)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0x0284c7, 2.0, 50)
    pointLight3.position.set(0, 12, -8)
    scene.add(pointLight3)

    // 4. Central Hub Group
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // Central Sphere (The 23E NeeDS Hub)
    const coreGeo = new THREE.IcosahedronGeometry(2.6, 2)
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x102747,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    rootGroup.add(coreMesh)

    // Inner glowing core
    const innerGeo = new THREE.SphereGeometry(1.6, 32, 32)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xf5a623,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.8,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    rootGroup.add(innerMesh)

    // Orbit Ring 1 (Village Orbit)
    const ring1Geo = new THREE.TorusGeometry(6.2, 0.04, 16, 100)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3
    ring1.rotation.y = Math.PI / 6
    rootGroup.add(ring1)

    // Orbit Ring 2 (Town Orbit)
    const ring2Geo = new THREE.TorusGeometry(9.4, 0.05, 16, 120)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.4,
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = -Math.PI / 4
    ring2.rotation.y = -Math.PI / 5
    rootGroup.add(ring2)

    // Orbit Ring 3 (Equatorial pulse ring)
    const ring3Geo = new THREE.RingGeometry(4.2, 4.3, 64)
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xf5a623,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.x = Math.PI / 2
    rootGroup.add(ring3)

    // 5. Create 3D Nodes for Village (Stage 1) and Town (Stage 2)
    const nodes = []
    const raycastTargets = []

    const stage1NodesData = [
      { id: '01', title: 'Local Supply & Demand', stage: 'stage1', color: 0x10b981, size: 0.85, dist: 6.0, angle: 0 },
      { id: '02', title: 'Subscription Plans', stage: 'stage1', color: 0xf59e0b, size: 0.85, dist: 6.2, angle: Math.PI * 0.5 },
      { id: '03', title: 'Agricultural Inputs', stage: 'stage1', color: 0x16a34a, size: 0.85, dist: 6.1, angle: Math.PI },
      { id: '04', title: 'Local Services', stage: 'stage1', color: 0x059669, size: 0.85, dist: 6.3, angle: Math.PI * 1.5 },
    ]

    const stage2NodesData = [
      { id: '05', title: 'Food & Delivery', stage: 'stage2', color: 0xea580c, size: 0.95, dist: 9.3, angle: Math.PI * 0.2 },
      { id: '06', title: 'Doctor & Healthcare', stage: 'stage2', color: 0x0284c7, size: 0.95, dist: 9.5, angle: Math.PI * 0.6 },
      { id: '07', title: 'Auto & Transport', stage: 'stage2', color: 0x7c3aed, size: 0.95, dist: 9.2, angle: Math.PI * 1.0 },
      { id: '08', title: 'NeeDS Learn Nearby', stage: 'stage2', color: 0x2563eb, size: 0.95, dist: 9.4, angle: Math.PI * 1.4 },
      { id: '09', title: 'Local Shopping & Electronics', stage: 'stage2', color: 0x0d9488, size: 0.95, dist: 9.6, angle: Math.PI * 1.8 },
    ]

    // Connection Lines Geometry
    const linePositions = []
    const lineColors = []

    function createNode(info, isTown = false) {
      const nodeGroup = new THREE.Group()
      const geo = isTown
        ? new THREE.BoxGeometry(info.size, info.size, info.size)
        : new THREE.DodecahedronGeometry(info.size, 1)

      const mat = new THREE.MeshStandardMaterial({
        color: info.color,
        roughness: 0.2,
        metalness: 0.6,
        emissive: info.color,
        emissiveIntensity: 0.45,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.userData = info
      nodeGroup.add(mesh)

      // Outer glowing wire cage
      const cageGeo = new THREE.IcosahedronGeometry(info.size * 1.35, 1)
      const cageMat = new THREE.MeshBasicMaterial({
        color: info.color,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
      const cageMesh = new THREE.Mesh(cageGeo, cageMat)
      nodeGroup.add(cageMesh)

      // Position
      const yOffset = isTown ? Math.sin(info.angle * 2) * 2.2 : Math.cos(info.angle * 2) * 1.6
      const x = Math.cos(info.angle) * info.dist
      const z = Math.sin(info.angle) * info.dist
      nodeGroup.position.set(x, yOffset, z)

      rootGroup.add(nodeGroup)
      nodes.push({ group: nodeGroup, mesh, cage: cageMesh, data: info, basePos: new THREE.Vector3(x, yOffset, z) })
      raycastTargets.push(mesh)

      // Hub connection line coordinates
      linePositions.push(0, 0, 0)
      linePositions.push(x, yOffset, z)

      const c = new THREE.Color(info.color)
      lineColors.push(c.r, c.g, c.b)
      lineColors.push(c.r, c.g, c.b)
    }

    stage1NodesData.forEach((n) => createNode(n, false))
    stage2NodesData.forEach((n) => createNode(n, true))

    // Build Interconnecting network lines
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3))
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    })
    const connectionLines = new THREE.LineSegments(lineGeo, lineMat)
    rootGroup.add(connectionLines)

    // 6. Floating Ambient Particles (Constellation effect)
    const particleCount = 450
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      particlePositions[i * 3 + 2] = radius * Math.cos(phi)

      const isGreen = Math.random() > 0.5
      particleColors[i * 3] = isGreen ? 0.06 : 0.96
      particleColors[i * 3 + 1] = isGreen ? 0.72 : 0.65
      particleColors[i * 3 + 2] = isGreen ? 0.5 : 0.14
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    rootGroup.add(particleSystem)

    // 7. Mouse & Touch Interaction
    const mouse = new THREE.Vector2(-999, -999)
    const targetRotation = { x: 0.2, y: 0.3 }
    const currentRotation = { x: 0.2, y: 0.3 }
    let isDragging = false
    let prevMousePos = { x: 0, y: 0 }

    const raycaster = new THREE.Raycaster()

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.x = x
      mouse.y = y

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x
        const deltaY = e.clientY - prevMousePos.y
        targetRotation.y += deltaX * 0.008
        targetRotation.x += deltaY * 0.008
        prevMousePos = { x: e.clientX, y: e.clientY }
      } else {
        targetRotation.y = x * 0.4
        targetRotation.x = -y * 0.3 + 0.15
      }

      // Raycast for hover
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(raycastTargets)

      if (intersects.length > 0) {
        const hit = intersects[0].object.userData
        hoveredNodeRef.current = hit
        setHoveredNode(hit)
        container.style.cursor = 'pointer'
      } else {
        hoveredNodeRef.current = null
        setHoveredNode(null)
        container.style.cursor = isDragging ? 'grabbing' : 'grab'
      }
    }

    const onPointerDown = (e) => {
      isDragging = true
      prevMousePos = { x: e.clientX, y: e.clientY }
      container.style.cursor = 'grabbing'
    }

    const onPointerUp = () => {
      isDragging = false
      container.style.cursor = hoveredNodeRef.current ? 'pointer' : 'grab'
    }

    const onClick = () => {
      if (hoveredNodeRef.current && onSelectModule) {
        onSelectModule(hoveredNodeRef.current.id)
      }
    }

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    container.addEventListener('click', onClick)

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // 9. Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Smooth camera/root damping
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05

      rootGroup.rotation.x = currentRotation.x
      rootGroup.rotation.y = currentRotation.y + elapsedTime * 0.06

      // Rotate inner hub elements
      coreMesh.rotation.y = -elapsedTime * 0.15
      coreMesh.rotation.x = elapsedTime * 0.08
      innerMesh.rotation.y = elapsedTime * 0.2

      ring1.rotation.z = elapsedTime * 0.12
      ring2.rotation.z = -elapsedTime * 0.09
      ring3.rotation.z = elapsedTime * 0.05

      // Animate Nodes & Stage Filtering
      nodes.forEach((nodeItem, idx) => {
        const { group, mesh, cage, data, basePos } = nodeItem

        // Floating hover motion
        group.position.y = basePos.y + Math.sin(elapsedTime * 2 + idx) * 0.25
        mesh.rotation.y += 0.015
        cage.rotation.x += 0.01
        cage.rotation.y -= 0.01

        // Stage highlighting logic
        const matchesStage =
          activeStage === 'all' ||
          (activeStage === 'stage1' && data.stage === 'stage1') ||
          (activeStage === 'stage2' && data.stage === 'stage2')

        const targetScale = matchesStage ? 1.0 : 0.45
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)

        if (!matchesStage) {
          mesh.material.opacity = 0.25
          mesh.material.transparent = true
        } else {
          mesh.material.opacity = 1.0
          mesh.material.transparent = false
        }
      })

      particleSystem.rotation.y = -elapsedTime * 0.03

      renderer.render(scene, camera)
    }

    animate()

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('click', onClick)

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      renderer.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [activeStage, onSelectModule])

  if (!webGLSupported) {
    return (
      <div className="three-fallback-card">
        <div className="fallback-badge">Interactive 23E Ecosystem</div>
        <h3>Village Foundation to Town Expansion</h3>
        <p>Your browser supports standard graphics. Explore all 9 modules below!</p>
      </div>
    )
  }

  return (
    <div className="three-hero-container">
      <div ref={mountRef} className="three-canvas-wrapper" />

      {/* 3D Scene Controls & Legend Overlay */}
      <div className="three-overlay-legend">
        <div className="legend-chip village">
          <span className="dot" />
          <span>Stage 1: Village Core (4 Modules)</span>
        </div>
        <div className="legend-chip town">
          <span className="dot" />
          <span>Stage 2: Town Expansion (5 Modules)</span>
        </div>
        <div className="interaction-tip">
          <small>✨ Drag to rotate 3D world · Click any node to explore</small>
        </div>
      </div>

      {hoveredNode && (
        <div className="three-node-tooltip">
          <span className="tooltip-id">Module {hoveredNode.id}</span>
          <strong>{hoveredNode.title}</strong>
          <small>{hoveredNode.stage === 'stage1' ? 'Village Foundation' : 'Town Expansion'}</small>
        </div>
      )}
    </div>
  )
}
