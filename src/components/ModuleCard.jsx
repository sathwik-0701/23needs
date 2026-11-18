/**
 * ModuleCard - Interactive presentation card for each of the 9 modules
 * Features official PDF bullets, stage tags, and action buttons.
 */
export default function ModuleCard({ module, onExplore }) {
  const isVillage = module.stage.includes('1')

  return (
    <article className={`modern-module-card ${isVillage ? 'village-accent' : 'town-accent'}`}>
      <div className="card-top-bar">
        <span className="module-number">{module.id}</span>
        <span className={`stage-tag ${isVillage ? 'tag-village' : 'tag-town'}`}>
          {module.stage} · {module.badge}
        </span>
      </div>

      <div className="card-main">
        <div className="card-icon-title">
          <span className="card-icon">{module.icon}</span>
          <div>
            <h3>{module.title}</h3>
            <p className="card-tagline">{module.tagline}</p>
          </div>
        </div>

        <div className="card-points-list">
          <span className="points-label">Agreed Product Scope:</span>
          <ul>
            {module.points.map((point, idx) => (
              <li key={idx}>
                <span className="bullet-dot">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-bottom">
        <button
          type="button"
          className={`explore-module-btn ${isVillage ? 'btn-village' : 'btn-town'}`}
          onClick={() => onExplore(module)}
        >
          <span>Launch Module Experience</span>
          <span className="arrow">→</span>
        </button>
      </div>
    </article>
  )
}
