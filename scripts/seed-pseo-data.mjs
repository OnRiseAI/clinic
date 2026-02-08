// =============================================================================
// MeetYourClinic pSEO Data Seed Script
// Matches the ACTUAL Supabase schema (countries, cities, categories, procedures, destinations)
// =============================================================================

const SUPABASE_URL = 'https://dpewhfmgipjympxlxwij.supabase.co';
// Service role key — bypasses RLS for seeding
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZXdoZm1naXBqeW1weGx4d2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTk2OTk5NiwiZXhwIjoyMDg1NTQ1OTk2fQ.mycYLyfT1MnCM0_A2PwRZEHiUVSiU6BywWGv4y0j5Lc';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation,resolution=merge-duplicates',
};

async function upsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upsert to ${table} failed (${res.status}): ${text}`);
  }
  return res.json();
}

// =============================================================================
// 1. COUNTRIES (8 UK-relevant destinations)
// =============================================================================
const countries = [
  { name: 'Turkey', slug: 'turkey', iso_code: 'TR', region: 'Europe/Asia', currency: 'TRY', currency_symbol: '₺', language: 'Turkish', visa_required_uk: false, visa_required_us: false, flight_time_from_london_hrs: 3.5, flight_time_from_nyc_hrs: 10.5, healthcare_rating: 7.5, jci_hospitals_count: 46, mti_ranking: 3, annual_medical_tourists: 1200000, tier: 1, specialties: ['Hair Transplant', 'Dental', 'Cosmetic Surgery', 'Eye Surgery', 'Bariatric'], uk_relevant: true, us_relevant: true, description: 'Turkey is the world\'s leading medical tourism destination, offering world-class healthcare at a fraction of UK prices. Istanbul alone hosts over 700 JCI-accredited hospitals and clinics, specialising in hair transplants, dental work, cosmetic surgery, and eye care.', meta_title: 'Medical Treatment in Turkey | Prices 50-70% Less Than UK | MeetYourClinic', meta_description: 'Compare top-rated clinics in Turkey for dental, hair transplant, cosmetic surgery & more. Save 50-70% vs UK prices with JCI-accredited hospitals.', flag_emoji: '🇹🇷', status: 'published' },
  { name: 'Hungary', slug: 'hungary', iso_code: 'HU', region: 'Europe', currency: 'HUF', currency_symbol: 'Ft', language: 'Hungarian', visa_required_uk: false, visa_required_us: false, flight_time_from_london_hrs: 2.5, flight_time_from_nyc_hrs: 9.5, healthcare_rating: 7.8, jci_hospitals_count: 8, mti_ranking: 8, annual_medical_tourists: 500000, tier: 1, specialties: ['Dental', 'Hair Transplant', 'Cosmetic Surgery'], uk_relevant: true, us_relevant: false, description: 'Hungary, particularly Budapest, is Europe\'s dental capital and a top destination for UK patients seeking affordable, high-quality dental treatment.', meta_title: 'Medical Treatment in Hungary | Europe\'s Dental Capital | MeetYourClinic', meta_description: 'Budapest is Europe\'s #1 dental tourism destination. Compare accredited clinics for implants, veneers, crowns & more. Save 50-70% vs UK dental prices.', flag_emoji: '🇭🇺', status: 'published' },
  { name: 'Poland', slug: 'poland', iso_code: 'PL', region: 'Europe', currency: 'PLN', currency_symbol: 'zł', language: 'Polish', visa_required_uk: false, visa_required_us: false, flight_time_from_london_hrs: 2.5, flight_time_from_nyc_hrs: 9, healthcare_rating: 7.5, jci_hospitals_count: 5, mti_ranking: 12, annual_medical_tourists: 400000, tier: 1, specialties: ['Dental', 'Cosmetic Surgery', 'Fertility', 'Orthopaedic', 'Bariatric'], uk_relevant: true, us_relevant: false, description: 'Poland has rapidly emerged as a top medical tourism destination for UK patients, offering EU-standard healthcare at significantly lower costs.', meta_title: 'Medical Treatment in Poland | EU-Standard Care, UK-Friendly Prices | MeetYourClinic', meta_description: 'Compare top clinics in Poland for dental, cosmetic surgery, fertility & orthopaedics. EU-accredited care at 40-60% less than UK.', flag_emoji: '🇵🇱', status: 'published' },
  { name: 'Spain', slug: 'spain', iso_code: 'ES', region: 'Europe', currency: 'EUR', currency_symbol: '€', language: 'Spanish', visa_required_uk: false, visa_required_us: false, flight_time_from_london_hrs: 2.5, flight_time_from_nyc_hrs: 8, healthcare_rating: 8.5, jci_hospitals_count: 12, mti_ranking: 10, annual_medical_tourists: 350000, tier: 1, specialties: ['Fertility', 'Cosmetic Surgery', 'Dental', 'Bariatric'], uk_relevant: true, us_relevant: true, description: 'Spain is a premier medical tourism destination combining excellent healthcare with a familiar, sun-soaked environment. Spain excels in fertility treatment (IVF), cosmetic surgery, and dental care.', meta_title: 'Medical Treatment in Spain | World-Class Healthcare in the Sun | MeetYourClinic', meta_description: 'Compare top Spanish clinics for IVF, cosmetic surgery, dental & bariatric procedures. World-class care with 2-hour flights from UK.', flag_emoji: '🇪🇸', status: 'published' },
  { name: 'Czech Republic', slug: 'czech-republic', iso_code: 'CZ', region: 'Europe', currency: 'CZK', currency_symbol: 'Kč', language: 'Czech', visa_required_uk: false, visa_required_us: false, flight_time_from_london_hrs: 2, flight_time_from_nyc_hrs: 9, healthcare_rating: 7.8, jci_hospitals_count: 4, mti_ranking: 15, annual_medical_tourists: 300000, tier: 1, specialties: ['Cosmetic Surgery', 'Dental', 'Fertility', 'Bariatric'], uk_relevant: true, us_relevant: false, description: 'The Czech Republic, centred on beautiful Prague, is a leading European destination for affordable medical care with particular strengths in cosmetic surgery, dental care, and fertility treatment.', meta_title: 'Medical Treatment in Czech Republic | Prague\'s Top Clinics | MeetYourClinic', meta_description: 'Compare accredited clinics in Prague for cosmetic surgery, dental care & IVF. Save 40-60% vs UK prices. Easy 2-hour flights.', flag_emoji: '🇨🇿', status: 'published' },
  { name: 'Lithuania', slug: 'lithuania', iso_code: 'LT', region: 'Europe', currency: 'EUR', currency_symbol: '€', language: 'Lithuanian', visa_required_uk: false, visa_required_us: false, flight_time_from_london_hrs: 2.5, flight_time_from_nyc_hrs: 9.5, healthcare_rating: 7.2, jci_hospitals_count: 2, mti_ranking: 20, annual_medical_tourists: 100000, tier: 2, specialties: ['Dental', 'Eye Surgery', 'Bariatric', 'Orthopaedic'], uk_relevant: true, us_relevant: false, description: 'Lithuania is an emerging medical tourism gem, offering surprisingly advanced healthcare at some of the lowest prices in the EU.', meta_title: 'Medical Treatment in Lithuania | Hidden Gem of EU Healthcare | MeetYourClinic', meta_description: 'Discover Lithuania\'s top-rated clinics for dental, cosmetic surgery & LASIK. EU-standard care at the best prices in Europe.', flag_emoji: '🇱🇹', status: 'published' },
  { name: 'Thailand', slug: 'thailand', iso_code: 'TH', region: 'Asia', currency: 'THB', currency_symbol: '฿', language: 'Thai', visa_required_uk: false, visa_required_us: false, flight_time_from_london_hrs: 11.5, flight_time_from_nyc_hrs: 17, healthcare_rating: 8.0, jci_hospitals_count: 68, mti_ranking: 1, annual_medical_tourists: 2500000, tier: 1, specialties: ['Cosmetic Surgery', 'Dental', 'Orthopaedic', 'Health Check-Up', 'Hair Transplant'], uk_relevant: true, us_relevant: true, description: 'Thailand is Asia\'s medical tourism powerhouse, welcoming over 2.5 million medical tourists annually with JCI-accredited hospitals offering luxury amenities.', meta_title: 'Medical Treatment in Thailand | Asia\'s #1 Medical Tourism Hub | MeetYourClinic', meta_description: 'Compare JCI-accredited hospitals in Bangkok, Phuket & Chiang Mai. Save 60-80% on cosmetic surgery, dental & orthopaedics vs UK prices.', flag_emoji: '🇹🇭', status: 'published' },
  { name: 'India', slug: 'india', iso_code: 'IN', region: 'Asia', currency: 'INR', currency_symbol: '₹', language: 'English', visa_required_uk: true, visa_required_us: true, flight_time_from_london_hrs: 9, flight_time_from_nyc_hrs: 15, healthcare_rating: 7.5, jci_hospitals_count: 39, mti_ranking: 2, annual_medical_tourists: 2000000, tier: 1, specialties: ['Orthopaedic', 'Cardiac', 'Fertility', 'Cosmetic Surgery', 'Dental'], uk_relevant: true, us_relevant: true, description: 'India is a global leader in medical tourism, particularly renowned for complex surgical procedures, orthopaedics, cardiac care, and fertility treatment.', meta_title: 'Medical Treatment in India | World-Class Surgeons, Unbeatable Value | MeetYourClinic', meta_description: 'Compare top hospitals in India for orthopaedics, cardiac care, fertility & cosmetic surgery. Save 60-90% vs UK prices.', flag_emoji: '🇮🇳', status: 'published' },
];

// =============================================================================
// 2. CITIES (2-4 per country)
// =============================================================================
const citiesData = {
  TR: [
    { name: 'Istanbul', slug: 'istanbul', airport_code: 'IST', lat: 41.0082, lng: 28.9784, is_capital: false, population: 15462452, specialties: ['Hair Transplant', 'Dental', 'Cosmetic Surgery', 'Eye Surgery'], description: 'Istanbul is the epicentre of medical tourism in Turkey, home to hundreds of internationally accredited clinics.' },
    { name: 'Antalya', slug: 'antalya', airport_code: 'AYT', lat: 36.8969, lng: 30.7133, is_capital: false, population: 2548308, specialties: ['Dental', 'Cosmetic Surgery'], description: 'Antalya combines world-class dental and cosmetic surgery with Mediterranean resort recovery.' },
    { name: 'Ankara', slug: 'ankara', airport_code: 'ESB', lat: 39.9334, lng: 32.8597, is_capital: true, population: 5663322, specialties: ['Orthopaedic', 'Eye Surgery'], description: 'Ankara offers top university hospitals and specialist orthopaedic centres at competitive prices.' },
    { name: 'Izmir', slug: 'izmir', airport_code: 'ADB', lat: 38.4237, lng: 27.1428, is_capital: false, population: 4394694, specialties: ['Dental', 'Cosmetic Surgery', 'Bariatric'], description: 'Izmir provides a more relaxed alternative to Istanbul with excellent medical facilities.' },
  ],
  HU: [
    { name: 'Budapest', slug: 'budapest', airport_code: 'BUD', lat: 47.4979, lng: 19.0402, is_capital: true, population: 1752286, specialties: ['Dental', 'Cosmetic Surgery', 'Hair Transplant'], description: 'Budapest is Europe\'s dental tourism capital with over 400 dental clinics catering to international patients.' },
    { name: 'Debrecen', slug: 'debrecen', airport_code: 'DEB', lat: 47.5316, lng: 21.6273, is_capital: false, population: 203914, specialties: ['Dental'], description: 'Debrecen offers excellent dental care at even lower prices than Budapest.' },
  ],
  PL: [
    { name: 'Warsaw', slug: 'warsaw', airport_code: 'WAW', lat: 52.2297, lng: 21.0122, is_capital: true, population: 1793579, specialties: ['Cosmetic Surgery', 'Fertility', 'Orthopaedic'], description: 'Warsaw is Poland\'s medical hub with modern hospitals and specialist clinics.' },
    { name: 'Krakow', slug: 'krakow', airport_code: 'KRK', lat: 50.0647, lng: 19.9450, is_capital: false, population: 779115, specialties: ['Dental', 'Cosmetic Surgery'], description: 'Krakow combines affordable medical care with one of Europe\'s most beautiful old towns.' },
    { name: 'Wroclaw', slug: 'wroclaw', airport_code: 'WRO', lat: 51.1079, lng: 17.0385, is_capital: false, population: 642869, specialties: ['Dental', 'Bariatric'], description: 'Wroclaw is an emerging medical tourism destination with modern clinics and excellent value.' },
  ],
  ES: [
    { name: 'Barcelona', slug: 'barcelona', airport_code: 'BCN', lat: 41.3874, lng: 2.1686, is_capital: false, population: 1620343, specialties: ['Fertility', 'Cosmetic Surgery', 'Dental'], description: 'Barcelona is a leading fertility treatment centre in Europe with world-renowned IVF clinics.' },
    { name: 'Madrid', slug: 'madrid', airport_code: 'MAD', lat: 40.4168, lng: -3.7038, is_capital: true, population: 3223334, specialties: ['Fertility', 'Cosmetic Surgery', 'Orthopaedic'], description: 'Madrid offers Spain\'s largest concentration of specialist medical centres.' },
    { name: 'Marbella', slug: 'marbella', airport_code: 'AGP', lat: 36.5100, lng: -4.8826, is_capital: false, population: 147633, specialties: ['Cosmetic Surgery', 'Dental'], description: 'Marbella is a luxury cosmetic surgery destination popular with British expats.' },
    { name: 'Valencia', slug: 'valencia', airport_code: 'VLC', lat: 39.4699, lng: -0.3763, is_capital: false, population: 791413, specialties: ['Fertility', 'Dental'], description: 'Valencia offers excellent fertility and dental clinics with a Mediterranean lifestyle.' },
  ],
  CZ: [
    { name: 'Prague', slug: 'prague', airport_code: 'PRG', lat: 50.0755, lng: 14.4378, is_capital: true, population: 1309000, specialties: ['Cosmetic Surgery', 'Dental', 'Fertility', 'Bariatric'], description: 'Prague is Central Europe\'s top medical tourism destination with world-class cosmetic and dental clinics.' },
    { name: 'Brno', slug: 'brno', airport_code: 'BRQ', lat: 49.1951, lng: 16.6068, is_capital: false, population: 382405, specialties: ['Fertility', 'Dental'], description: 'Brno offers excellent fertility clinics and dental care at prices even lower than Prague.' },
  ],
  LT: [
    { name: 'Vilnius', slug: 'vilnius', airport_code: 'VNO', lat: 54.6872, lng: 25.2797, is_capital: true, population: 580020, specialties: ['Dental', 'Eye Surgery', 'Bariatric', 'Orthopaedic'], description: 'Vilnius is Lithuania\'s medical hub with modern EU-standard clinics at the best prices in Europe.' },
    { name: 'Kaunas', slug: 'kaunas', airport_code: 'KUN', lat: 54.8985, lng: 23.9036, is_capital: false, population: 315993, specialties: ['Dental', 'Eye Surgery'], description: 'Kaunas offers excellent eye surgery and dental clinics with easy access from Ryanair flights.' },
  ],
  TH: [
    { name: 'Bangkok', slug: 'bangkok', airport_code: 'BKK', lat: 13.7563, lng: 100.5018, is_capital: true, population: 10539000, specialties: ['Cosmetic Surgery', 'Dental', 'Orthopaedic', 'Health Check-Up', 'Hair Transplant'], description: 'Bangkok is the world\'s most visited medical tourism city, home to Bumrungrad and other JCI-accredited mega-hospitals.' },
    { name: 'Phuket', slug: 'phuket', airport_code: 'HKT', lat: 7.8804, lng: 98.3923, is_capital: false, population: 416582, specialties: ['Cosmetic Surgery', 'Dental'], description: 'Phuket combines medical treatment with a tropical beach recovery in Southeast Asia.' },
    { name: 'Chiang Mai', slug: 'chiang-mai', airport_code: 'CNX', lat: 18.7883, lng: 98.9853, is_capital: false, population: 131091, specialties: ['Dental', 'Wellness'], description: 'Chiang Mai offers affordable dental work and wellness retreats in a tranquil mountain setting.' },
  ],
  IN: [
    { name: 'Delhi', slug: 'delhi', airport_code: 'DEL', lat: 28.7041, lng: 77.1025, is_capital: true, population: 16787941, specialties: ['Orthopaedic', 'Cardiac', 'Fertility', 'Cosmetic Surgery'], description: 'Delhi NCR hosts India\'s top hospital chains including Fortis, Max, and Medanta.' },
    { name: 'Mumbai', slug: 'mumbai', airport_code: 'BOM', lat: 19.0760, lng: 72.8777, is_capital: false, population: 12442373, specialties: ['Orthopaedic', 'Cosmetic Surgery', 'Fertility'], description: 'Mumbai offers world-class hospitals and specialist surgeons at a fraction of Western prices.' },
    { name: 'Chennai', slug: 'chennai', airport_code: 'MAA', lat: 13.0827, lng: 80.2707, is_capital: false, population: 7088000, specialties: ['Orthopaedic', 'Cardiac', 'Eye Surgery'], description: 'Chennai is known as India\'s health capital with the highest concentration of international patients.' },
    { name: 'Bangalore', slug: 'bangalore', airport_code: 'BLR', lat: 12.9716, lng: 77.5946, is_capital: false, population: 8443675, specialties: ['Fertility', 'Cosmetic Surgery', 'Eye Surgery'], description: 'Bangalore combines India\'s tech hub with cutting-edge medical facilities.' },
  ],
};

// =============================================================================
// 3. CATEGORIES (8)
// =============================================================================
const categories = [
  { name: 'Dental', slug: 'dental', description: 'Comprehensive dental treatments abroad including implants, veneers, crowns, bridges, and cosmetic dentistry.', icon: 'tooth', meta_title: 'Dental Treatment Abroad | Compare Clinics & Prices | MeetYourClinic', meta_description: 'Compare top dental clinics abroad for implants, veneers, crowns & full mouth restoration. Save 50-70% vs UK prices.' },
  { name: 'Cosmetic Surgery', slug: 'cosmetic-surgery', description: 'Cosmetic and plastic surgery procedures abroad performed by board-certified surgeons.', icon: 'sparkles', meta_title: 'Cosmetic Surgery Abroad | Board-Certified Surgeons | MeetYourClinic', meta_description: 'Compare top cosmetic surgery clinics abroad. Rhinoplasty, BBL, breast augmentation, liposuction & more.' },
  { name: 'Hair Restoration', slug: 'hair-restoration', description: 'Advanced hair transplant and restoration procedures abroad, including FUE, DHI, and PRP therapy.', icon: 'scissors', meta_title: 'Hair Transplant Abroad | FUE, DHI & More | MeetYourClinic', meta_description: 'Compare top hair transplant clinics abroad. FUE, DHI, sapphire techniques. All-inclusive packages.' },
  { name: 'Bariatric Surgery', slug: 'bariatric-surgery', description: 'Weight loss surgery abroad including gastric sleeve, gastric bypass, and gastric band.', icon: 'scale', meta_title: 'Weight Loss Surgery Abroad | Gastric Sleeve & Bypass | MeetYourClinic', meta_description: 'Compare accredited bariatric surgery clinics abroad. Gastric sleeve, bypass & band.' },
  { name: 'Fertility Treatment', slug: 'fertility', description: 'Fertility treatment and IVF abroad at leading reproductive medicine centres.', icon: 'baby', meta_title: 'IVF & Fertility Treatment Abroad | Compare Clinics | MeetYourClinic', meta_description: 'Compare top IVF and fertility clinics abroad. Higher success rates, affordable cycles.' },
  { name: 'Orthopaedic Surgery', slug: 'orthopaedic-surgery', description: 'Orthopaedic surgery abroad including hip replacement, knee replacement, and spinal surgery.', icon: 'bone', meta_title: 'Orthopaedic Surgery Abroad | Skip NHS Waiting Lists | MeetYourClinic', meta_description: 'Compare orthopaedic clinics abroad for hip & knee replacement, spinal surgery & sports medicine.' },
  { name: 'Eye Surgery', slug: 'eye-surgery', description: 'Vision correction and eye surgery abroad including LASIK, lens replacement, and cataract surgery.', icon: 'eye', meta_title: 'LASIK & Eye Surgery Abroad | Compare Clinics | MeetYourClinic', meta_description: 'Compare top eye surgery clinics abroad for LASIK, PRK, lens replacement & cataract surgery.' },
  { name: 'Other Treatments', slug: 'other-treatments', description: 'Additional medical treatments abroad including dermatology, wellness, check-ups, and stem cell therapy.', icon: 'stethoscope', meta_title: 'Medical Treatments Abroad | Wellness & Specialist Care | MeetYourClinic', meta_description: 'Explore specialist medical treatments abroad. Dermatology, wellness, health check-ups & more.' },
];

// =============================================================================
// 4. PROCEDURES (52) — matches actual schema with extended fields
// =============================================================================
const procedures = [
  // --- DENTAL (12) ---
  { name: 'Dental Implants', slug: 'dental-implants', category_slug: 'dental', subcategory: 'Implants', description: 'Titanium dental implants to replace missing teeth permanently.', avg_duration_hrs: 1.5, recovery_days_min: 3, recovery_days_max: 7, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 26, uk_private_cost_min: 2000, uk_private_cost_max: 3000, us_cost_min: 3000, us_cost_max: 5000, is_cosmetic: false, is_elective: true, keywords: ['dental implants abroad', 'tooth implant turkey', 'dental implants hungary', 'cheap dental implants'], icon: 'tooth', sort_order: 1, costs: { TR: [400,800], HU: [500,1000], PL: [450,900], ES: [600,1200], CZ: [500,950], LT: [400,850], TH: [500,1100], IN: [300,700] } },
  { name: 'Dental Veneers', slug: 'dental-veneers', category_slug: 'dental', subcategory: 'Cosmetic Dental', description: 'Porcelain or composite veneers for a complete smile makeover.', avg_duration_hrs: 2, recovery_days_min: 1, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 500, uk_private_cost_max: 1000, us_cost_min: 800, us_cost_max: 2500, is_cosmetic: true, is_elective: true, keywords: ['veneers abroad', 'veneers turkey', 'veneers hungary', 'cheap veneers'], icon: 'tooth', sort_order: 2, costs: { TR: [150,350], HU: [250,450], PL: [200,400], ES: [300,500], CZ: [250,450], LT: [180,350], TH: [200,400], IN: [100,250] } },
  { name: 'Dental Crowns', slug: 'dental-crowns', category_slug: 'dental', subcategory: 'Restorative', description: 'Custom porcelain, zirconia, or ceramic crowns to restore damaged teeth.', avg_duration_hrs: 1.5, recovery_days_min: 1, recovery_days_max: 2, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 12, uk_private_cost_min: 400, uk_private_cost_max: 800, us_cost_min: 800, us_cost_max: 1500, is_cosmetic: false, is_elective: true, keywords: ['dental crowns abroad', 'crowns turkey', 'crowns hungary'], icon: 'tooth', sort_order: 3, costs: { TR: [100,250], HU: [150,350], PL: [120,300], ES: [200,400], CZ: [150,300], LT: [100,250], TH: [120,300], IN: [60,150] } },
  { name: 'Dental Bridges', slug: 'dental-bridges', category_slug: 'dental', subcategory: 'Restorative', description: 'Fixed dental bridges to replace one or more missing teeth.', avg_duration_hrs: 2, recovery_days_min: 1, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 12, uk_private_cost_min: 600, uk_private_cost_max: 1500, us_cost_min: 1000, us_cost_max: 3000, is_cosmetic: false, is_elective: true, keywords: ['dental bridge abroad', 'bridges turkey'], icon: 'tooth', sort_order: 4, costs: { TR: [150,400], HU: [200,500], PL: [180,450] } },
  { name: 'Full Mouth Dental Implants', slug: 'full-mouth-dental-implants', category_slug: 'dental', subcategory: 'Implants', description: 'Complete full mouth rehabilitation with All-on-4 or All-on-6 implant-supported dentures.', avg_duration_hrs: 4, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 52, uk_private_cost_min: 10000, uk_private_cost_max: 20000, us_cost_min: 20000, us_cost_max: 40000, is_cosmetic: false, is_elective: true, keywords: ['all on 4 abroad', 'full mouth implants turkey', 'all on 6 hungary'], icon: 'tooth', sort_order: 5, costs: { TR: [3000,6000], HU: [4000,8000], PL: [3500,7000], ES: [5000,10000], TH: [4000,8000], IN: [2500,5000] } },
  { name: 'Teeth Whitening', slug: 'teeth-whitening', category_slug: 'dental', subcategory: 'Cosmetic Dental', description: 'Professional in-office teeth whitening using LED or laser technology.', avg_duration_hrs: 1, recovery_days_min: 0, recovery_days_max: 1, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: null, uk_private_cost_min: 300, uk_private_cost_max: 700, us_cost_min: 300, us_cost_max: 800, is_cosmetic: true, is_elective: true, keywords: ['teeth whitening abroad'], icon: 'tooth', sort_order: 6, costs: { TR: [100,250], HU: [150,300], PL: [100,250], TH: [100,200] } },
  { name: 'Root Canal Treatment', slug: 'root-canal-treatment', category_slug: 'dental', subcategory: 'Endodontics', description: 'Endodontic treatment to save an infected or damaged tooth.', avg_duration_hrs: 1.5, recovery_days_min: 1, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 8, uk_private_cost_min: 300, uk_private_cost_max: 800, us_cost_min: 700, us_cost_max: 1500, is_cosmetic: false, is_elective: false, keywords: ['root canal abroad'], icon: 'tooth', sort_order: 7, costs: { TR: [80,200], HU: [100,300], PL: [80,250] } },
  { name: 'Dentures', slug: 'dentures', category_slug: 'dental', subcategory: 'Restorative', description: 'Custom-made full or partial dentures crafted from premium materials.', avg_duration_hrs: 2, recovery_days_min: 1, recovery_days_max: 7, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: 12, uk_private_cost_min: 500, uk_private_cost_max: 1500, us_cost_min: 800, us_cost_max: 2000, is_cosmetic: false, is_elective: true, keywords: ['dentures abroad'], icon: 'tooth', sort_order: 8, costs: { TR: [200,500], HU: [300,600], PL: [250,500], IN: [100,300] } },
  { name: 'Gum Treatment', slug: 'gum-treatment', category_slug: 'dental', subcategory: 'Periodontics', description: 'Periodontal treatments including deep cleaning, gum grafting, and laser therapy.', avg_duration_hrs: 1, recovery_days_min: 1, recovery_days_max: 5, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 8, uk_private_cost_min: 400, uk_private_cost_max: 1000, us_cost_min: 500, us_cost_max: 1500, is_cosmetic: false, is_elective: false, keywords: ['gum treatment abroad'], icon: 'tooth', sort_order: 9, costs: { TR: [100,300], HU: [150,400] } },
  { name: 'Orthodontics', slug: 'orthodontics', category_slug: 'dental', subcategory: 'Orthodontics', description: 'Teeth straightening with braces, clear aligners, and lingual braces.', avg_duration_hrs: 1, recovery_days_min: 0, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: 52, uk_private_cost_min: 2500, uk_private_cost_max: 6000, us_cost_min: 3000, us_cost_max: 8000, is_cosmetic: true, is_elective: true, keywords: ['braces abroad', 'invisalign abroad'], icon: 'tooth', sort_order: 10, costs: { TR: [800,2000], HU: [1000,2500], ES: [1200,3000] } },
  { name: 'Smile Makeover', slug: 'smile-makeover', category_slug: 'dental', subcategory: 'Cosmetic Dental', description: 'Comprehensive smile transformation combining veneers, whitening, implants, and gum contouring.', avg_duration_hrs: 4, recovery_days_min: 3, recovery_days_max: 7, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 15000, us_cost_min: 8000, us_cost_max: 25000, is_cosmetic: true, is_elective: true, keywords: ['smile makeover abroad', 'hollywood smile turkey'], icon: 'tooth', sort_order: 11, costs: { TR: [1500,5000], HU: [2000,6000], TH: [1800,5000] } },
  { name: 'Wisdom Tooth Extraction', slug: 'wisdom-tooth-extraction', category_slug: 'dental', subcategory: 'Oral Surgery', description: 'Surgical removal of impacted or problematic wisdom teeth.', avg_duration_hrs: 1, recovery_days_min: 2, recovery_days_max: 7, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 18, uk_private_cost_min: 200, uk_private_cost_max: 500, us_cost_min: 300, us_cost_max: 600, is_cosmetic: false, is_elective: false, keywords: ['wisdom tooth removal abroad'], icon: 'tooth', sort_order: 12, costs: { TR: [50,150], HU: [80,200], PL: [60,180] } },

  // --- COSMETIC SURGERY (14) ---
  { name: 'Rhinoplasty', slug: 'rhinoplasty', category_slug: 'cosmetic-surgery', subcategory: 'Facial', description: 'Surgical nose reshaping to improve proportions or correct breathing issues.', avg_duration_hrs: 2.5, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 8000, us_cost_min: 8000, us_cost_max: 15000, is_cosmetic: true, is_elective: true, keywords: ['rhinoplasty abroad', 'nose job turkey', 'rhinoplasty czech republic'], icon: 'sparkles', sort_order: 1, costs: { TR: [2000,4000], CZ: [2500,4500], PL: [2200,4000], ES: [3000,5500], TH: [2000,4500], IN: [1500,3000] } },
  { name: 'Breast Augmentation', slug: 'breast-augmentation', category_slug: 'cosmetic-surgery', subcategory: 'Breast', description: 'Breast enlargement with silicone or saline implants.', avg_duration_hrs: 2, recovery_days_min: 7, recovery_days_max: 21, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 8000, us_cost_min: 6000, us_cost_max: 12000, is_cosmetic: true, is_elective: true, keywords: ['breast augmentation abroad', 'breast implants turkey'], icon: 'sparkles', sort_order: 2, costs: { TR: [2500,4500], CZ: [2800,4500], PL: [2500,4000], ES: [3500,5500], TH: [2500,5000] } },
  { name: 'Breast Lift', slug: 'breast-lift', category_slug: 'cosmetic-surgery', subcategory: 'Breast', description: 'Mastopexy surgery to lift and reshape sagging breasts.', avg_duration_hrs: 2.5, recovery_days_min: 7, recovery_days_max: 21, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 7500, us_cost_min: 6000, us_cost_max: 10000, is_cosmetic: true, is_elective: true, keywords: ['breast lift abroad'], icon: 'sparkles', sort_order: 3, costs: { TR: [2000,4000], CZ: [2500,4000], PL: [2200,3800], TH: [2000,4000] } },
  { name: 'Breast Reduction', slug: 'breast-reduction', category_slug: 'cosmetic-surgery', subcategory: 'Breast', description: 'Surgical breast reduction to alleviate back pain and improve body proportions.', avg_duration_hrs: 3, recovery_days_min: 7, recovery_days_max: 21, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 26, uk_private_cost_min: 5500, uk_private_cost_max: 8000, us_cost_min: 6000, us_cost_max: 12000, is_cosmetic: false, is_elective: true, keywords: ['breast reduction abroad'], icon: 'sparkles', sort_order: 4, costs: { TR: [2000,4000], PL: [2200,4000], CZ: [2500,4200], TH: [2000,4000] } },
  { name: 'Liposuction', slug: 'liposuction', category_slug: 'cosmetic-surgery', subcategory: 'Body', description: 'Fat removal surgery using VASER, tumescent, or laser-assisted techniques.', avg_duration_hrs: 2, recovery_days_min: 5, recovery_days_max: 14, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 3000, uk_private_cost_max: 6000, us_cost_min: 4000, us_cost_max: 10000, is_cosmetic: true, is_elective: true, keywords: ['liposuction abroad', 'vaser lipo turkey'], icon: 'sparkles', sort_order: 5, costs: { TR: [1500,3500], PL: [1800,3500], CZ: [2000,3800], ES: [2500,4500], TH: [1500,3500] } },
  { name: 'Tummy Tuck', slug: 'tummy-tuck', category_slug: 'cosmetic-surgery', subcategory: 'Body', description: 'Abdominoplasty to remove excess skin and tighten abdominal muscles.', avg_duration_hrs: 3, recovery_days_min: 14, recovery_days_max: 28, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 9000, us_cost_min: 8000, us_cost_max: 15000, is_cosmetic: true, is_elective: true, keywords: ['tummy tuck abroad', 'abdominoplasty turkey'], icon: 'sparkles', sort_order: 6, costs: { TR: [2500,5000], PL: [2800,5000], CZ: [3000,5000], ES: [3500,6000], TH: [2500,5000], IN: [2000,4000] } },
  { name: 'BBL (Brazilian Butt Lift)', slug: 'bbl', category_slug: 'cosmetic-surgery', subcategory: 'Body', description: 'Brazilian Butt Lift using autologous fat transfer to enhance buttock volume.', avg_duration_hrs: 3.5, recovery_days_min: 14, recovery_days_max: 42, risk_level: 'high', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 6000, uk_private_cost_max: 10000, us_cost_min: 8000, us_cost_max: 15000, is_cosmetic: true, is_elective: true, keywords: ['bbl abroad', 'bbl turkey', 'brazilian butt lift'], icon: 'sparkles', sort_order: 7, costs: { TR: [2500,5000], PL: [3000,5500], CZ: [3000,5500], ES: [4000,7000], TH: [3000,6000] } },
  { name: 'Facelift', slug: 'facelift', category_slug: 'cosmetic-surgery', subcategory: 'Facial', description: 'Surgical facial rejuvenation including full, mini, and deep plane facelift.', avg_duration_hrs: 4, recovery_days_min: 14, recovery_days_max: 28, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 7000, uk_private_cost_max: 12000, us_cost_min: 10000, us_cost_max: 20000, is_cosmetic: true, is_elective: true, keywords: ['facelift abroad', 'facelift turkey'], icon: 'sparkles', sort_order: 8, costs: { TR: [3000,6000], ES: [4000,7000], CZ: [3500,6000], TH: [3000,6000] } },
  { name: 'Blepharoplasty', slug: 'blepharoplasty', category_slug: 'cosmetic-surgery', subcategory: 'Facial', description: 'Eyelid surgery to remove excess skin and fat from upper and/or lower eyelids.', avg_duration_hrs: 1.5, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 3000, uk_private_cost_max: 5000, us_cost_min: 4000, us_cost_max: 8000, is_cosmetic: true, is_elective: true, keywords: ['eyelid surgery abroad', 'blepharoplasty turkey'], icon: 'sparkles', sort_order: 9, costs: { TR: [1200,2500], CZ: [1500,3000], PL: [1200,2500], TH: [1200,2800] } },
  { name: 'Brow Lift', slug: 'brow-lift', category_slug: 'cosmetic-surgery', subcategory: 'Facial', description: 'Forehead lift to raise drooping brows and smooth forehead wrinkles.', avg_duration_hrs: 1.5, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'low', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 4000, uk_private_cost_max: 6000, us_cost_min: 5000, us_cost_max: 10000, is_cosmetic: true, is_elective: true, keywords: ['brow lift abroad'], icon: 'sparkles', sort_order: 10, costs: { TR: [1500,3000], CZ: [2000,3500], TH: [1500,3000] } },
  { name: 'Neck Lift', slug: 'neck-lift', category_slug: 'cosmetic-surgery', subcategory: 'Facial', description: 'Surgical neck rejuvenation for turkey neck, double chin, and neck banding.', avg_duration_hrs: 2, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 8000, us_cost_min: 6000, us_cost_max: 12000, is_cosmetic: true, is_elective: true, keywords: ['neck lift abroad'], icon: 'sparkles', sort_order: 11, costs: { TR: [2000,4000], CZ: [2500,4500], TH: [2000,4000] } },
  { name: 'Otoplasty', slug: 'otoplasty', category_slug: 'cosmetic-surgery', subcategory: 'Facial', description: 'Ear reshaping surgery for prominent, protruding, or asymmetrical ears.', avg_duration_hrs: 1.5, recovery_days_min: 5, recovery_days_max: 10, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 26, uk_private_cost_min: 2500, uk_private_cost_max: 4000, us_cost_min: 3000, us_cost_max: 6000, is_cosmetic: true, is_elective: true, keywords: ['ear pinning abroad', 'otoplasty turkey'], icon: 'sparkles', sort_order: 12, costs: { TR: [1000,2000], PL: [1200,2200], CZ: [1200,2300] } },
  { name: 'Mummy Makeover', slug: 'mummy-makeover', category_slug: 'cosmetic-surgery', subcategory: 'Body', description: 'Combination package: tummy tuck, breast lift/augmentation, and liposuction.', avg_duration_hrs: 5, recovery_days_min: 14, recovery_days_max: 42, risk_level: 'high', anesthesia_type: 'general', nhs_wait_weeks: null, uk_private_cost_min: 10000, uk_private_cost_max: 18000, us_cost_min: 15000, us_cost_max: 25000, is_cosmetic: true, is_elective: true, keywords: ['mummy makeover abroad', 'mommy makeover turkey'], icon: 'sparkles', sort_order: 13, costs: { TR: [4000,8000], PL: [5000,8500], CZ: [5000,9000], TH: [4500,8500] } },
  { name: 'Gynaecomastia Surgery', slug: 'gynaecomastia-surgery', category_slug: 'cosmetic-surgery', subcategory: 'Body', description: 'Male breast reduction surgery for enlarged breast tissue in men.', avg_duration_hrs: 1.5, recovery_days_min: 5, recovery_days_max: 14, risk_level: 'low', anesthesia_type: 'general', nhs_wait_weeks: 26, uk_private_cost_min: 3500, uk_private_cost_max: 5500, us_cost_min: 4000, us_cost_max: 8000, is_cosmetic: true, is_elective: true, keywords: ['gynaecomastia surgery abroad', 'male breast reduction'], icon: 'sparkles', sort_order: 14, costs: { TR: [1500,3000], PL: [1800,3200], TH: [1500,3000], IN: [1000,2000] } },

  // --- HAIR RESTORATION (4) ---
  { name: 'FUE Hair Transplant', slug: 'fue-hair-transplant', category_slug: 'hair-restoration', subcategory: 'Hair Transplant', description: 'Follicular Unit Extraction — the gold standard hair transplant technique.', avg_duration_hrs: 6, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 10000, us_cost_min: 8000, us_cost_max: 15000, is_cosmetic: true, is_elective: true, keywords: ['fue hair transplant turkey', 'hair transplant abroad', 'fue istanbul'], icon: 'scissors', sort_order: 1, costs: { TR: [1200,2500], HU: [2000,4000], PL: [1800,3500], ES: [3000,5000], TH: [2000,4000], IN: [1000,2000] } },
  { name: 'DHI Hair Transplant', slug: 'dhi-hair-transplant', category_slug: 'hair-restoration', subcategory: 'Hair Transplant', description: 'Direct Hair Implantation using the Choi implanter pen.', avg_duration_hrs: 7, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 6000, uk_private_cost_max: 12000, us_cost_min: 10000, us_cost_max: 20000, is_cosmetic: true, is_elective: true, keywords: ['dhi hair transplant turkey', 'dhi vs fue'], icon: 'scissors', sort_order: 2, costs: { TR: [1500,3000], HU: [2500,4500], ES: [3500,6000], TH: [2500,4500] } },
  { name: 'Beard Transplant', slug: 'beard-transplant', category_slug: 'hair-restoration', subcategory: 'Hair Transplant', description: 'Hair transplant to facial area for patchy beards and moustaches.', avg_duration_hrs: 4, recovery_days_min: 5, recovery_days_max: 10, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 4000, uk_private_cost_max: 7000, us_cost_min: 5000, us_cost_max: 10000, is_cosmetic: true, is_elective: true, keywords: ['beard transplant turkey', 'beard transplant abroad'], icon: 'scissors', sort_order: 3, costs: { TR: [1000,2000], IN: [800,1500], TH: [1500,3000] } },
  { name: 'Eyebrow Transplant', slug: 'eyebrow-transplant', category_slug: 'hair-restoration', subcategory: 'Hair Transplant', description: 'Hair transplant to restore or enhance thin or missing eyebrows.', avg_duration_hrs: 3, recovery_days_min: 5, recovery_days_max: 10, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 3000, uk_private_cost_max: 5000, us_cost_min: 4000, us_cost_max: 7000, is_cosmetic: true, is_elective: true, keywords: ['eyebrow transplant turkey', 'eyebrow restoration'], icon: 'scissors', sort_order: 4, costs: { TR: [800,1500], IN: [500,1000], TH: [1200,2000] } },

  // --- BARIATRIC SURGERY (4) ---
  { name: 'Gastric Sleeve', slug: 'gastric-sleeve', category_slug: 'bariatric-surgery', subcategory: 'Weight Loss', description: 'Laparoscopic sleeve gastrectomy removing ~80% of the stomach.', avg_duration_hrs: 1.5, recovery_days_min: 5, recovery_days_max: 14, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 52, uk_private_cost_min: 7000, uk_private_cost_max: 11000, us_cost_min: 10000, us_cost_max: 20000, is_cosmetic: false, is_elective: true, keywords: ['gastric sleeve abroad', 'gastric sleeve turkey', 'weight loss surgery abroad'], icon: 'scale', sort_order: 1, costs: { TR: [2500,4500], PL: [3000,5000], CZ: [3500,5500], LT: [2800,4500], TH: [3500,6000], IN: [2000,4000] } },
  { name: 'Gastric Bypass', slug: 'gastric-bypass', category_slug: 'bariatric-surgery', subcategory: 'Weight Loss', description: 'Roux-en-Y gastric bypass — gold standard for BMI over 40.', avg_duration_hrs: 2.5, recovery_days_min: 7, recovery_days_max: 14, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 52, uk_private_cost_min: 8000, uk_private_cost_max: 13000, us_cost_min: 15000, us_cost_max: 30000, is_cosmetic: false, is_elective: true, keywords: ['gastric bypass abroad', 'gastric bypass turkey'], icon: 'scale', sort_order: 2, costs: { TR: [3500,6000], PL: [4000,6500], CZ: [4500,7000], LT: [3500,5500], TH: [4500,7500], IN: [2500,5000] } },
  { name: 'Gastric Band', slug: 'gastric-band', category_slug: 'bariatric-surgery', subcategory: 'Weight Loss', description: 'Adjustable gastric band — reversible weight loss procedure.', avg_duration_hrs: 1, recovery_days_min: 3, recovery_days_max: 7, risk_level: 'low', anesthesia_type: 'general', nhs_wait_weeks: 52, uk_private_cost_min: 5000, uk_private_cost_max: 8000, us_cost_min: 8000, us_cost_max: 15000, is_cosmetic: false, is_elective: true, keywords: ['gastric band abroad', 'lap band surgery'], icon: 'scale', sort_order: 3, costs: { TR: [2000,3500], PL: [2500,4000], CZ: [2800,4200] } },
  { name: 'Gastric Balloon', slug: 'gastric-balloon', category_slug: 'bariatric-surgery', subcategory: 'Weight Loss', description: 'Non-surgical endoscopic balloon for weight loss.', avg_duration_hrs: 0.5, recovery_days_min: 1, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'sedation', nhs_wait_weeks: null, uk_private_cost_min: 3000, uk_private_cost_max: 5000, us_cost_min: 4000, us_cost_max: 8000, is_cosmetic: false, is_elective: true, keywords: ['gastric balloon abroad'], icon: 'scale', sort_order: 4, costs: { TR: [1500,2500], PL: [1800,3000], ES: [2500,4000], CZ: [2000,3200] } },

  // --- FERTILITY TREATMENT (5) ---
  { name: 'IVF Treatment', slug: 'ivf-treatment', category_slug: 'fertility', subcategory: 'IVF', description: 'Complete IVF cycle — stimulation, retrieval, fertilisation, and transfer.', avg_duration_hrs: 2, recovery_days_min: 1, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'sedation', nhs_wait_weeks: 104, uk_private_cost_min: 5000, uk_private_cost_max: 8000, us_cost_min: 12000, us_cost_max: 25000, is_cosmetic: false, is_elective: true, keywords: ['ivf abroad', 'ivf spain', 'ivf czech republic', 'cheap ivf'], icon: 'baby', sort_order: 1, costs: { ES: [3500,6000], CZ: [2500,4500], PL: [2500,4000], IN: [2000,4000], TH: [3000,5500] } },
  { name: 'Egg Donation IVF', slug: 'egg-donation-ivf', category_slug: 'fertility', subcategory: 'IVF', description: 'IVF using donor eggs for low ovarian reserve or advanced age.', avg_duration_hrs: 2, recovery_days_min: 1, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'sedation', nhs_wait_weeks: null, uk_private_cost_min: 8000, uk_private_cost_max: 12000, us_cost_min: 20000, us_cost_max: 40000, is_cosmetic: false, is_elective: true, keywords: ['egg donation ivf abroad', 'egg donor spain'], icon: 'baby', sort_order: 2, costs: { ES: [5000,9000], CZ: [4000,7000], PL: [3500,6000], IN: [3000,5000] } },
  { name: 'IUI Treatment', slug: 'iui-treatment', category_slug: 'fertility', subcategory: 'Insemination', description: 'Intrauterine insemination — first-line fertility treatment.', avg_duration_hrs: 0.5, recovery_days_min: 0, recovery_days_max: 1, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: 52, uk_private_cost_min: 1500, uk_private_cost_max: 2500, us_cost_min: 2000, us_cost_max: 4000, is_cosmetic: false, is_elective: true, keywords: ['iui abroad'], icon: 'baby', sort_order: 3, costs: { ES: [800,1500], CZ: [600,1200], PL: [500,1000] } },
  { name: 'Embryo Freezing', slug: 'embryo-freezing', category_slug: 'fertility', subcategory: 'Preservation', description: 'Cryopreservation of embryos for future use.', avg_duration_hrs: 1, recovery_days_min: 0, recovery_days_max: 1, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: null, uk_private_cost_min: 2500, uk_private_cost_max: 4000, us_cost_min: 3000, us_cost_max: 6000, is_cosmetic: false, is_elective: true, keywords: ['embryo freezing abroad', 'fertility preservation'], icon: 'baby', sort_order: 4, costs: { ES: [1500,3000], CZ: [1200,2500], PL: [1000,2000] } },
  { name: 'PGT Genetic Testing', slug: 'pgt-genetic-testing', category_slug: 'fertility', subcategory: 'Diagnostics', description: 'Pre-implantation genetic testing during IVF — PGT-A, PGT-M, PGT-SR.', avg_duration_hrs: 0, recovery_days_min: 0, recovery_days_max: 0, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: null, uk_private_cost_min: 3000, uk_private_cost_max: 5000, us_cost_min: 3000, us_cost_max: 6000, is_cosmetic: false, is_elective: true, keywords: ['pgt testing abroad', 'pgs ivf'], icon: 'baby', sort_order: 5, costs: { ES: [2000,4000], CZ: [1500,3000], TH: [2000,4000] } },

  // --- ORTHOPAEDIC SURGERY (5) ---
  { name: 'Hip Replacement', slug: 'hip-replacement', category_slug: 'orthopaedic-surgery', subcategory: 'Joint Replacement', description: 'Total or partial hip replacement to relieve pain and restore mobility.', avg_duration_hrs: 2, recovery_days_min: 14, recovery_days_max: 42, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 52, uk_private_cost_min: 11000, uk_private_cost_max: 16000, us_cost_min: 30000, us_cost_max: 50000, is_cosmetic: false, is_elective: true, keywords: ['hip replacement abroad', 'hip surgery turkey', 'skip nhs waiting list'], icon: 'bone', sort_order: 1, costs: { TR: [4000,7000], PL: [4500,7500], CZ: [5000,8000], ES: [6000,10000], LT: [4000,6500], TH: [5000,9000], IN: [3000,6000] } },
  { name: 'Knee Replacement', slug: 'knee-replacement', category_slug: 'orthopaedic-surgery', subcategory: 'Joint Replacement', description: 'Total or partial knee replacement for arthritis or degenerative disease.', avg_duration_hrs: 2, recovery_days_min: 14, recovery_days_max: 42, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 52, uk_private_cost_min: 10000, uk_private_cost_max: 15000, us_cost_min: 25000, us_cost_max: 50000, is_cosmetic: false, is_elective: true, keywords: ['knee replacement abroad', 'knee surgery india', 'skip nhs waiting list knee'], icon: 'bone', sort_order: 2, costs: { TR: [4000,7000], PL: [4500,7500], CZ: [5000,8000], ES: [6000,10000], LT: [4000,6500], TH: [5000,9000], IN: [3000,6000] } },
  { name: 'ACL Reconstruction', slug: 'acl-reconstruction', category_slug: 'orthopaedic-surgery', subcategory: 'Sports Medicine', description: 'Arthroscopic ACL reconstruction for ligament injury.', avg_duration_hrs: 1.5, recovery_days_min: 14, recovery_days_max: 56, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 26, uk_private_cost_min: 6000, uk_private_cost_max: 10000, us_cost_min: 15000, us_cost_max: 30000, is_cosmetic: false, is_elective: true, keywords: ['acl surgery abroad', 'acl reconstruction turkey'], icon: 'bone', sort_order: 3, costs: { TR: [3000,5000], PL: [3000,5500], CZ: [3500,5500], TH: [3500,6000], IN: [2000,4000] } },
  { name: 'Spinal Surgery', slug: 'spinal-surgery', category_slug: 'orthopaedic-surgery', subcategory: 'Spine', description: 'Discectomy, laminectomy, spinal fusion, and disc replacement.', avg_duration_hrs: 3, recovery_days_min: 14, recovery_days_max: 56, risk_level: 'high', anesthesia_type: 'general', nhs_wait_weeks: 52, uk_private_cost_min: 12000, uk_private_cost_max: 25000, us_cost_min: 30000, us_cost_max: 80000, is_cosmetic: false, is_elective: true, keywords: ['spinal surgery abroad', 'spine surgery india'], icon: 'bone', sort_order: 4, costs: { TR: [5000,10000], IN: [3500,8000], TH: [6000,12000], PL: [5000,9000] } },
  { name: 'Shoulder Surgery', slug: 'shoulder-surgery', category_slug: 'orthopaedic-surgery', subcategory: 'Sports Medicine', description: 'Rotator cuff repair, shoulder replacement, and arthroscopic procedures.', avg_duration_hrs: 2, recovery_days_min: 14, recovery_days_max: 42, risk_level: 'medium', anesthesia_type: 'general', nhs_wait_weeks: 26, uk_private_cost_min: 6000, uk_private_cost_max: 10000, us_cost_min: 15000, us_cost_max: 30000, is_cosmetic: false, is_elective: true, keywords: ['shoulder surgery abroad', 'rotator cuff repair'], icon: 'bone', sort_order: 5, costs: { TR: [3000,5500], PL: [3000,5500], TH: [3500,6000], IN: [2000,4500] } },

  // --- EYE SURGERY (3) ---
  { name: 'LASIK Eye Surgery', slug: 'lasik-eye-surgery', category_slug: 'eye-surgery', subcategory: 'Laser', description: 'Laser eye surgery for short-sightedness, long-sightedness, and astigmatism.', avg_duration_hrs: 0.5, recovery_days_min: 1, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'topical', nhs_wait_weeks: null, uk_private_cost_min: 2500, uk_private_cost_max: 4000, us_cost_min: 3000, us_cost_max: 5000, is_cosmetic: false, is_elective: true, keywords: ['lasik abroad', 'laser eye surgery turkey', 'lasik prague'], icon: 'eye', sort_order: 1, costs: { TR: [800,1500], PL: [1000,1800], CZ: [1000,1800], LT: [800,1400], TH: [1000,2000], IN: [500,1000] } },
  { name: 'Lens Replacement', slug: 'lens-replacement', category_slug: 'eye-surgery', subcategory: 'Refractive', description: 'Refractive lens exchange with artificial intraocular lens.', avg_duration_hrs: 0.5, recovery_days_min: 1, recovery_days_max: 7, risk_level: 'low', anesthesia_type: 'topical', nhs_wait_weeks: null, uk_private_cost_min: 3000, uk_private_cost_max: 5000, us_cost_min: 4000, us_cost_max: 8000, is_cosmetic: false, is_elective: true, keywords: ['lens replacement abroad'], icon: 'eye', sort_order: 2, costs: { TR: [1200,2500], PL: [1500,2800], CZ: [1500,2800], LT: [1200,2200], TH: [1500,3000] } },
  { name: 'Cataract Surgery', slug: 'cataract-surgery', category_slug: 'eye-surgery', subcategory: 'Cataract', description: 'Phacoemulsification cataract removal with premium IOL implant.', avg_duration_hrs: 0.5, recovery_days_min: 1, recovery_days_max: 7, risk_level: 'low', anesthesia_type: 'topical', nhs_wait_weeks: 18, uk_private_cost_min: 2500, uk_private_cost_max: 4000, us_cost_min: 3500, us_cost_max: 6000, is_cosmetic: false, is_elective: true, keywords: ['cataract surgery abroad'], icon: 'eye', sort_order: 3, costs: { TR: [1000,2000], PL: [1200,2200], CZ: [1200,2200], LT: [1000,1800], TH: [1200,2500], IN: [600,1200] } },

  // --- OTHER TREATMENTS (5) ---
  { name: 'Health Check-Up', slug: 'health-check-up', category_slug: 'other-treatments', subcategory: 'Wellness', description: 'Comprehensive executive health screening packages.', avg_duration_hrs: 4, recovery_days_min: 0, recovery_days_max: 0, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: null, uk_private_cost_min: 500, uk_private_cost_max: 2000, us_cost_min: 1000, us_cost_max: 5000, is_cosmetic: false, is_elective: true, keywords: ['health check abroad', 'full body check-up'], icon: 'stethoscope', sort_order: 1, costs: { TR: [200,500], TH: [300,800], IN: [150,400] } },
  { name: 'Dermatology Treatment', slug: 'dermatology-treatment', category_slug: 'other-treatments', subcategory: 'Dermatology', description: 'Specialist dermatology consultations and treatments.', avg_duration_hrs: 1, recovery_days_min: 0, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: 18, uk_private_cost_min: 500, uk_private_cost_max: 2000, us_cost_min: 300, us_cost_max: 2000, is_cosmetic: false, is_elective: true, keywords: ['dermatology abroad'], icon: 'stethoscope', sort_order: 2, costs: { TR: [200,800], ES: [300,1000], TH: [200,600] } },
  { name: 'Physiotherapy & Rehabilitation', slug: 'physiotherapy-rehabilitation', category_slug: 'other-treatments', subcategory: 'Rehab', description: 'Intensive physiotherapy and rehabilitation programmes.', avg_duration_hrs: 1, recovery_days_min: 0, recovery_days_max: 0, risk_level: 'low', anesthesia_type: 'none', nhs_wait_weeks: 12, uk_private_cost_min: 60, uk_private_cost_max: 200, us_cost_min: 100, us_cost_max: 300, is_cosmetic: false, is_elective: true, keywords: ['physiotherapy abroad'], icon: 'stethoscope', sort_order: 3, costs: { TR: [50,150], PL: [40,120], TH: [30,100] } },
  { name: 'Stem Cell Therapy', slug: 'stem-cell-therapy', category_slug: 'other-treatments', subcategory: 'Regenerative', description: 'Regenerative stem cell treatments for joints, arthritis, and anti-ageing.', avg_duration_hrs: 2, recovery_days_min: 1, recovery_days_max: 7, risk_level: 'medium', anesthesia_type: 'local', nhs_wait_weeks: null, uk_private_cost_min: 5000, uk_private_cost_max: 12000, us_cost_min: 5000, us_cost_max: 15000, is_cosmetic: false, is_elective: true, keywords: ['stem cell therapy abroad'], icon: 'stethoscope', sort_order: 4, costs: { TR: [2000,5000], TH: [3000,8000], IN: [1500,4000] } },
  { name: 'Varicose Vein Treatment', slug: 'varicose-vein-treatment', category_slug: 'other-treatments', subcategory: 'Vascular', description: 'Laser ablation, radiofrequency ablation, and foam sclerotherapy.', avg_duration_hrs: 1, recovery_days_min: 0, recovery_days_max: 3, risk_level: 'low', anesthesia_type: 'local', nhs_wait_weeks: 18, uk_private_cost_min: 2000, uk_private_cost_max: 4000, us_cost_min: 3000, us_cost_max: 6000, is_cosmetic: false, is_elective: true, keywords: ['varicose vein treatment abroad'], icon: 'stethoscope', sort_order: 5, costs: { TR: [800,1500], PL: [1000,1800], LT: [800,1500] } },
];

// =============================================================================
// MAIN SEED
// =============================================================================
async function seed() {
  console.log('=== MeetYourClinic pSEO Data Seed ===\n');

  // 1. COUNTRIES
  console.log('1/5 Seeding Countries...');
  const countryResults = await upsert('countries', countries);
  const countryMap = {};
  for (const c of countryResults) {
    countryMap[c.iso_code] = c.id;
    console.log(`  ✓ ${c.flag_emoji} ${c.name} (${c.iso_code}) → ${c.id.slice(0,8)}...`);
  }
  console.log(`  Done: ${countryResults.length} countries\n`);

  // 2. CITIES
  console.log('2/5 Seeding Cities...');
  const allCities = [];
  for (const [iso, cities] of Object.entries(citiesData)) {
    const countryId = countryMap[iso];
    if (!countryId) continue;
    for (const city of cities) {
      allCities.push({ ...city, country_id: countryId, status: 'published' });
    }
  }
  const cityResults = await upsert('cities', allCities);
  const cityMap = {};
  for (const c of cityResults) {
    cityMap[c.slug] = c.id;
    console.log(`  ✓ ${c.name} (${c.airport_code}) → ${c.id.slice(0,8)}...`);
  }
  console.log(`  Done: ${cityResults.length} cities\n`);

  // 3. CATEGORIES
  console.log('3/5 Seeding Categories...');
  const catResults = await upsert('categories', categories);
  const categoryMap = {};
  for (const c of catResults) {
    categoryMap[c.slug] = c.id;
    console.log(`  ✓ ${c.name}`);
  }
  console.log(`  Done: ${catResults.length} categories\n`);

  // 4. PROCEDURES
  console.log('4/5 Seeding Procedures...');
  const procRows = procedures.map(p => {
    const { costs, category_slug, ...rest } = p;
    return {
      ...rest,
      category_id: categoryMap[category_slug],
      category: category_slug,
      avg_costs: Object.fromEntries(
        Object.entries(costs).map(([cc, [min, max]]) => [cc, { min, max, currency: 'GBP' }])
      ),
      meta_title: `${p.name} Abroad | Compare Clinics & Prices | MeetYourClinic`,
      meta_description: `Compare top clinics abroad for ${p.name.toLowerCase()}. Save up to 70% vs UK prices. Accredited clinics. Free quotes.`,
      status: 'published',
    };
  });

  const procResults = await upsert('procedures', procRows);
  const procedureMap = {};
  let catCounts = {};
  for (const p of procResults) {
    procedureMap[p.slug] = p.id;
    const cs = p.category || 'other';
    catCounts[cs] = (catCounts[cs] || 0) + 1;
  }
  console.log(`  Done: ${procResults.length} procedures`);
  for (const [cat, count] of Object.entries(catCounts)) {
    console.log(`    ${cat}: ${count}`);
  }
  console.log('');

  // 5. DESTINATIONS (Validity Matrix: procedure × country)
  console.log('5/5 Seeding Destinations (validity matrix)...');
  const destRows = [];

  for (const proc of procedures) {
    const procedureId = procedureMap[proc.slug];
    if (!procedureId) continue;

    for (const [cc, [costMin, costMax]] of Object.entries(proc.costs)) {
      const countryId = countryMap[cc];
      if (!countryId) continue;

      destRows.push({
        procedure_id: procedureId,
        country_id: countryId,
        price_min_gbp: costMin,
        price_max_gbp: costMax,
        price_min_usd: Math.round(costMin * 1.27),
        price_max_usd: Math.round(costMax * 1.27),
        clinic_count: 0,
        is_valid: true,
        uk_relevant: true,
        us_relevant: ['TR', 'TH', 'IN', 'ES'].includes(cc),
        status: 'published',
        meta_title: `${proc.name} in ${countries.find(c => c.iso_code === cc)?.name || cc} | Prices & Clinics | MeetYourClinic`,
        meta_description: `${proc.name} in ${countries.find(c => c.iso_code === cc)?.name || cc} from £${costMin}. Compare accredited clinics, read reviews. Save vs UK prices.`,
      });
    }
  }

  // Insert in batches
  const batchSize = 50;
  let inserted = 0;
  for (let i = 0; i < destRows.length; i += batchSize) {
    const batch = destRows.slice(i, i + batchSize);
    await upsert('destinations', batch);
    inserted += batch.length;
    process.stdout.write(`  Batch ${Math.ceil((i + 1) / batchSize)}: ${inserted}/${destRows.length}\r`);
  }
  console.log(`\n  Done: ${inserted} valid procedure-country combinations\n`);

  // SUMMARY
  const destByCountry = {};
  for (const row of destRows) {
    const name = countries.find(c => countryMap[c.iso_code] === row.country_id)?.name || '?';
    destByCountry[name] = (destByCountry[name] || 0) + 1;
  }

  console.log('========================================');
  console.log('✅ SEED COMPLETE');
  console.log('========================================');
  console.log(`Countries:        ${countryResults.length}`);
  console.log(`Cities:           ${cityResults.length}`);
  console.log(`Categories:       ${catResults.length}`);
  console.log(`Procedures:       ${procResults.length}`);
  console.log(`Destinations:     ${inserted} valid combos`);
  console.log('');
  console.log('Procedures available per country:');
  for (const [name, count] of Object.entries(destByCountry).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${name}: ${count}`);
  }
  console.log('');
  console.log('pSEO pages now available:');
  const total = countryResults.length + catResults.length + procResults.length + inserted;
  console.log(`  /destinations/[country]             → ${countryResults.length} pages`);
  console.log(`  /[category]                         → ${catResults.length} pages`);
  console.log(`  /[category]/[procedure]             → ${procResults.length} pages`);
  console.log(`  /destinations/[country]/[procedure] → ${inserted} pages`);
  console.log(`  TOTAL: ~${total} indexable pages`);
}

seed().catch(err => {
  console.error('\n❌ SEED FAILED:', err.message);
  process.exit(1);
});
