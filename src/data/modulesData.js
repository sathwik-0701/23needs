// 23E NeeDS - Finalized Modules Data
// Based on official platform specifications by Founder: Raghunath Reddy

export const FOUNDER_INFO = {
  name: 'Raghunath Reddy',
  role: 'Founder',
  company: '23E NeeDS',
  tagline: 'Everything You Need',
  scopeSubtitle: 'A focused nine-module plan: four village-focused modules followed by five town-focused modules.',
}

export const ROLLOUT_PRINCIPLES = [
  {
    step: '01',
    title: 'Focused Village Foundation',
    desc: 'Launch with the four village modules as the focused foundation.',
    icon: '🌾',
  },
  {
    step: '02',
    title: 'Demand-Ready Town Expansion',
    desc: 'Expand into the five town modules when local operations, partners and demand are ready.',
    icon: '🏙️',
  },
  {
    step: '03',
    title: 'Reliable Fulfilment First',
    desc: 'Keep customer experience, vendor onboarding, service availability and fulfilment reliable before expanding geography.',
    icon: '🤝',
  },
  {
    step: '04',
    title: 'Pilot-Driven Prioritisation',
    desc: 'Use actual pilot results to prioritise categories and refine the operating model.',
    icon: '📊',
  },
]

export const SCOPE_NOTE = {
  title: 'Important Scope Note',
  text: 'This document records the agreed product scope and rollout structure. It does not claim that every module is already built, live or legally cleared. Launch sequencing, partner availability, pricing, delivery costs and compliance requirements must be validated before activation.',
  tagline: '23E NeeDS — Everything You Need',
}

export const MODULES_DATA = {
  stage1: [
    {
      id: '01',
      stage: 'Stage 1',
      stageTitle: 'Four Village Modules',
      slug: 'supply-demand',
      title: 'Local Supply & Demand',
      tagline: 'Connecting village customers with nearby local sellers, producers and verified supplies.',
      badge: 'Village Core',
      icon: '🌾',
      accentColor: '#10b981',
      accentBg: '#ecfdf5',
      points: [
        'Connect village customers with nearby local sellers, producers and available products.',
        'Enable local discovery, customer requests, seller responses and order coordination.',
        'Support local buying and selling, including farmer-to-consumer opportunities where practical.',
        'Build around verified local supply, availability and fulfilment rather than listing everything at once.',
      ],
      sampleListings: [
        { name: 'Pure BPT 5204 Sona Masoori Rice', seller: 'Ramanjaneyulu (Farmer)', village: 'Kothapalli', price: '₹52/kg', minQty: '25 kg bag', verified: true, type: 'Farmer Direct' },
        { name: 'Fresh Farm Desi Cow Milk & Ghee', seller: 'Lakshmi Dairy Farms', village: 'Venkatapuram', price: '₹65/L', minQty: 'Daily Morning', verified: true, type: 'Local Producer' },
        { name: 'Organic Cold-Pressed Groundnut Oil', seller: 'Sri Balaji Agro Press', village: 'Rayachoti Rural', price: '₹195/L', minQty: '1 Litre', verified: true, type: 'Village Mill' },
      ],
      sampleRequests: [
        { item: 'Looking for 15 bags of Desi Paddy straw for cattle', requester: 'Subba Rao', village: 'Peddapalli', urgency: 'Within 2 days' },
        { item: 'Bulk requirement of raw jaggery (Bella)', requester: 'Govindamma', village: 'Chinna Tippa', urgency: 'This weekend' },
      ]
    },
    {
      id: '02',
      stage: 'Stage 1',
      stageTitle: 'Four Village Modules',
      slug: 'subscription-plans',
      title: 'Subscription Plans',
      tagline: 'Recurring household grocery and essentials packages tailored for village homes.',
      badge: 'Village Essentials',
      icon: '📦',
      accentColor: '#f59e0b',
      accentBg: '#fffbeb',
      points: [
        'Recurring household grocery and essentials packages for village customers.',
        'Illustrative monthly tiers: ₹1,000 Basic Essentials; ₹2,500 Expanded Household Essentials; ₹5,000 Family Essentials.',
        'Flexible weekly, fortnightly or monthly ordering, with packages that can be customised.',
        'Example prices and item mix are not fixed promises; final plans depend on customer needs, product availability and delivery costs.',
      ],
      tiers: [
        {
          name: 'Basic Essentials',
          price: 1000,
          period: 'Monthly',
          popular: false,
          description: 'Compact essential package for small households or individual seniors.',
          defaultItems: [
            'Sona Masoori Rice (10 kg)',
            'Toor Dal (1 kg)',
            'Refined Cooking Oil (1 Litre)',
            'Crystal Salt & Turmeric (1 kg + 100g)',
            'Bathing & Laundry Soaps (Pack of 3)',
          ],
        },
        {
          name: 'Expanded Household Essentials',
          price: 2500,
          period: 'Monthly',
          popular: true,
          badge: 'Most Popular in Villages',
          description: 'Comprehensive monthly rations & household essentials for standard village families (3-4 members).',
          defaultItems: [
            'Premium Rice (25 kg Bag)',
            'Toor Dal (2 kg) + Moong Dal (1 kg)',
            'Sunflower Cooking Oil (2 Litres)',
            'Sugar & Jaggery (2 kg + 1 kg)',
            'Spices, Salt & Chilli Powder Pack',
            'Tea Powder (500g)',
            'Washing Powder & Toiletries Pack',
          ],
        },
        {
          name: 'Family Essentials',
          price: 5000,
          period: 'Monthly',
          popular: false,
          description: 'Complete generous care package for large joint families or agrarian households.',
          defaultItems: [
            'Premium Rice (50 kg Bag)',
            'Mixed Pulses & Dals (5 kg Assorted)',
            'Groundnut / Sunflower Oil (5 Litre Tin)',
            'Whole Wheat Atta (10 kg)',
            'Full Pantry Spice & Masala Combo',
            'Personal Care & Detergents Mega Pack',
            'Farm-Fresh Millets & Daily Snacks Pack',
          ],
        },
      ],
      frequencies: ['Weekly Delivery', 'Fortnightly (Every 2 Weeks)', 'Monthly Delivery (1st of month)']
    },
    {
      id: '03',
      stage: 'Stage 1',
      stageTitle: 'Four Village Modules',
      slug: 'agricultural-inputs',
      title: 'Agricultural Inputs',
      tagline: 'Reliable local access to certified seeds, fertilisers, pesticides & farm inputs.',
      badge: 'Farmer First',
      icon: '🌱',
      accentColor: '#16a34a',
      accentBg: '#f0fdf4',
      points: [
        'Local access to seeds, fertilisers, pesticides and other farming requirements.',
        'Connect farmers with nearby agriculture retailers and suppliers.',
        'Support product enquiries, availability checks and order coordination.',
        'Operate subject to applicable product rules, supplier verification and local requirements.',
      ],
      categories: ['Seeds & Seedlings', 'Fertilisers & Micronutrients', 'Crop Protection & Bio-Pesticides', 'Farm Tools & Drip Spares'],
      retailers: [
        { name: 'Kisan Seva Kendra & Agro Agencies', location: 'Mandal Center (3 km)', verified: true, license: 'AP-AGRI-4821', stockStatus: 'Urea, DAP, Potash In Stock' },
        { name: 'Sri Venkateswara Seeds & Pesticides', location: 'Bypass Road', verified: true, license: 'AP-AGRI-1092', stockStatus: 'Cotton & Paddy Hybrid Seeds Ready' },
        { name: 'Annapurna Bio-Fertilisers Hub', location: 'Market Yard', verified: true, license: 'AP-BIO-338', stockStatus: 'Neem Cake & Trichoderma Available' },
      ]
    },
    {
      id: '04',
      stage: 'Stage 1',
      stageTitle: 'Four Village Modules',
      slug: 'local-services',
      title: 'Local Services',
      tagline: 'Discover and book trusted local technicians for everyday rural and domestic repairs.',
      badge: 'Neighbourhood Help',
      icon: '🔧',
      accentColor: '#059669',
      accentBg: '#ecfdf5',
      points: [
        'Help residents find local service providers for practical everyday needs.',
        'Examples include plumbing, electrical work, repairs, maintenance and other neighbourhood services.',
        'Support service discovery, request submission, provider response and booking coordination.',
      ],
      serviceCategories: [
        { title: 'Electrical & Inverter Repair', icon: '⚡', examples: 'House wiring, motor switch, solar inverter fault' },
        { title: 'Plumbing & Borewell Motors', icon: '🚰', examples: 'Submersible pump servicing, pipe leakage, tap fittings' },
        { title: 'Appliance & TV Repair', icon: '📺', examples: 'Fan rewinding, mixer grinder, television, washing machine' },
        { title: 'Masonry & Carpentry', icon: '🔨', examples: 'Door lock, tile repair, farm gate, woodwork' },
      ],
      providers: [
        { name: 'Prasad Electrician & Motor Rewinding', village: 'Near Bus Stand, Kothapalli', rating: '4.9 ★ (120+ jobs)', verified: true, phone: 'Coordinates via 23ENeeDs' },
        { name: 'Siva Plumbing & Borewell Service', village: 'Mandal Center', rating: '4.8 ★ (85+ jobs)', verified: true, phone: 'Coordinates via 23ENeeDs' },
        { name: 'Raju Inverter & Home Appliance Repairs', village: 'Main Bazaar', rating: '4.7 ★ (60+ jobs)', verified: true, phone: 'Coordinates via 23ENeeDs' },
      ]
    },
  ],
  stage2: [
    {
      id: '05',
      stage: 'Stage 2',
      stageTitle: 'Five Town Expansion Modules',
      slug: 'food-delivery',
      title: 'Food & Restaurant Delivery',
      tagline: 'Town restaurant, tiffin and bakery orders with scheduled meal plans.',
      badge: 'Town Expansion',
      icon: '🍲',
      accentColor: '#ea580c',
      accentBg: '#fff7ed',
      points: [
        'Restaurant, tiffin and bakery orders.',
        'Pickup and delivery coordination.',
        'Scheduled meal plans.',
      ],
      subcategories: [
        { name: 'Daily Tiffin & Mess', desc: 'Idli, Dosa, Meals, Poori, Parotta & Chapati boxes' },
        { name: 'Local Town Restaurants', desc: 'Biryani, Andhra Meals, Curries, North Indian' },
        { name: 'Bakeries & Sweet Stalls', desc: 'Fresh bread, puffs, birthday cakes, traditional sweets' },
      ],
      mealPlans: [
        { name: 'Monthly Office / Home Lunch Plan', price: '₹2,200/mo', desc: 'Hot homestyle meals delivered Mon-Sat by 12:45 PM' },
        { name: 'Bachelor Breakfast & Dinner Combo', price: '₹3,200/mo', desc: 'Healthy tiffin morning + evening dinner box daily' },
      ]
    },
    {
      id: '06',
      stage: 'Stage 2',
      stageTitle: 'Five Town Expansion Modules',
      slug: 'healthcare',
      title: 'Doctor Consultation & Healthcare',
      tagline: 'Doctor search, clinic discovery, online consultations & family appointments.',
      badge: 'Town Healthcare',
      icon: '🩺',
      accentColor: '#0284c7',
      accentBg: '#f0f9ff',
      points: [
        'Doctor search and clinic discovery.',
        'Online consultation options where providers support them.',
        'Family appointment coordination.',
      ],
      specialists: [
        { name: 'Dr. K. Srinivas Rao, MBBS, MD', spec: 'General Physician & Diabetologist', clinic: 'Town Community Health Clinic', timing: '9:00 AM - 1:00 PM | 5:00 PM - 8:30 PM', onlineSupport: true },
        { name: 'Dr. P. Sujatha, DCH', spec: 'Pediatrician (Child Specialist)', clinic: 'Town Children Clinic', timing: '10:00 AM - 2:00 PM', onlineSupport: true },
        { name: 'Sri Sai Diagnostic & X-Ray Center', spec: 'Blood Tests, ECG & Scans', clinic: 'Hospital Road', timing: '7:00 AM - 9:00 PM', homeSampleCollection: true },
      ]
    },
    {
      id: '07',
      stage: 'Stage 2',
      stageTitle: 'Five Town Expansion Modules',
      slug: 'transport',
      title: 'Auto, Cab & Local Transport',
      tagline: 'Local ride requests, advance bookings & scheduled shared trips.',
      badge: 'Town & Rural Mobility',
      icon: '🛺',
      accentColor: '#7c3aed',
      accentBg: '#faf5ff',
      points: [
        'Local ride requests and advance bookings.',
        'Scheduled shared trips where available.',
        'Pickup and destination details with ride coordination.',
      ],
      vehicleTypes: [
        { type: 'Shared Village-Town Auto', icon: '🛺', fareNote: '₹25 - ₹40 per seat', desc: 'Fixed morning/evening scheduled trips between village stops and town bus stand' },
        { type: 'Private Auto Rickshaw', icon: '🛺', fareNote: 'Meter / Fixed distance rate', desc: 'Point-to-point private ride for emergencies or family travel' },
        { type: 'Town Mini Cab / Taxi', icon: '🚕', fareNote: 'Base fare + km', desc: 'AC/Non-AC cab for outstation hospital visits, rail stations, weddings' },
        { type: 'Agri Load Auto / Mini Truck', icon: '🛻', fareNote: 'Weight / trip based', desc: 'Transporting grain bags, vegetables or livestock to town mandi' },
      ],
      scheduledTrips: [
        { from: 'Kothapalli Village', to: 'Town Market Yard', time: '06:30 AM & 08:00 AM', seatsAvailable: 3 },
        { from: 'Venkatapuram', to: 'Town Government Hospital', time: '09:15 AM & 02:00 PM', seatsAvailable: 4 },
        { from: 'Town Main Stand', to: 'Village Ring Road', time: '05:30 PM & 07:15 PM', seatsAvailable: 5 },
      ]
    },
    {
      id: '08',
      stage: 'Stage 2',
      stageTitle: 'Five Town Expansion Modules',
      slug: 'learn-nearby',
      title: 'NeeDS Learn Nearby',
      tagline: 'Discover local tutors, coaching centers, demo classes and practical skill training.',
      badge: 'Education & Skills',
      icon: '🎓',
      accentColor: '#2563eb',
      accentBg: '#eff6ff',
      points: [
        'Local tutors and coaching discovery.',
        'Demo classes and group learning.',
        'Practical skills and nearby learning opportunities.',
      ],
      learningCategories: [
        { title: 'School Tuitions (Class 1-10 & Inter)', icon: '📚', count: '18 Local Tutors' },
        { title: 'Competitive Exams (Police, DSC, Banking)', icon: '📝', count: '4 Coaching Centers' },
        { title: 'Spoken English & Communication', icon: '🗣️', count: '3 Trainers' },
        { title: 'Practical Skills (Computer, Tailoring, Electrical)', icon: '💻', count: '6 Skill Hubs' },
      ],
      demoTutors: [
        { name: 'V. Ramanujam (M.Sc, B.Ed)', subject: 'Maths & Physics (Class 8-10 State/CBSE)', mode: 'Home Tuition / Group Demo', feeNote: 'Free 2-day demo class' },
        { name: 'Saraswathi Tailoring & Fashion Institute', subject: 'Ladies Blouse, Dress & Embroidery Making', mode: 'Hands-on Workshop', feeNote: 'Free orientation session' },
        { name: 'Youth Digital Skill Center', subject: 'MS Office, Internet & DTP Basics', mode: 'Lab Class in Town', feeNote: 'Sunday Demo Workshop' },
      ]
    },
    {
      id: '09',
      stage: 'Stage 2',
      stageTitle: 'Five Town Expansion Modules',
      slug: 'local-shopping-electronics',
      title: 'Local Shopping & Electronics',
      tagline: 'Nearby product discovery, local price comparison and store pickup coordination.',
      badge: 'Smart Town Shopping',
      icon: '📱',
      accentColor: '#0d9488',
      accentBg: '#f0fdfa',
      points: [
        'Nearby product discovery and price comparison.',
        'Product requests and reservations.',
        'Pickup coordination for local shops and electronics retailers.',
      ],
      categories: ['Smartphones & Mobile Accessories', 'Ceiling Fans & Coolers', 'Mixer Grinders & Kitchen Appliances', 'Solar Lanterns & Emergency Lights', 'TV & Sound Systems'],
      sampleShops: [
        { name: 'Sri Lakshmi Electronics & Mobile World', location: 'Gandhi Road, Town', verified: true, priceMatch: 'Matches Online Prices', pickupTime: 'Ready in 30 mins' },
        { name: 'Kalyan Home Appliances & Electricals', location: 'Opposite State Bank', verified: true, priceMatch: 'Authorized Brand Warranty', pickupTime: 'Ready in 1 hour' },
      ]
    },
  ]
}
