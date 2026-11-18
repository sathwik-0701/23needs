import { FOUNDER_INFO, ROLLOUT_PRINCIPLES, SCOPE_NOTE } from '../data/modulesData'

/**
 * RolloutRoadmap - Visualizer for Stage Rollout Principles and Official Scope Note
 * Directly captures the architectural strategy from Page 4 of the 23E NeeDS PDF.
 */
export default function RolloutRoadmap({ activeStage, onSelectStage }) {
  return (
    <section className="roadmap-section" id="roadmap">
      <div className="roadmap-container">
        <div className="section-badge-center">
          <span className="badge-pill">ARCHITECTURAL BLUEPRINT</span>
        </div>
        <h2 className="roadmap-title">
          Rollout Principles & Staged Expansion
        </h2>
        <p className="roadmap-subtitle">
          {FOUNDER_INFO.scopeSubtitle}
        </p>

        {/* Two Stage Interactive Comparison Bar */}
        <div className="stages-comparison-grid">
          <div
            className={`stage-overview-card stage1-card ${activeStage === 'stage1' ? 'highlighted' : ''}`}
            onClick={() => onSelectStage('stage1')}
          >
            <div className="stage-card-header">
              <span className="stage-num-badge green">STAGE 1 · PRIORITY FOUNDATION</span>
              <span className="stage-status-live">● Live Core</span>
            </div>
            <h3>Four Village Modules</h3>
            <p className="stage-role">
              Built directly for rural households, farmers, and village service networks.
            </p>
            <ul className="stage-modules-mini-list">
              <li><strong>01.</strong> Local Supply & Demand (F2C Marketplace)</li>
              <li><strong>02.</strong> Subscription Plans (₹1k, ₹2.5k, ₹5k Tiers)</li>
              <li><strong>03.</strong> Agricultural Inputs (Seeds, Fertilisers, Pesticides)</li>
              <li><strong>04.</strong> Local Services (Plumbing, Electrical, Repairs)</li>
            </ul>
            <button type="button" className="stage-switch-btn green-btn">
              Explore Stage 1 Village Scope →
            </button>
          </div>

          <div
            className={`stage-overview-card stage2-card ${activeStage === 'stage2' ? 'highlighted' : ''}`}
            onClick={() => onSelectStage('stage2')}
          >
            <div className="stage-card-header">
              <span className="stage-num-badge blue">STAGE 2 · TOWN EXPANSION</span>
              <span className="stage-status-planned">● Staged Expansion</span>
            </div>
            <h3>Five Town Expansion Modules</h3>
            <p className="stage-role">
              Extending the platform into broader town-level use cases as demand matures.
            </p>
            <ul className="stage-modules-mini-list">
              <li><strong>05.</strong> Food & Restaurant Delivery (Tiffins & Meal Plans)</li>
              <li><strong>06.</strong> Doctor Consultation & Healthcare (Clinics & Online)</li>
              <li><strong>07.</strong> Auto, Cab & Local Transport (Shared & Private Rides)</li>
              <li><strong>08.</strong> NeeDS Learn Nearby (Tutors & Demo Classes)</li>
              <li><strong>09.</strong> Local Shopping & Electronics (Price Compare & Reserve)</li>
            </ul>
            <button type="button" className="stage-switch-btn blue-btn">
              Explore Stage 2 Town Scope →
            </button>
          </div>
        </div>

        {/* 4 Rollout Principles from PDF */}
        <div className="principles-section">
          <h3 className="principles-heading">Core Rollout Principles</h3>
          <div className="principles-grid">
            {ROLLOUT_PRINCIPLES.map((rp, index) => (
              <div className="principle-card" key={index}>
                <div className="principle-top">
                  <span className="principle-icon">{rp.icon}</span>
                  <span className="principle-step">Step {rp.step}</span>
                </div>
                <h4>{rp.title}</h4>
                <p>{rp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Important Scope Note from PDF */}
        <div className="scope-note-banner">
          <div className="scope-note-icon">📌</div>
          <div className="scope-note-content">
            <h4>{SCOPE_NOTE.title}</h4>
            <p>{SCOPE_NOTE.text}</p>
            <div className="scope-note-footer">
              <strong className="official-tagline">{SCOPE_NOTE.tagline}</strong>
              <span className="founder-tag">Founder: {FOUNDER_INFO.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
