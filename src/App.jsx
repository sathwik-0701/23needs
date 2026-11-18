import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Register from './pages/Register'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/AdminDashboard'
import Orders from './pages/Orders'

// 3D Components & Modules Data based on official 23E NeeDS specification
import ThreeHeroScene from './components/ThreeHeroScene'
import ThreeStageVisualizer from './components/ThreeStageVisualizer'
import ModuleCard from './components/ModuleCard'
import ModuleDetailsModal from './components/ModuleDetailsModal'
import RolloutRoadmap from './components/RolloutRoadmap'
import { FOUNDER_INFO, MODULES_DATA } from './data/modulesData'

import './App.css'
import './components/ThreeModules.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeStage, setActiveStage] = useState('stage1') // 'stage1' | 'stage2' | 'all'
  const [selectedModule, setSelectedModule] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Existing Page Routes (Preserved intact)
  if (window.location.pathname === '/register') {
    return <Register />
  }
  if (window.location.pathname === '/login') {
    return <Login />
  }
  if (window.location.pathname === '/dashboard') {
    return <Dashboard />
  }
  if (window.location.pathname.startsWith('/category')) {
    return <Category />
  }
  if (window.location.pathname === '/cart') {
    return <Cart />
  }
  if (window.location.pathname === '/checkout') {
    return <Checkout />
  }
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />
  }
  if (window.location.pathname === '/orders') {
    return <Orders />
  }

  // Handle opening module from 3D canvas node click
  const handleSelectModuleById = (id) => {
    const all = [...MODULES_DATA.stage1, ...MODULES_DATA.stage2]
    const found = all.find((m) => m.id === id)
    if (found) {
      setSelectedModule(found)
    }
  }

  // Determine which modules to display in current view
  let displayedModules = []
  if (activeStage === 'stage1') {
    displayedModules = MODULES_DATA.stage1
  } else if (activeStage === 'stage2') {
    displayedModules = MODULES_DATA.stage2
  } else {
    displayedModules = [...MODULES_DATA.stage1, ...MODULES_DATA.stage2]
  }

  return (
    <div className="app">
      {/* Navigation Bar */}
      <header className="navbar">
        <a href="#home" className="logo">
          23ENeeDs<span>.</span>
          <small>{FOUNDER_INFO.tagline} ✨</small>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#modules" onClick={() => setActiveStage('stage1')}>Stage 1 (Village)</a>
          <a href="#modules" onClick={() => setActiveStage('stage2')}>Stage 2 (Town)</a>
          <a href="#architecture">3D Ecosystem</a>
          <a href="#roadmap">Rollout Blueprint</a>
          <a href="#vendor">Become a Vendor</a>
          <a
            href={isLoggedIn ? '/dashboard' : '/login'}
            className="login-nav-btn"
          >
            {isLoggedIn ? 'My Dashboard' : 'Sign In'}
          </a>
          <a href="#download" className="download-btn">
            Download App
          </a>
        </nav>
      </header>

      <main>
        {/* Hero Section with Interactive Three.js 3D Canvas */}
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="founder-banner">
              <span className="dot" />
              <span>Founder: {FOUNDER_INFO.name} · Finalized 9-Module Plan</span>
            </div>

            <p className="eyebrow">
              VILLAGE TO TOWN · CONNECTED HYPERLOCAL ECOSYSTEM
            </p>

            <h1>
              Everything you need,
              <span> closer to your community.</span>
            </h1>

            <p className="hero-description">
              {FOUNDER_INFO.scopeSubtitle} Built around verified local supply, direct farmer-to-consumer trade, subscription essentials, and neighbourhood services.
            </p>

            <div className="hero-actions">
              <a href="#modules" className="primary-btn" onClick={() => setActiveStage('stage1')}>
                Explore 4 Village Modules →
              </a>
              <a href="#architecture" className="secondary-btn">
                View 3D Architecture
              </a>
            </div>

            <div className="hero-badges-row">
              <div className="hero-chip green">
                <span>🌾</span>
                <strong>Stage 1:</strong> 4 Village Modules (Priority)
              </div>
              <div className="hero-chip blue">
                <span>🏙️</span>
                <strong>Stage 2:</strong> 5 Town Modules (Expansion)
              </div>
              <div className="hero-chip gold">
                <span>✨</span>
                0% Local Vendor Commission
              </div>
            </div>
          </div>

          {/* Three.js 3D Interactive Ecosystem Canvas */}
          <div className="hero-art-three">
            <ThreeHeroScene
              activeStage={activeStage}
              onSelectModule={handleSelectModuleById}
            />
          </div>
        </section>

        {/* 3D Architectural Rollout Stage Visualizer */}
        <section id="architecture">
          <ThreeStageVisualizer
            activeStage={activeStage}
            onStageChange={(st) => setActiveStage(st)}
          />
        </section>

        {/* Finalized Nine Modules Section */}
        <section className="modules-section" id="modules">
          <div className="section-head-center">
            <span className="badge-pill">AGREED PRODUCT ARCHITECTURE</span>
            <h2>The Focused Nine-Module Scope</h2>
            <p>
              The agreed scope is intentionally focused — not a 16-module all-in-one catalogue.
              The rollout is organized into two disciplined stages: four village-focused foundation modules
              followed by five town-focused expansion modules.
            </p>
          </div>

          {/* Stage Filter Tabs */}
          <div className="stage-selector-bar">
            <button
              type="button"
              className={`stage-tab-btn ${activeStage === 'stage1' ? 'active village' : ''}`}
              onClick={() => setActiveStage('stage1')}
            >
              🌾 Stage 1: Four Village Modules (01 – 04)
            </button>
            <button
              type="button"
              className={`stage-tab-btn ${activeStage === 'stage2' ? 'active town' : ''}`}
              onClick={() => setActiveStage('stage2')}
            >
              🏙️ Stage 2: Five Town Expansion Modules (05 – 09)
            </button>
            <button
              type="button"
              className={`stage-tab-btn ${activeStage === 'all' ? 'active all' : ''}`}
              onClick={() => setActiveStage('all')}
            >
              🌐 All 9 Modules Overview
            </button>
          </div>

          {/* Modules Grid */}
          <div className="modules-grid">
            {displayedModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onExplore={(mod) => setSelectedModule(mod)}
              />
            ))}
          </div>
        </section>

        {/* Rollout Principles & Important Scope Note */}
        <RolloutRoadmap
          activeStage={activeStage}
          onSelectStage={(st) => setActiveStage(st)}
        />

        {/* Existing Quick Categories (Kept for routing compatibility) */}
        <section className="categories" id="categories">
          <p className="eyebrow">DISCOVER YOUR NEIGHBOURHOOD</p>
          <h2>Browse Marketplace Catalog</h2>

          <div className="category-grid">
            <a href="/category/groceries" className="category-card">
              <span>🥬</span>
              <strong>Groceries & Rations</strong>
              <small>Everyday household essentials</small>
            </a>

            <a href="/category/food" className="category-card">
              <span>🍱</span>
              <strong>Food & Tiffins</strong>
              <small>Local mess and tiffins</small>
            </a>

            <a href="/category/services" className="category-card">
              <span>🛠️</span>
              <strong>Local Services</strong>
              <small>Plumbing, electrical & repair</small>
            </a>

            <a href="/category/fashion" className="category-card">
              <span>👕</span>
              <strong>Local Shopping</strong>
              <small>Town shops & daily needs</small>
            </a>
          </div>
        </section>

        {/* Partner & Delivery Callout Sections */}
        <section className="join-section" id="vendor">
          <div>
            <p className="eyebrow">GROW WITH 23E NEEDS</p>
            <h2>Empower your village produce or town shop.</h2>
            <p>
              Connect directly with customers across Andhra Pradesh communities with 0% platform commission.
            </p>
          </div>

          <a href="/register" className="primary-btn">
            Become a Verified Seller →
          </a>
        </section>

        <section className="delivery-section" id="delivery">
          <div>
            <p className="eyebrow">JOIN OUR LOCAL FULFILMENT NETWORK</p>
            <h2>Reliable village-to-town delivery coordination.</h2>
            <p>Partner with 23ENeeDs for local logistics, ride sharing, and scheduled deliveries.</p>
          </div>

          <a href="/register" className="secondary-btn">
            Join as Delivery Partner →
          </a>
        </section>

        <section className="download-section" id="download">
          <h2>23E NeeDS — Everything you need, on the go.</h2>
          <p>Native Android & iOS apps connecting village and town communities coming soon.</p>
          <span className="coming-soon">MOBILE APP COMING SOON</span>
        </section>
      </main>

      {/* Interactive Deep-Dive Module Modal */}
      {selectedModule && (
        <ModuleDetailsModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}

      {/* Footer */}
      <footer>
        <a href="#home" className="footer-logo">23ENeeDs.</a>
        <p><strong>{FOUNDER_INFO.tagline}</strong></p>
        <p>Founder: {FOUNDER_INFO.name} · Connecting rural villages and expanding town hubs across Andhra Pradesh.</p>
        <p style={{ marginTop: '8px', fontSize: '11px', color: '#94a3b8' }}>
          Rollout Framework: Stage 1 (Four Village Modules) + Stage 2 (Five Town Modules).
        </p>
        <small>
          © {new Date().getFullYear()} 23ENeeDs. All rights reserved.
        </small>
      </footer>
    </div>
  )
}

export default App
