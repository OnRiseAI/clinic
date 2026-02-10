import type { ClinicContactConfig } from "@/lib/lead-funnel/types";

// ─── Clinic Type ─────────────────────────────────────────────────────────────

export interface ClinicTreatmentPrice {
  name: string;
  priceFrom: string;
}

export interface ClinicDoctor {
  name: string;
  specialty: string;
  yearsExperience: number;
  photoUrl: string;
}

export interface ClinicReview {
  excerpt: string;
  reviewer: string;
  country: string;
  rating: number;
}

export interface DentalClinic {
  id: string;
  slug: string;
  name: string;
  location: string;
  country: string;
  countryFlag: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  verified: boolean;
  imageUrl: string;
  accreditations: string[];
  patientsTreated: string;
  yearEstablished: number;
  description: string;
  doctor: ClinicDoctor;
  review: ClinicReview;
  treatments: ClinicTreatmentPrice[];
  contactConfig: ClinicContactConfig;
}

// ─── Mock Clinics ────────────────────────────────────────────────────────────

export const DENTAL_CLINICS: DentalClinic[] = [
  {
    id: "westdent-clinic",
    slug: "westdent-clinic",
    name: "WestDent Clinic",
    location: "Izmir, Turkey",
    country: "TR",
    countryFlag: "\uD83C\uDDF9\uD83C\uDDF7",
    rating: 4.9,
    reviewCount: 312,
    tags: ["Implants", "Veneers", "All-on-4"],
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format",
    accreditations: ["JCI", "ISO 9001", "TDB"],
    patientsTreated: "12,000+",
    yearEstablished: 2008,
    description:
      "Award-winning dental clinic in Izmir specializing in full-mouth restorations, dental implants, and cosmetic dentistry. State-of-the-art CEREC and 3D imaging technology.",
    doctor: {
      name: "Dr. Mehmet Y\u0131lmaz",
      specialty: "Implantology",
      yearsExperience: 18,
      photoUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&auto=format&crop=face",
    },
    review: {
      excerpt:
        "The best decision I ever made. Dr. Y\u0131lmaz and his team were incredibly professional. My implants look completely natural.",
      reviewer: "Sarah T.",
      country: "United States",
      rating: 5,
    },
    treatments: [
      { name: "Dental Implant", priceFrom: "from $350" },
      { name: "Porcelain Veneer", priceFrom: "from $250" },
      { name: "All-on-4", priceFrom: "from $4,200" },
    ],
    contactConfig: {
      whatsappNumber: "+905551234567",
      smsUsePlatformReply: false,
      email: "info@westdent.com",
    },
  },
  {
    id: "dentakay-istanbul",
    slug: "dentakay-istanbul",
    name: "Dentakay",
    location: "Istanbul, Turkey",
    country: "TR",
    countryFlag: "\uD83C\uDDF9\uD83C\uDDF7",
    rating: 4.8,
    reviewCount: 1240,
    tags: ["Cosmetic", "Implants", "Hollywood Smile"],
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop&auto=format",
    accreditations: ["JCI", "EDAD", "ISO 9001"],
    patientsTreated: "45,000+",
    yearEstablished: 2009,
    description:
      "One of Turkey\u2019s largest dental centers with 150+ dentists. Internationally accredited facility performing 500+ procedures monthly with lifetime guarantees on implants.",
    doctor: {
      name: "Dr. G\u00fclay \u00d6zt\u00fcrk",
      specialty: "Cosmetic Dentistry",
      yearsExperience: 15,
      photoUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&auto=format&crop=face",
    },
    review: {
      excerpt:
        "I flew from London for my Hollywood Smile. The results exceeded my expectations. 10/10 would recommend to anyone.",
      reviewer: "James M.",
      country: "United Kingdom",
      rating: 5,
    },
    treatments: [
      { name: "Hollywood Smile", priceFrom: "from $2,800" },
      { name: "Dental Implant", priceFrom: "from $290" },
      { name: "Zirconia Crown", priceFrom: "from $150" },
    ],
    contactConfig: {
      whatsappNumber: "+905559876543",
      smsUsePlatformReply: false,
      email: "info@dentakay.com",
    },
  },
  {
    id: "kreativ-dental",
    slug: "kreativ-dental",
    name: "Kreativ Dental",
    location: "Budapest, Hungary",
    country: "HU",
    countryFlag: "\uD83C\uDDED\uD83C\uDDFA",
    rating: 4.7,
    reviewCount: 874,
    tags: ["Implants", "Crowns", "Bridges"],
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop&auto=format",
    accreditations: ["ISO 9001", "MAOT"],
    patientsTreated: "28,000+",
    yearEstablished: 2005,
    description:
      "Hungary\u2019s premier dental clinic for international patients. Located in central Budapest with a dedicated patient concierge, airport transfers, and partner hotel accommodations.",
    doctor: {
      name: "Dr. Istv\u00e1n Szab\u00f3",
      specialty: "Prosthodontics",
      yearsExperience: 22,
      photoUrl:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&auto=format&crop=face",
    },
    review: {
      excerpt:
        "Dr. Szab\u00f3 replaced all my crowns in just 5 days. The clinic felt like a 5-star hotel. Saved \u20AC8,000 compared to Vienna.",
      reviewer: "Klaus W.",
      country: "Austria",
      rating: 5,
    },
    treatments: [
      { name: "Dental Implant", priceFrom: "from \u20AC450" },
      { name: "Porcelain Crown", priceFrom: "from \u20AC280" },
      { name: "Full-Arch Bridge", priceFrom: "from \u20AC3,500" },
    ],
    contactConfig: {
      whatsappNumber: "+36301234567",
      smsUsePlatformReply: false,
      email: "info@kreativdental.com",
    },
  },
  {
    id: "dental-solutions-cancun",
    slug: "dental-solutions-cancun",
    name: "Dental Solutions",
    location: "Canc\u00fan, Mexico",
    country: "MX",
    countryFlag: "\uD83C\uDDF2\uD83C\uDDFD",
    rating: 4.8,
    reviewCount: 560,
    tags: ["Implants", "Veneers", "Root Canal"],
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&auto=format",
    accreditations: ["ADA", "AACD"],
    patientsTreated: "15,000+",
    yearEstablished: 2011,
    description:
      "Bilingual dental center in Canc\u00fan\u2019s hotel zone, serving American and Canadian patients. All dentists are US-trained or certified with ADA-equivalent materials and protocols.",
    doctor: {
      name: "Dr. Carlos Ram\u00edrez",
      specialty: "Oral Surgery",
      yearsExperience: 14,
      photoUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&auto=format&crop=face",
    },
    review: {
      excerpt:
        "As an American, the quality and price blew me away. Same materials as my dentist in Texas at a fraction of the cost.",
      reviewer: "Mike R.",
      country: "United States",
      rating: 5,
    },
    treatments: [
      { name: "Dental Implant", priceFrom: "from $280" },
      { name: "Root Canal", priceFrom: "from $180" },
      { name: "Porcelain Veneer", priceFrom: "from $320" },
    ],
    contactConfig: {
      whatsappNumber: "+529981234567",
      smsUsePlatformReply: false,
      email: "info@dentalsolutionscancun.com",
    },
  },
  {
    id: "bangkok-smile",
    slug: "bangkok-smile",
    name: "Bangkok Smile Dental",
    location: "Bangkok, Thailand",
    country: "TH",
    countryFlag: "\uD83C\uDDF9\uD83C\uDDED",
    rating: 4.6,
    reviewCount: 430,
    tags: ["Cosmetic", "Implants", "Whitening"],
    verified: false,
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop&auto=format",
    accreditations: ["ISO 9001"],
    patientsTreated: "20,000+",
    yearEstablished: 2003,
    description:
      "One of Bangkok\u2019s longest-running dental tourism clinics. 7 branches across the city with multilingual staff, offering everything from simple cleanings to full-mouth reconstructions.",
    doctor: {
      name: "Dr. Anong Siri",
      specialty: "Cosmetic Dentistry",
      yearsExperience: 12,
      photoUrl:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&auto=format&crop=face",
    },
    review: {
      excerpt:
        "Visited Bangkok Smile for veneers and teeth whitening. Excellent service and the price was unbeatable. Very modern facility.",
      reviewer: "Emma L.",
      country: "Australia",
      rating: 4,
    },
    treatments: [
      { name: "Dental Implant", priceFrom: "from $250" },
      { name: "Teeth Whitening", priceFrom: "from $150" },
      { name: "Porcelain Veneer", priceFrom: "from $200" },
    ],
    contactConfig: {
      whatsappNumber: "+66812345678",
      smsUsePlatformReply: false,
      email: "info@bangkoksmile.com",
    },
  },
  {
    id: "molar-clinic-poznan",
    slug: "molar-clinic-poznan",
    name: "Molar Clinic",
    location: "Pozna\u0144, Poland",
    country: "PL",
    countryFlag: "\uD83C\uDDF5\uD83C\uDDF1",
    rating: 4.7,
    reviewCount: 215,
    tags: ["Implants", "Orthodontics", "Veneers"],
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&h=400&fit=crop&auto=format",
    accreditations: ["ISO 9001", "PTS"],
    patientsTreated: "8,000+",
    yearEstablished: 2012,
    description:
      "Modern dental clinic in the heart of Pozna\u0144 specializing in implantology and orthodontics. Popular with patients from Germany, Scandinavia, and the UK seeking affordable, high-quality care.",
    doctor: {
      name: "Dr. Anna Kowalska",
      specialty: "Orthodontics",
      yearsExperience: 16,
      photoUrl:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&auto=format&crop=face",
    },
    review: {
      excerpt:
        "Flew from Berlin for Invisalign treatment. Dr. Kowalska was thorough and caring. Half the price of my German quote.",
      reviewer: "Hans D.",
      country: "Germany",
      rating: 5,
    },
    treatments: [
      { name: "Dental Implant", priceFrom: "from \u20AC350" },
      { name: "Invisalign", priceFrom: "from \u20AC2,200" },
      { name: "Porcelain Veneer", priceFrom: "from \u20AC300" },
    ],
    contactConfig: {
      whatsappNumber: "+48501234567",
      smsUsePlatformReply: false,
      email: "hello@molarclinic.pl",
    },
  },
  {
    id: "costa-rica-dental",
    slug: "costa-rica-dental",
    name: "Costa Rica Dental Team",
    location: "San Jos\u00e9, Costa Rica",
    country: "CR",
    countryFlag: "\uD83C\uDDE8\uD83C\uDDF7",
    rating: 4.8,
    reviewCount: 340,
    tags: ["Implants", "Crowns", "All-on-4"],
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop&auto=format",
    accreditations: ["ADA", "CCDCR"],
    patientsTreated: "10,000+",
    yearEstablished: 2006,
    description:
      "Leading dental tourism clinic in Central America. US-trained doctors, FDA-approved materials, and an in-house lab for same-day crowns. Full concierge service for international patients.",
    doctor: {
      name: "Dr. Luis Mora",
      specialty: "Implantology",
      yearsExperience: 20,
      photoUrl:
        "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&h=150&fit=crop&auto=format&crop=face",
    },
    review: {
      excerpt:
        "Had 6 implants placed and restored in two trips. Dr. Mora is a perfectionist. Can\u2019t tell them apart from my natural teeth.",
      reviewer: "Linda P.",
      country: "Canada",
      rating: 5,
    },
    treatments: [
      { name: "Dental Implant", priceFrom: "from $300" },
      { name: "Zirconia Crown", priceFrom: "from $350" },
      { name: "All-on-4", priceFrom: "from $5,500" },
    ],
    contactConfig: {
      whatsappNumber: "+50612345678",
      smsUsePlatformReply: false,
      email: "info@crdentalteam.com",
    },
  },
];

// ─── Location filter options ─────────────────────────────────────────────────

export const LOCATION_FILTERS = [
  { label: "All locations", value: "all" },
  { label: "\uD83C\uDDF9\uD83C\uDDF7 Turkey", value: "TR" },
  { label: "\uD83C\uDDED\uD83C\uDDFA Hungary", value: "HU" },
  { label: "\uD83C\uDDF2\uD83C\uDDFD Mexico", value: "MX" },
  { label: "\uD83C\uDDF9\uD83C\uDDED Thailand", value: "TH" },
  { label: "\uD83C\uDDF5\uD83C\uDDF1 Poland", value: "PL" },
  { label: "\uD83C\uDDE8\uD83C\uDDF7 Costa Rica", value: "CR" },
];

// ─── FAQ Data ────────────────────────────────────────────────────────────────

export interface DentistryFaqItem {
  question: string;
  answer: string;
}

export const DENTISTRY_FAQS: DentistryFaqItem[] = [
  {
    question: "How much does dental treatment abroad typically cost?",
    answer:
      "Costs vary by treatment and destination. Dental implants typically range from $250\u2013$1,500 per tooth, while porcelain veneers range from $150\u2013$600 per tooth. Most patients save 40\u201370% compared to US or UK prices for equivalent materials and techniques.",
  },
  {
    question: "How are clinics verified on this platform?",
    answer:
      "We verify clinics based on accreditation (ISO, JCI, or national equivalents), practitioner credentials, patient reviews, and facility standards. Verified clinics display a badge on their listing. Verification is reviewed annually.",
  },
  {
    question: "How long does dental treatment usually take?",
    answer:
      "Simple procedures like veneers or crowns take 5\u20137 days. Dental implants may require 3\u20135 days for placement, with a follow-up visit 3\u20136 months later for the final crown. All-on-4 full-arch restorations can often be completed in a single trip of 5\u20137 days.",
  },
  {
    question: "Is there any obligation when I contact a clinic?",
    answer:
      "No. Contacting a clinic through our platform is free and carries no obligation. You can compare quotes from multiple clinics before making any decision.",
  },
  {
    question: "What happens after I verify my number?",
    answer:
      "After verification, you choose your preferred contact method (WhatsApp, SMS, or email). The clinic receives a summary of what you\u2019re looking for and will respond directly. You control the conversation from there.",
  },
];

// ─── Page Stats ──────────────────────────────────────────────────────────────

export const PAGE_STATS = {
  clinicCount: 741,
  patientsHelped: "85,000+",
  avgRating: 4.8,
  countries: 23,
};
