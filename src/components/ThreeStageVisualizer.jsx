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
 * ThreeStageVisualizer - 3D Interactive Rollout Stage Platform
 * Shows Stage 1 (Village Foundation - 4 modules) and Stage 2 (Town Expansion - 5 modules)
 * connected by an energy pathway, responding dynamically to user stage toggles.
 */
export default function ThreeStageVisualizer({ activeStage = 'stage1', onStageChange }) {
  const mountRef = useRef(null)
  const [webGLSupported] = useState(checkWebGLSupport)

  useEffect(() => {
    if (!webGLSupported) return
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 600
    const height = 300

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.035)

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 7, 18)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(amb)

    const light1 = new THREE.DirectionalLight(0xffffff, 1.2)
    light1.position.set(5, 12, 10)
    scene.add(light1)

    const stageGroup = new THREE.Group()
    scene.add(stageGroup)

    // Platform 1: Stage 1 (Village Core Base)
    const s1BaseGeo = new THREE.CylinderGeometry(3.6, 4.0, 0.6, 32)
    const s1BaseMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.3,
      metalness: 0.3,
      emissive: 0x064e3b,
      emissiveIntensity: 0.3,
    })
    const s1Base = new THREE.Mesh(s1BaseGeo, s1BaseMat)
    s1Base.position.set(-5.5, -0.3, 0)
    stageGroup.add(s1Base)

    // 4 Village Module Pillars
    const villagePillars = []
    const vAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]
    vAngles.forEach((ang) => {
      const pilGeo = new THREE.CylinderGeometry(0.4, 0.45, 2.2, 16)
      const pilMat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x059669,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      })
      const pil = new THREE.Mesh(pilGeo, pilMat)
      const px = -5.5 + Math.cos(ang) * 2.0
      const pz = Math.sin(ang) * 2.0
      pil.position.set(px, 1.1, pz)
      stageGroup.add(pil)
      villagePillars.push(pil)
    })

    // Platform 2: Stage 2 (Town Expansion Base)
    const s2BaseGeo = new THREE.CylinderGeometry(4.2, 4.6, 0.6, 32)
    const s2BaseMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.3,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.3,
    })
    const s2Base = new THREE.Mesh(s2BaseGeo, s2BaseMat)
    s2Base.position.set(5.5, -0.3, 0)
    stageGroup.add(s2Base)

    // 5 Town Module Towers
    const townTowers = []
    const tAngles = [0, 1.25, 2.5, 3.76, 5.02]
    tAngles.forEach((ang) => {
      const towGeo = new THREE.BoxGeometry(0.8, 3.2, 0.8)
      const towMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.45,
        roughness: 0.2,
      })
      const tow = new THREE.Mesh(towGeo, towMat)
      const tx = 5.5 + Math.cos(ang) * 2.4
      const tz = Math.sin(ang) * 2.4
      tow.position.set(tx, 1.6, tz)
      stageGroup.add(tow)
      townTowers.push(tow)
    })

    // Connecting Bridge / Rollout Highway between Village and Town
    const bridgeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5.5, 0.2, 0),
      new THREE.Vector3(0, 1.2, 0),
      new THREE.Vector3(5.5, 0.2, 0),
    ])
    const tubeGeo = new THREE.TubeGeometry(bridgeCurve, 40, 0.16, 8, false)
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xf5a623,
      transparent: true,
      opacity: 0.8,
    })
    const bridgeMesh = new THREE.Mesh(tubeGeo, tubeMat)
    stageGroup.add(bridgeMesh)

    // Energy packet traversing the bridge
    const packetGeo = new THREE.SphereGeometry(0.35, 16, 16)
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb })
    const packet = new THREE.Mesh(packetGeo, packetMat)
    stageGroup.add(packet)

    // Mouse Controls
    let isDragging = false
    let prevX = 0
    let rotY = 0

    const onPointerDown = (e) => {
      isDragging = true
      prevX = e.clientX
    }

    const onPointerMove = (e) => {
      if (!isDragging) return
      const dx = e.clientX - prevX
      rotY += dx * 0.008
      prevX = e.clientX
    }

    const onPointerUp = () => {
      isDragging = false
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      camera.aspect = w / height
      camera.updateProjectionMatrix()
      renderer.setSize(w, height)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Packet moving along curve
      const t = (time * 0.35) % 1
      const point = bridgeCurve.getPointAt(t)
      packet.position.copy(point)

      // Target camera position based on active stage
      let targetCamX = 0
      if (activeStage === 'stage1') targetCamX = -4.5
      else if (activeStage === 'stage2') targetCamX = 4.5

      camera.position.x += (targetCamX - camera.position.x) * 0.05
      camera.lookAt(targetCamX * 0.6, 1, 0)

      // Gentle floating animation of pillars
      villagePillars.forEach((p, idx) => {
        p.position.y = 1.1 + Math.sin(time * 3 + idx) * 0.12
        p.rotation.y = time * 0.5
      })

      townTowers.forEach((tw, idx) => {
        tw.position.y = 1.6 + Math.cos(time * 2.5 + idx) * 0.15
        tw.rotation.y = -time * 0.4
      })

      stageGroup.rotation.y = rotY

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [activeStage])

  if (!webGLSupported) return null

  return (
    <div className="three-stage-visualizer-card">
      <div className="three-visualizer-header">
        <div className="visualizer-title">
          <span className="live-pulse" />
          <strong>3D Architectural Rollout Stage View</strong>
        </div>
        <div className="stage-quick-toggles">
          <button
            type="button"
            className={`stage-pill-btn ${activeStage === 'stage1' ? 'active village' : ''}`}
            onClick={() => onStageChange && onStageChange('stage1')}
          >
            🌾 Focus Stage 1: Village Base (4)
          </button>
          <button
            type="button"
            className={`stage-pill-btn ${activeStage === 'stage2' ? 'active town' : ''}`}
            onClick={() => onStageChange && onStageChange('stage2')}
          >
            🏙️ Focus Stage 2: Town Expansion (5)
          </button>
          <button
            type="button"
            className={`stage-pill-btn ${activeStage === 'all' ? 'active all' : ''}`}
            onClick={() => onStageChange && onStageChange('all')}
          >
            🌐 View Full Network (9)
          </button>
        </div>
      </div>

      <div ref={mountRef} className="three-stage-canvas" />

      <div className="stage-visualizer-footer">
        <small>
          <strong>Stage 1:</strong> 4 Village Core Pillars &nbsp;|&nbsp; <strong>Stage 2:</strong> 5 Town High-Rise Towers &nbsp;|&nbsp; <strong>Bridge:</strong> Real-time Supply Highway
        </small>
      </div>
    </div>
  )
}
