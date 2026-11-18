import { useState } from 'react'

/**
 * ModuleDetailsModal - Interactive deep-dive modal for each of the 9 modules
 * Gives users an interactive experience for every feature outlined in the PDF.
 */
export default function ModuleDetailsModal({ module, onClose }) {
  if (!module) return null

  return (
    <div className="module-modal-backdrop" onClick={onClose}>
      <div className="module-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="module-modal-header" style={{ borderColor: module.accentColor }}>
          <div className="header-meta">
            <span className="modal-badge" style={{ background: module.accentBg, color: module.accentColor }}>
              {module.stage} · {module.badge}
            </span>
            <div className="title-row">
              <span className="modal-icon">{module.icon}</span>
              <div>
                <h2>{module.id}. {module.title}</h2>
                <p className="modal-tagline">{module.tagline}</p>
              </div>
            </div>
          </div>
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="module-modal-body">
          {/* PDF Official Points */}
          <div className="official-scope-box">
            <h4>📋 Official Specification from Product Scope</h4>
            <ul>
              {module.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>

          {/* Module-Specific Interactive Workspace */}
          {module.slug === 'supply-demand' && <SupplyDemandWorkspace module={module} />}
          {module.slug === 'subscription-plans' && <SubscriptionPlansWorkspace module={module} />}
          {module.slug === 'agricultural-inputs' && <AgriInputsWorkspace module={module} />}
          {module.slug === 'local-services' && <LocalServicesWorkspace module={module} />}
          {module.slug === 'food-delivery' && <FoodDeliveryWorkspace module={module} />}
          {module.slug === 'healthcare' && <HealthcareWorkspace module={module} />}
          {module.slug === 'transport' && <TransportWorkspace module={module} />}
          {module.slug === 'learn-nearby' && <LearnNearbyWorkspace module={module} />}
          {module.slug === 'local-shopping-electronics' && <ElectronicsWorkspace module={module} />}
        </div>

        <div className="module-modal-footer">
          <small className="footer-scope-note">
            ✨ Part of 23E NeeDS 9-Module Plan · Founder: Raghunath Reddy
          </small>
          <button type="button" className="modal-done-btn" onClick={onClose}>
            Done & Close
          </button>
        </div>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 01. Local Supply & Demand Interactive Component
// -------------------------------------------------------------
function SupplyDemandWorkspace({ module }) {
  const [tab, setTab] = useState('browse')
  const [requestForm, setRequestForm] = useState({ item: '', qty: '', village: '', budget: '' })
  const [submitted, setSubmitted] = useState(false)
  const [orders, setOrders] = useState([])

  const handlePostRequest = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRequestForm({ item: '', qty: '', village: '', budget: '' })
    }, 4000)
  }

  const handleOrder = (item) => {
    setOrders((prev) => [...prev, item.name])
  }

  return (
    <div className="interactive-workspace">
      <div className="workspace-tabs">
        <button
          type="button"
          className={tab === 'browse' ? 'active' : ''}
          onClick={() => setTab('browse')}
        >
          🌾 Verified Village Supplies ({module.sampleListings.length})
        </button>
        <button
          type="button"
          className={tab === 'request' ? 'active' : ''}
          onClick={() => setTab('request')}
        >
          ✍️ Post Local Demand Request
        </button>
        <button
          type="button"
          className={tab === 'demands' ? 'active' : ''}
          onClick={() => setTab('demands')}
        >
          📢 Community Demand Board
        </button>
      </div>

      {tab === 'browse' && (
        <div className="tab-pane">
          <p className="tab-intro">
            Direct farmer-to-consumer opportunities built around verified local supply, availability and reliable fulfilment.
          </p>
          <div className="listings-grid">
            {module.sampleListings.map((item, idx) => (
              <div className="listing-card" key={idx}>
                <div className="listing-header">
                  <span className="f2c-badge">{item.type}</span>
                  <span className="verified-pill">✓ Verified Local</span>
                </div>
                <h3>{item.name}</h3>
                <p className="seller-meta">
                  👨‍🌾 <strong>{item.seller}</strong> · 📍 Village: {item.village}
                </p>
                <div className="listing-footer">
                  <div className="price-tag">
                    <strong>{item.price}</strong>
                    <small>Min: {item.minQty}</small>
                  </div>
                  <button
                    type="button"
                    className="action-pill-btn"
                    onClick={() => handleOrder(item)}
                    disabled={orders.includes(item.name)}
                  >
                    {orders.includes(item.name) ? '✓ Request Placed' : 'Coordinate Order'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'request' && (
        <div className="tab-pane">
          <div className="form-card">
            <h3>Post What You Need in Your Village</h3>
            <p>Nearby local producers and sellers will receive your request and respond with availability.</p>
            {submitted && (
              <div className="success-alert">
                ✓ Request posted successfully! Local village sellers have been notified.
              </div>
            )}
            <form onSubmit={handlePostRequest}>
              <div className="form-row">
                <label>
                  What do you need?
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 bags of Country Paddy Straw, Cold Pressed Oil, Desi Eggs"
                    value={requestForm.item}
                    onChange={(e) => setRequestForm({ ...requestForm, item: e.target.value })}
                  />
                </label>
                <label>
                  Quantity needed
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50 kg / 10 Litres"
                    value={requestForm.qty}
                    onChange={(e) => setRequestForm({ ...requestForm, qty: e.target.value })}
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Your Village / Landmark
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kothapalli, Near Panchayat Office"
                    value={requestForm.village}
                    onChange={(e) => setRequestForm({ ...requestForm, village: e.target.value })}
                  />
                </label>
                <label>
                  Target Budget / Price (Optional)
                  <input
                    type="text"
                    placeholder="e.g. ₹2,000"
                    value={requestForm.budget}
                    onChange={(e) => setRequestForm({ ...requestForm, budget: e.target.value })}
                  />
                </label>
              </div>
              <button type="submit" className="submit-btn">
                Broadcast Demand to Nearby Sellers →
              </button>
            </form>
          </div>
        </div>
      )}

      {tab === 'demands' && (
        <div className="tab-pane">
          <p className="tab-intro">Active village demand requests posted by residents and farmers:</p>
          <div className="demands-list">
            {module.sampleRequests.map((req, i) => (
              <div className="demand-item" key={i}>
                <div className="demand-bubble">📢</div>
                <div className="demand-content">
                  <strong>{req.item}</strong>
                  <p>Requested by <strong>{req.requester}</strong> · 📍 {req.village}</p>
                </div>
                <div className="demand-urgency">
                  <span className="urgency-tag">{req.urgency}</span>
                  <button type="button" className="seller-respond-btn" onClick={() => alert(`Connecting with ${req.requester} in ${req.village}`)}>
                    I Have This →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// -------------------------------------------------------------
// 02. Subscription Plans Interactive Component
// -------------------------------------------------------------
function SubscriptionPlansWorkspace({ module }) {
  const [selectedTier, setSelectedTier] = useState(module.tiers[1]) // ₹2,500 default
  const [frequency, setFrequency] = useState('Monthly Delivery (1st of month)')
  const [customItems, setCustomItems] = useState(selectedTier.defaultItems)
  const [subscribed, setSubscribed] = useState(false)
  const [address, setAddress] = useState('')

  const handleTierSelect = (tier) => {
    setSelectedTier(tier)
    setCustomItems(tier.defaultItems)
  }

  const toggleItem = (item) => {
    if (customItems.includes(item)) {
      if (customItems.length <= 2) {
        alert('Package must contain at least 2 essential items.')
        return
      }
      setCustomItems(customItems.filter((i) => i !== item))
    } else {
      setCustomItems([...customItems, item])
    }
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <div className="interactive-workspace">
      <div className="scope-quote-alert">
        <strong>📌 Official Pricing Scope:</strong>
        <p>
          Illustrative monthly tiers: <strong>₹1,000 Basic Essentials</strong>; <strong>₹2,500 Expanded Household Essentials</strong>; <strong>₹5,000 Family Essentials</strong>.
          Flexible weekly, fortnightly or monthly ordering. Packages can be customised.
          <br />
          <em>Example prices and item mix are not fixed promises; final plans depend on customer needs, product availability and delivery costs.</em>
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="subscription-tiers-grid">
        {module.tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`tier-card ${selectedTier.price === tier.price ? 'selected' : ''}`}
            onClick={() => handleTierSelect(tier)}
          >
            {tier.badge && <span className="tier-badge">{tier.badge}</span>}
            <h3>{tier.name}</h3>
            <div className="tier-price">
              <span className="currency">₹</span>
              <strong>{tier.price.toLocaleString('en-IN')}</strong>
              <small>/ month</small>
            </div>
            <p className="tier-desc">{tier.description}</p>
            <button
              type="button"
              className={`tier-select-btn ${selectedTier.price === tier.price ? 'active' : ''}`}
            >
              {selectedTier.price === tier.price ? '✓ Selected Tier' : 'Choose This Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Customizer Section */}
      <div className="customizer-box">
        <h3>Customize Your {selectedTier.name} (₹{selectedTier.price})</h3>
        <p className="subtext">Toggle items to personalize your household basket before starting delivery:</p>

        <div className="frequency-selector">
          <strong>Select Delivery Frequency:</strong>
          <div className="freq-chips">
            {module.frequencies.map((freq, i) => (
              <button
                type="button"
                key={i}
                className={`freq-chip ${frequency === freq ? 'active' : ''}`}
                onClick={() => setFrequency(freq)}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        <div className="items-checklist">
          {selectedTier.defaultItems.map((item, idx) => {
            const isChecked = customItems.includes(item)
            return (
              <label key={idx} className={`item-check-row ${isChecked ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item)}
                />
                <span>{item}</span>
                <span className="stock-label">Included in Tier</span>
              </label>
            )
          })}
        </div>

        {subscribed ? (
          <div className="subscription-success">
            <h4>🎉 Subscription Request Confirmed!</h4>
            <p>
              Your plan for <strong>{selectedTier.name} (₹{selectedTier.price}/mo)</strong> with <strong>{frequency}</strong> has been logged for delivery to: <em>{address || 'Your village address'}</em>.
              Our village coordinator will verify item mix and confirm initial delivery date!
            </p>
            <button type="button" className="action-pill-btn" onClick={() => setSubscribed(false)}>
              Adjust Plan
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="subscribe-confirm-form">
            <div className="form-row">
              <label>
                Village Delivery Address & House Landmark
                <input
                  type="text"
                  required
                  placeholder="e.g. D.No 4-21, Gandhi Chowk, Kothapalli"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className="start-subscription-btn">
              Confirm & Start {selectedTier.name} (₹{selectedTier.price}/mo) →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 03. Agricultural Inputs Interactive Component
// -------------------------------------------------------------
function AgriInputsWorkspace({ module }) {
  const [selectedCat, setSelectedCat] = useState(module.categories[0])
  const [quoteSent, setQuoteSent] = useState(false)
  const [quoteForm, setQuoteForm] = useState({ crop: '', acres: '', village: '', product: '' })

  const handleQuoteSubmit = (e) => {
    e.preventDefault()
    setQuoteSent(true)
    setTimeout(() => setQuoteSent(false), 5000)
  }

  return (
    <div className="interactive-workspace">
      <div className="categories-pill-row">
        {module.categories.map((cat, i) => (
          <button
            key={i}
            type="button"
            className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="agri-retailers-section">
        <h3>Verified Agriculture Retailers & Input Hubs</h3>
        <p className="subtext">
          Connecting farmers with licensed retailers operating under certified product rules and local compliance.
        </p>
        <div className="retailers-grid">
          {module.retailers.map((r, i) => (
            <div className="retailer-card" key={i}>
              <div className="retailer-badge-row">
                <span className="license-tag">License: {r.license}</span>
                <span className="verified-pill">✓ Govt Verified</span>
              </div>
              <h4>{r.name}</h4>
              <p className="location-p">📍 {r.location}</p>
              <div className="stock-notice">
                <span>📦 Stock Status:</span>
                <strong>{r.stockStatus}</strong>
              </div>
              <button
                type="button"
                className="inquiry-btn"
                onClick={() => setQuoteForm({ ...quoteForm, product: `${r.name} - ${selectedCat}` })}
              >
                Inquire & Check Availability
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="farmer-inquiry-box">
        <h3>🚜 Direct Farmer Product Enquiry & Price Check</h3>
        <p>Submit your seasonal requirement for availability checks and door-to-farm coordination:</p>

        {quoteSent && (
          <div className="success-alert">
            ✓ Product enquiry transmitted to licensed agricultural suppliers near your mandal! A coordinator will call with current batch availability.
          </div>
        )}

        <form onSubmit={handleQuoteSubmit}>
          <div className="form-row">
            <label>
              Crop Name & Variety
              <input
                type="text"
                required
                placeholder="e.g. BPT Paddy, BT Cotton, Chilli, Groundnut"
                value={quoteForm.crop}
                onChange={(e) => setQuoteForm({ ...quoteForm, crop: e.target.value })}
              />
            </label>
            <label>
              Land Extent / Acreage
              <input
                type="text"
                required
                placeholder="e.g. 3 Acres / 10 Guntas"
                value={quoteForm.acres}
                onChange={(e) => setQuoteForm({ ...quoteForm, acres: e.target.value })}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Village / Mandal Center
              <input
                type="text"
                required
                placeholder="e.g. Rayachoti Mandal, Peddapalli"
                value={quoteForm.village}
                onChange={(e) => setQuoteForm({ ...quoteForm, village: e.target.value })}
              />
            </label>
            <label>
              Required Input (Seeds/Fertiliser/Pesticide)
              <input
                type="text"
                required
                placeholder="e.g. 6 bags Urea, DAP, Micronutrient spray"
                value={quoteForm.product}
                onChange={(e) => setQuoteForm({ ...quoteForm, product: e.target.value })}
              />
            </label>
          </div>
          <button type="submit" className="submit-btn green-btn">
            Transmit Enquiry to Verified Dealers →
          </button>
        </form>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 04. Local Services Interactive Component
// -------------------------------------------------------------
function LocalServicesWorkspace({ module }) {
  const [selectedService, setSelectedService] = useState(module.serviceCategories[0].title)
  const [urgency, setUrgency] = useState('Today (Within 4 hours)')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [details, setDetails] = useState({ problem: '', village: '', phone: '' })

  const handleServiceSubmit = (e) => {
    e.preventDefault()
    setBookingConfirmed(true)
  }

  return (
    <div className="interactive-workspace">
      <div className="service-categories-grid">
        {module.serviceCategories.map((sc, i) => (
          <div
            key={i}
            className={`service-cat-card ${selectedService === sc.title ? 'active' : ''}`}
            onClick={() => setSelectedService(sc.title)}
          >
            <span className="sc-icon">{sc.icon}</span>
            <strong>{sc.title}</strong>
            <small>{sc.examples}</small>
          </div>
        ))}
      </div>

      <div className="providers-showcase">
        <h3>Trusted Neighbourhood Technicians ({selectedService})</h3>
        <div className="providers-grid">
          {module.providers.map((p, i) => (
            <div className="provider-card" key={i}>
              <div className="provider-top">
                <span className="p-avatar">👨‍🔧</span>
                <div>
                  <strong>{p.name}</strong>
                  <p>📍 {p.village}</p>
                </div>
              </div>
              <div className="provider-meta">
                <span className="rating">{p.rating}</span>
                <span className="badge-ok">✓ ID Verified</span>
              </div>
              <button
                type="button"
                className="book-provider-btn"
                onClick={() => setSelectedService(selectedService)}
              >
                Request Service Visit
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="service-request-form-card">
        <h3>Request Local Service Visit</h3>
        <p className="subtext">
          Submit your problem details. 23E NeeDS coordinates with verified neighbourhood technicians for fast response.
        </p>

        {bookingConfirmed ? (
          <div className="success-alert">
            ✓ Service request lodged for <strong>{selectedService}</strong> ({urgency})! A technician will reach out to confirm arrival.
          </div>
        ) : (
          <form onSubmit={handleServiceSubmit}>
            <div className="form-row">
              <label>
                Selected Service Category
                <input type="text" readOnly value={selectedService} />
              </label>
              <label>
                Urgency Level
                <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                  <option>Emergency (Immediate help)</option>
                  <option>Today (Within 4 hours)</option>
                  <option>Tomorrow Morning</option>
                  <option>Flexible / Weekend</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Village & Street Address
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Ramalayam Temple, Venkatapuram"
                  value={details.village}
                  onChange={(e) => setDetails({ ...details, village: e.target.value })}
                />
              </label>
              <label>
                Contact Phone Number
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={details.phone}
                  onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                />
              </label>
            </div>
            <div className="form-row">
              <label style={{ width: '100%' }}>
                Brief Description of the Fault / Repair needed
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Submersible starter box sparking, or pipe broken near kitchen"
                  value={details.problem}
                  onChange={(e) => setDetails({ ...details, problem: e.target.value })}
                />
              </label>
            </div>
            <button type="submit" className="submit-btn">
              Dispatch Request to Local Technician →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 05. Food & Restaurant Delivery Interactive Component
// -------------------------------------------------------------
function FoodDeliveryWorkspace({ module }) {
  const [activePlan, setActivePlan] = useState(module.mealPlans[0])
  const [orderPlaced, setOrderPlaced] = useState(false)

  return (
    <div className="interactive-workspace">
      <div className="town-categories-row">
        {module.subcategories.map((sub, i) => (
          <div className="town-cat-box" key={i}>
            <strong>{sub.name}</strong>
            <p>{sub.desc}</p>
          </div>
        ))}
      </div>

      <div className="meal-plans-section">
        <h3>📅 Scheduled Meal Plans (Tiffin & Daily Meals)</h3>
        <p className="subtext">
          Reliable scheduled meal plans for daily office workers, students, and families with flexible pickup and delivery coordination.
        </p>

        <div className="meal-plans-grid">
          {module.mealPlans.map((mp, i) => (
            <div
              key={i}
              className={`meal-plan-card ${activePlan.name === mp.name ? 'selected' : ''}`}
              onClick={() => setActivePlan(mp)}
            >
              <div className="mp-badge">Daily Subscription</div>
              <h4>{mp.name}</h4>
              <p>{mp.desc}</p>
              <strong className="mp-price">{mp.price}</strong>
              <button type="button" className="action-pill-btn">
                {activePlan.name === mp.name ? '✓ Selected Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {orderPlaced ? (
          <div className="success-alert">
            ✓ Scheduled meal plan confirmed! Tiffin vendor will start deliveries from tomorrow.
          </div>
        ) : (
          <div className="meal-confirm-card">
            <h4>Ready to activate {activePlan.name}?</h4>
            <p>Delivery coordination available across town areas and connecting villages.</p>
            <button type="button" className="submit-btn" onClick={() => setOrderPlaced(true)}>
              Activate Scheduled Plan ({activePlan.price}) →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 06. Healthcare Interactive Component
// -------------------------------------------------------------
function HealthcareWorkspace({ module }) {
  const [selectedDoctor, setSelectedDoctor] = useState(module.specialists[0])
  const [consultType, setConsultType] = useState('In-Clinic Visit')
  const [booked, setBooked] = useState(false)
  const [patient, setPatient] = useState({ name: '', age: '', relation: 'Self', symptoms: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setBooked(true)
  }

  return (
    <div className="interactive-workspace">
      <div className="doctors-grid">
        {module.specialists.map((doc, i) => (
          <div
            key={i}
            className={`doctor-card ${selectedDoctor.name === doc.name ? 'selected' : ''}`}
            onClick={() => setSelectedDoctor(doc)}
          >
            <span className="doc-avatar">🩺</span>
            <h4>{doc.name}</h4>
            <p className="doc-spec">{doc.spec}</p>
            <small>📍 {doc.clinic}</small>
            <div className="doc-timings">🕒 {doc.timing}</div>
            <div className="doc-tags">
              {doc.onlineSupport && <span className="online-pill">💻 Online Consultation Available</span>}
              {doc.homeSampleCollection && <span className="sample-pill">🩸 Home Sample Pickup</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="appointment-booking-box">
        <h3>Family Appointment Coordination</h3>
        <p className="subtext">
          Book appointments for parents, children or family members with trusted town clinics and specialists.
        </p>

        {booked ? (
          <div className="success-alert">
            ✓ Appointment request confirmed with <strong>{selectedDoctor.name}</strong> for <strong>{patient.name} ({patient.relation})</strong> via {consultType}! A slot confirmation SMS has been prepared.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="consult-mode-selector">
              <strong>Select Consultation Mode:</strong>
              <div className="mode-buttons">
                <button
                  type="button"
                  className={consultType === 'In-Clinic Visit' ? 'active' : ''}
                  onClick={() => setConsultType('In-Clinic Visit')}
                >
                  🏥 In-Clinic Doctor Visit
                </button>
                <button
                  type="button"
                  className={consultType === 'Online Video Consultation' ? 'active' : ''}
                  onClick={() => setConsultType('Online Video Consultation')}
                >
                  📱 Online Video Consultation
                </button>
              </div>
            </div>

            <div className="form-row">
              <label>
                Patient Full Name
                <input
                  type="text"
                  required
                  placeholder="e.g. Venkata Subbamma"
                  value={patient.name}
                  onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                />
              </label>
              <label>
                Relationship
                <select
                  value={patient.relation}
                  onChange={(e) => setPatient({ ...patient, relation: e.target.value })}
                >
                  <option>Self</option>
                  <option>Parent (Father / Mother)</option>
                  <option>Child (Son / Daughter)</option>
                  <option>Spouse</option>
                  <option>Relative / Neighbour</option>
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                Patient Age
                <input
                  type="number"
                  required
                  placeholder="e.g. 58"
                  value={patient.age}
                  onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                />
              </label>
              <label>
                Key Symptoms / Reason for Visit
                <input
                  type="text"
                  required
                  placeholder="e.g. Sugar checkup, seasonal fever, joint pain"
                  value={patient.symptoms}
                  onChange={(e) => setPatient({ ...patient, symptoms: e.target.value })}
                />
              </label>
            </div>

            <button type="submit" className="submit-btn blue-btn">
              Coordinate Family Appointment with {selectedDoctor.name} →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 07. Auto, Cab & Local Transport Interactive Component
// -------------------------------------------------------------
function TransportWorkspace({ module }) {
  const [selectedVehicle, setSelectedVehicle] = useState(module.vehicleTypes[0].type)
  const [tripBooked, setTripBooked] = useState(false)
  const [trip, setTrip] = useState({ pickup: '', drop: '', date: 'Today' })

  const handleTripSubmit = (e) => {
    e.preventDefault()
    setTripBooked(true)
  }

  return (
    <div className="interactive-workspace">
      <div className="vehicle-types-grid">
        {module.vehicleTypes.map((v, i) => (
          <div
            key={i}
            className={`vehicle-card ${selectedVehicle === v.type ? 'active' : ''}`}
            onClick={() => setSelectedVehicle(v.type)}
          >
            <span className="v-icon">{v.icon}</span>
            <h4>{v.type}</h4>
            <strong className="v-fare">{v.fareNote}</strong>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="scheduled-trips-box">
        <h3>🚌 Scheduled Shared Village-Town Trips</h3>
        <p className="subtext">Save money by booking seats on regular shared daily transport lines:</p>
        <div className="trips-table">
          {module.scheduledTrips.map((st, i) => (
            <div className="trip-row" key={i}>
              <div className="trip-route">
                <strong>📍 {st.from}</strong> ➔ <strong>🏁 {st.to}</strong>
              </div>
              <div className="trip-timing">🕒 {st.time}</div>
              <div className="trip-seats">{st.seatsAvailable} seats available</div>
              <button
                type="button"
                className="reserve-seat-btn"
                onClick={() => alert(`Seat reserved for trip: ${st.from} to ${st.to}`)}
              >
                Reserve Seat (₹30)
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="ride-request-form-card">
        <h3>Request Direct Ride / Transport Booking</h3>
        {tripBooked ? (
          <div className="success-alert">
            ✓ Ride request confirmed for <strong>{selectedVehicle}</strong> from {trip.pickup} to {trip.drop}! Local driver dispatch coordination in progress.
          </div>
        ) : (
          <form onSubmit={handleTripSubmit}>
            <div className="form-row">
              <label>
                Pickup Location (Village or Town Area)
                <input
                  type="text"
                  required
                  placeholder="e.g. Kothapalli Panchayat Stand"
                  value={trip.pickup}
                  onChange={(e) => setTrip({ ...trip, pickup: e.target.value })}
                />
              </label>
              <label>
                Destination
                <input
                  type="text"
                  required
                  placeholder="e.g. Town RTC Bus Stand / Railway Station"
                  value={trip.drop}
                  onChange={(e) => setTrip({ ...trip, drop: e.target.value })}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Schedule / Time
                <select value={trip.date} onChange={(e) => setTrip({ ...trip, date: e.target.value })}>
                  <option>Immediate / Next 15 mins</option>
                  <option>Today Evening</option>
                  <option>Tomorrow Early Morning (Mandi / Train)</option>
                </select>
              </label>
              <label>
                Selected Vehicle Type
                <input type="text" readOnly value={selectedVehicle} />
              </label>
            </div>
            <button type="submit" className="submit-btn purple-btn">
              Coordinate Ride with Local Drivers →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 08. NeeDS Learn Nearby Interactive Component
// -------------------------------------------------------------
function LearnNearbyWorkspace({ module }) {
  const [bookedDemo, setBookedDemo] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(module.demoTutors[0])
  const [student, setStudent] = useState({ name: '', class: '', phone: '' })

  const handleDemoSubmit = (e) => {
    e.preventDefault()
    setBookedDemo(true)
  }

  return (
    <div className="interactive-workspace">
      <div className="learn-categories-grid">
        {module.learningCategories.map((lc, i) => (
          <div className="learn-cat-card" key={i}>
            <span className="lc-icon">{lc.icon}</span>
            <strong>{lc.title}</strong>
            <small>{lc.count}</small>
          </div>
        ))}
      </div>

      <div className="demo-tutors-section">
        <h3>Featured Nearby Tutors & Skill Mentors</h3>
        <p className="subtext">Discover local educators, request free demo classes and join group batches:</p>
        <div className="tutors-grid">
          {module.demoTutors.map((t, i) => (
            <div
              key={i}
              className={`tutor-card ${selectedTutor.name === t.name ? 'selected' : ''}`}
              onClick={() => setSelectedTutor(t)}
            >
              <div className="t-avatar">👨‍🏫</div>
              <h4>{t.name}</h4>
              <p className="t-sub">{t.subject}</p>
              <small>🎯 {t.mode}</small>
              <div className="demo-tag">{t.feeNote}</div>
              <button type="button" className="action-pill-btn">
                {selectedTutor.name === t.name ? '✓ Selected' : 'Choose for Demo'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-booking-card">
        <h3>Book Free Demo Session with {selectedTutor.name}</h3>
        {bookedDemo ? (
          <div className="success-alert">
            ✓ Demo class requested for <strong>{student.name}</strong> ({student.class})! Tutor will contact on {student.phone} with batch timings.
          </div>
        ) : (
          <form onSubmit={handleDemoSubmit}>
            <div className="form-row">
              <label>
                Student Name
                <input
                  type="text"
                  required
                  placeholder="e.g. Sathwik / Ananya"
                  value={student.name}
                  onChange={(e) => setStudent({ ...student, name: e.target.value })}
                />
              </label>
              <label>
                Class / Interest
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 10 State Board / Tailoring Basics"
                  value={student.class}
                  onChange={(e) => setStudent({ ...student, class: e.target.value })}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Parent / Student Mobile Number
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9848022338"
                  value={student.phone}
                  onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                />
              </label>
            </div>
            <button type="submit" className="submit-btn">
              Confirm Free Demo Class Request →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 09. Local Shopping & Electronics Interactive Component
// -------------------------------------------------------------
function ElectronicsWorkspace({ module }) {
  const [reserved, setReserved] = useState(false)
  const [item, setItem] = useState({ name: 'Orient 1200mm High Speed Ceiling Fan', shop: 'Sri Lakshmi Electronics', price: '₹1,650' })

  return (
    <div className="interactive-workspace">
      <div className="product-tags-cloud">
        {module.categories.map((c, i) => (
          <span className="cloud-tag" key={i}>
            🔍 {c}
          </span>
        ))}
      </div>

      <div className="shops-showcase">
        <h3>Verified Town Retailers & Dealers</h3>
        <div className="shops-grid">
          {module.sampleShops.map((s, i) => (
            <div className="shop-card" key={i}>
              <div className="shop-head">
                <span className="verified-pill">✓ Authorized Dealer</span>
                <span className="match-tag">{s.priceMatch}</span>
              </div>
              <h4>{s.name}</h4>
              <p>📍 {s.location}</p>
              <small>⚡ Store Pickup: {s.pickupTime}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="reserve-demo-box">
        <h3>Direct Price Comparison & In-Store Reservation</h3>
        <p className="subtext">
          Reserve products online with zero upfront payment. Pay when picking up at the verified local shop with official brand warranty.
        </p>

        <div className="comparison-card">
          <div className="comp-item-info">
            <span className="comp-icon">📱</span>
            <div>
              <strong>{item.name}</strong>
              <p>Local Authorized Dealer: <strong>{item.shop}</strong></p>
            </div>
          </div>
          <div className="comp-pricing">
            <div className="price-comp">
              <span className="local-price">{item.price}</span>
              <span className="online-tag">Matches E-Commerce + Official Local Warranty</span>
            </div>
            {reserved ? (
              <span className="reserved-badge">✓ Reserved for Pickup</span>
            ) : (
              <button
                type="button"
                className="reserve-btn"
                onClick={() => setReserved(true)}
              >
                Reserve for Free Store Pickup
              </button>
            )}
          </div>
        </div>

        {reserved && (
          <div className="success-alert">
            ✓ Reservation code #23E-{Math.floor(1000 + Math.random() * 9000)} generated! The product will be kept ready at {item.shop}. Show code and inspect before payment!
          </div>
        )}
      </div>
    </div>
  )
}
