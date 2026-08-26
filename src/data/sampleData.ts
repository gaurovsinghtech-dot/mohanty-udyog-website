export interface SpecItem {
  label: string;
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "automatic" | "hydraulic" | "semi-automatic" | "raw-materials" | "cutting" | "spare-parts";
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  images: string[];
  specs: SpecItem[];
  features: string[];
  applications: string[];
  benefits: string[];
  capacity: string;
  power: string;
  featured: boolean;
  isBestSeller?: boolean;
  availability: "In Stock" | "Made to Order" | "Ready for Dispatch";
  priceType: "Quote Required" | "Fixed";
  faq: FAQItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  location: string;
  text: string;
  rating: number;
  machineUsed: string;
  category: "Automatic" | "Hydraulic" | "Semi-Automatic" | "Startup";
}

export interface BlogPostSection {
  heading: string;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: "Business Guide" | "Machinery" | "Maintenance" | "Raw Materials" | "Industry News";
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  authorTitle: string;
  featured?: boolean;
  sections: BlogPostSection[];
  takeaways: string[];
}

export const sampleProducts: Product[] = [
  {
    id: "prod-1",
    name: "Fully Automatic Paper Plate Making Machine",
    slug: "fully-automatic-paper-plate-making-machine",
    category: "automatic",
    categoryName: "Fully Automatic Machines",
    shortDescription:
      "High speed fully automatic machine with 3 to 8 dies for different plate sizes.",
    fullDescription:
      "Engineered with precision hardened steel components, heavy vibration-free iron frame, and automatic paper roll feeding mechanism. Capable of continuous 24/7 industrial production with high thermal efficiency and precision stroke control. Multi-die operation yields high output for all plate sizes.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Production Capacity", value: "3,500 - 4,500 pcs/hr" },
      { label: "Paper Weight (GSM)", value: "80 GSM - 400 GSM" },
      { label: "Plate Size Range", value: "4 inch - 14 inch Diameter" },
      { label: "Electric Motor", value: "2.0 HP Heavy Duty Motor" },
      { label: "Power Consumption", value: "2.5 kW / hr" },
      { label: "Operation Type", value: "Fully Automatic Multi Die" },
    ],
    features: [
      "High speed fully automatic roll feeding and plate ejection",
      "Digital PID temperature controllers for heating plates",
      "Hardened steel cams and precision oil-lubricated bushes",
      "Compatible with silver foil, craft paper, and printed reels",
    ],
    applications: [
      "Mass production of paper plates & thalis",
      "Catering & event disposable tableware manufacturing",
      "Wholesale packaging distributor supply lines",
    ],
    benefits: [
      "Reduces operator labor cost by up to 60%",
      "High thermal efficiency heater coils minimize power draw",
      "Rugged frame design eliminates machine wobble during long shifts",
    ],
    capacity: "4,500 pcs/hr",
    power: "2.0 HP",
    featured: true,
    isBestSeller: true,
    availability: "Ready for Dispatch",
    priceType: "Quote Required",
    faq: [
      {
        question: "What power connection is required for this automatic machine?",
        answer: "Operates on standard 220V Single Phase or 415V Three Phase electrical supply with low power draw.",
      },
    ],
  },
  {
    id: "prod-2",
    name: "Semi Automatic Paper Plate Machine",
    slug: "semi-automatic-paper-plate-machine",
    category: "semi-automatic",
    categoryName: "Semi Automatic Machines",
    shortDescription:
      "Semi automatic machine with high production output and easy operation.",
    fullDescription:
      "Ideal for small scale manufacturers and growing businesses. Delivers consistent quality plate press with manual blank feeding and simple mechanical control.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Production Capacity", value: "1,500 - 2,200 pcs/hr" },
      { label: "Paper Weight (GSM)", value: "80 GSM - 350 GSM" },
      { label: "Plate Size Range", value: "4 inch - 12 inch" },
      { label: "Electric Motor", value: "1.0 HP Single Phase" },
    ],
    features: [
      "Compact footprint with high structural strength",
      "Easy operation requiring minimal technical training",
      "Quick die changeover in under 10 minutes",
    ],
    applications: ["Small workshop manufacturing", "Local supply distributor"],
    benefits: ["Low investment barrier with reliable output"],
    capacity: "2,200 pcs/hr",
    power: "1.0 HP",
    featured: true,
    availability: "In Stock",
    priceType: "Quote Required",
    faq: [
      {
        question: "Can I run this machine on single phase power?",
        answer: "Yes, it runs on standard 220V single phase power supply.",
      },
    ],
  },
  {
    id: "prod-3",
    name: "Hydraulic Paper Plate Making Machine",
    slug: "hydraulic-paper-plate-making-machine",
    category: "hydraulic",
    categoryName: "Hydraulic Machines",
    shortDescription:
      "Heavy duty hydraulic machine for premium quality paper plates.",
    fullDescription:
      "Features a 5-ton hydraulic power pack system, solid steel construction, and precision pressure control. Ideal for heavy GSM paper boards and deep wrinkle plates.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Hydraulic Pressure", value: "5 Ton Cylinder" },
      { label: "Production Capacity", value: "2,000 - 3,000 pcs/hr" },
      { label: "Paper Weight (GSM)", value: "100 GSM - 600 GSM" },
      { label: "Electric Motor", value: "3.0 HP High Torque Motor" },
    ],
    features: [
      "5-Ton heavy-duty hydraulic cylinder",
      "Pressure gauge control and safety relief valve",
      "Low noise operating oil pump",
    ],
    applications: ["Heavy catering buffet thalis", "Deep dona bowls"],
    benefits: ["Flawless deep wrinkle embossing without foil tearing"],
    capacity: "3,000 pcs/hr",
    power: "3.0 HP",
    featured: true,
    availability: "Ready for Dispatch",
    priceType: "Quote Required",
    faq: [
      {
        question: "What is the max paper GSM supported?",
        answer: "It can comfortably form paper boards up to 600 GSM.",
      },
    ],
  },
  {
    id: "prod-4",
    name: "Hydraulic Double Die Machine",
    slug: "hydraulic-double-die-machine",
    category: "hydraulic",
    categoryName: "Hydraulic Machines",
    shortDescription:
      "Double die hydraulic machine for higher production capacity.",
    fullDescription:
      "Equipped with dual hydraulic presses operating simultaneously for maximum output efficiency on heavy GSM paper thali and plates.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Hydraulic Pressure", value: "7.5 Ton Hydraulic Pack" },
      { label: "Production Capacity", value: "4,000 - 5,000 pcs/hr" },
      { label: "Motor", value: "5.0 HP Heavy Duty" },
    ],
    features: [
      "Dual die hydraulic forming",
      "Independent pressure regulators for each station",
      "Oil radiator cooling unit",
    ],
    applications: ["Industrial mass thali production"],
    benefits: ["Doubles output per operator"],
    capacity: "5,000 pcs/hr",
    power: "5.0 HP",
    featured: true,
    availability: "In Stock",
    priceType: "Quote Required",
    faq: [],
  },
  {
    id: "prod-5",
    name: "Fully Automatic Buffet Plate Making Machine",
    slug: "fully-automatic-buffet-plate-making-machine",
    category: "automatic",
    categoryName: "Fully Automatic Machines",
    shortDescription:
      "Specially designed for making buffet plates with high speed and accuracy.",
    fullDescription:
      "High precision automated machine engineered specifically for large diameter buffet dinner plates and multi-compartment thalis.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Plate Size Range", value: "10 inch - 18 inch Buffet" },
      { label: "Capacity", value: "3,000 - 4,000 pcs/hr" },
    ],
    features: ["Specialized heavy plate forming mechanism", "High thermal efficiency"],
    applications: ["Buffet dinner plate manufacturing"],
    benefits: ["Superior edge seal and rigidity"],
    capacity: "4,000 pcs/hr",
    power: "3.0 HP",
    featured: false,
    availability: "Made to Order",
    priceType: "Quote Required",
    faq: [],
  },
  {
    id: "prod-6",
    name: "Semi Automatic Buffet Plate Making Machine",
    slug: "semi-automatic-buffet-plate-making-machine",
    category: "semi-automatic",
    categoryName: "Semi Automatic Machines",
    shortDescription:
      "Reliable semi automatic machine for buffet plate manufacturing.",
    fullDescription:
      "Economical choice for high strength buffet plates and compartment thalis with semi-automated blank loading.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Capacity", value: "1,800 - 2,400 pcs/hr" },
    ],
    features: ["Simple operation", "Durable mechanical frame"],
    applications: ["Buffet plate setup"],
    benefits: ["Cost effective startup machine"],
    capacity: "2,400 pcs/hr",
    power: "2.0 HP",
    featured: false,
    availability: "In Stock",
    priceType: "Quote Required",
    faq: [],
  },
  {
    id: "prod-7",
    name: "Hydraulic Paper Plate Cutting Machine",
    slug: "hydraulic-paper-plate-cutting-machine",
    category: "cutting",
    categoryName: "Customized Solutions",
    shortDescription:
      "Hydraulic cutting machine for perfect finish and uniform size.",
    fullDescription:
      "Precision hydraulic blank cutter to slice raw material reels and sheets into uniform circle blanks before plate pressing.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Cutting Capacity", value: "Up to 100 strokes/min" },
    ],
    features: ["Alloy steel blades", "Safety sensor guard"],
    applications: ["Blank cutting & reel slitting"],
    benefits: ["Reduces raw paper wastage"],
    capacity: "100 cuts/min",
    power: "3.0 HP",
    featured: false,
    availability: "Made to Order",
    priceType: "Quote Required",
    faq: [],
  },
  {
    id: "prod-8",
    name: "Moulds / Dies",
    slug: "moulds-dies",
    category: "spare-parts",
    categoryName: "Accessories & Parts",
    shortDescription:
      "High quality moulds available in different sizes and shapes.",
    fullDescription:
      "CNC machined hardened steel dies for round plates, wrinkle thalis, diamond pattern trays, and dona bowls.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: [
      { label: "Material", value: "Hardened Tool Steel" },
      { label: "Size Range", value: "4 inch to 18 inch" },
    ],
    features: ["CNC milled precision patterns", "Hard chrome rust-proof plating"],
    applications: ["Replacement dies for all machine models"],
    benefits: ["Long service life and clean edge cuts"],
    capacity: "Custom Built",
    power: "N/A",
    featured: false,
    availability: "In Stock",
    priceType: "Quote Required",
    faq: [],
  },
];

export const sampleTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Kumar",
    company: "Standard Eco Packaging",
    location: "Kolkata, West Bengal",
    text: "We purchased a Fully Automatic Paper Plate Machine from Mohanty Udyog. The machine quality is excellent and production is outstanding. Great after sales support!",
    rating: 5,
    machineUsed: "Fully Automatic Paper Plate Machine",
    category: "Automatic",
  },
  {
    id: "test-2",
    name: "Suresh Patnaik",
    company: "Utkal Disposables",
    location: "Bhubaneswar, Odisha",
    text: "Best machine quality and timely delivery. Their team guided us at every step. Highly satisfied with the performance and service.",
    rating: 5,
    machineUsed: "Fully Automatic Machine",
    category: "Automatic",
  },
  {
    id: "test-3",
    name: "Amit Verma",
    company: "Verma Enterprises",
    location: "Lucknow, Uttar Pradesh",
    text: "Mohanty Udyog provides advanced technology machines with great durability. Our business growth has increased significantly after installation.",
    rating: 5,
    machineUsed: "Hydraulic Thali Machine",
    category: "Hydraulic",
  },
  {
    id: "test-4",
    name: "Pradeep Sharma",
    company: "Sharma Industries",
    location: "Jaipur, Rajasthan",
    text: "Excellent company with great infrastructure and experienced team. Machines are user-friendly and require very low maintenance.",
    rating: 5,
    machineUsed: "Double Die Machine",
    category: "Automatic",
  },
  {
    id: "test-5",
    name: "Neha Agarwal",
    company: "Agarwal Packaging",
    location: "Indore, Madhya Pradesh",
    text: "We are using Semi Automatic Machine and it is working perfectly. Quality of plates is awesome. Highly recommended!",
    rating: 5,
    machineUsed: "Semi Automatic Machine",
    category: "Semi-Automatic",
  },
  {
    id: "test-6",
    name: "Vikash Agarwal",
    company: "Bihar Eco Products",
    location: "Patna, Bihar",
    text: "Professional team, quality machines and best support. We are very happy with our experience with Mohanty Udyog.",
    rating: 5,
    machineUsed: "Fully Automatic Machine",
    category: "Startup",
  },
  {
    id: "test-7",
    name: "Ravi K. Menon",
    company: "South Coast Disposables",
    location: "Coimbatore, Tamil Nadu",
    text: "Very good machine performance and on-time delivery. Their customer service is excellent.",
    rating: 5,
    machineUsed: "Hydraulic Double Die Machine",
    category: "Hydraulic",
  },
  {
    id: "test-8",
    name: "Pooja Mehta",
    company: "Mehta Traders",
    location: "Surat, Gujarat",
    text: "After comparing many companies, we choose Mohanty Udyog and it was the best decision for our business.",
    rating: 5,
    machineUsed: "Fully Automatic Buffet Machine",
    category: "Automatic",
  },
];

export const sampleVideos = [
  {
    id: "vid-1",
    title: "Mohanty Udyog - An Introduction",
    category: "About Us",
    duration: "02:15",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Know more about our company, our mission and our commitment to quality.",
  },
  {
    id: "vid-2",
    title: "Our Manufacturing Unit",
    category: "Manufacturing Unit",
    duration: "03:28",
    thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Take a tour of our state-of-the-art manufacturing facility and infrastructure.",
  },
  {
    id: "vid-3",
    title: "Fully Automatic Paper Plate Making Machine",
    category: "Machines",
    duration: "02:45",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "High speed fully automatic machine with advanced features.",
  },
  {
    id: "vid-4",
    title: "Hydraulic Paper Plate Making Machine",
    category: "Machines",
    duration: "02:30",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Heavy duty hydraulic machine for premium quality paper plates.",
  },
  {
    id: "vid-5",
    title: "Semi Automatic Paper Plate Making Machine",
    category: "Machines",
    duration: "02:20",
    thumbnail: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Semi automatic machine with high production output and easy operation.",
  },
  {
    id: "vid-6",
    title: "Precision Manufacturing Process",
    category: "Production Process",
    duration: "01:48",
    thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Step by step process followed to ensure precision and durability.",
  },
  {
    id: "vid-7",
    title: "Raw Materials & Quality Check",
    category: "Production Process",
    duration: "01:36",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "High quality raw materials and strict quality inspection process.",
  },
  {
    id: "vid-8",
    title: "Machine Installation & Testing",
    category: "Installation",
    duration: "02:18",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Installation and testing process at our client's location.",
  },
  {
    id: "vid-9",
    title: "Finished Products",
    category: "Machines",
    duration: "01:30",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Wide range of paper plates in different sizes and designs.",
  },
  {
    id: "vid-10",
    title: "Customer Testimonials",
    category: "Customer Feedback",
    duration: "01:52",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "What our customers say about our machines and service.",
  },
  {
    id: "vid-11",
    title: "Our Team",
    category: "About Us",
    duration: "01:42",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Meet our experienced and skilled team working behind our success.",
  },
  {
    id: "vid-12",
    title: "Future Vision",
    category: "About Us",
    duration: "02:18",
    thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Our vision for innovation, growth and a better tomorrow.",
  },
];

export const sampleGalleryImages = [
  {
    id: "gal-1",
    title: "Our Manufacturing Unit",
    category: "Manufacturing Unit",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    caption: "Our Manufacturing Unit",
  },
  {
    id: "gal-2",
    title: "Production Floor",
    category: "Manufacturing Unit",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    caption: "Production Floor",
  },
  {
    id: "gal-3",
    title: "Fully Automatic Paper Plate Machine",
    category: "Machinery",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    caption: "Fully Automatic Paper Plate Machine",
  },
  {
    id: "gal-4",
    title: "Hydraulic Paper Plate Making Machine",
    category: "Machinery",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    caption: "Hydraulic Paper Plate Making Machine",
  },
  {
    id: "gal-5",
    title: "Semi Automatic Machines",
    category: "Machinery",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    caption: "Semi Automatic Machines",
  },
  {
    id: "gal-6",
    title: "Welding Process",
    category: "Production Process",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    caption: "Welding Process",
  },
  {
    id: "gal-7",
    title: "Assembly Line",
    category: "Production Process",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    caption: "Assembly Line",
  },
  {
    id: "gal-8",
    title: "CNC & Control Panel",
    category: "Production Process",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    caption: "CNC & Control Panel",
  },
  {
    id: "gal-9",
    title: "Raw Material",
    category: "Finished Products",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    caption: "Raw Material",
  },
  {
    id: "gal-10",
    title: "Moulds / Dies",
    category: "Finished Products",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    caption: "Moulds / Dies",
  },
  {
    id: "gal-11",
    title: "Finished Products",
    category: "Finished Products",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    caption: "Finished Products",
  },
  {
    id: "gal-12",
    title: "Our Team",
    category: "Team",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    caption: "Our Team",
  },
];

export const sampleBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to Start a Paper Plate Business with Mohanty Udyog Machines",
    slug: "how-to-start-paper-plate-business",
    category: "Business Guide",
    readTime: "6 min read",
    date: "Aug 02, 2026",
    excerpt: "A comprehensive guide on setup, machinery selection, investment, and raw material sourcing.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    author: "Mohanty Udyog Team",
    authorTitle: "Machinery Experts",
    featured: true,
    takeaways: [
      "Select high-speed fully automatic machines for maximum daily output.",
      "Ensure proper space layout for raw material reels and finished stock.",
      "Calculate fast ROI with high local market demand.",
    ],
    sections: [
      {
        heading: "1. Market Scope & Demand",
        content:
          "The paper tableware industry is expanding rapidly due to bans on single-use plastics. Disposable paper plates, thalis, and dona cups are essential for catering and food retail.",
      },
    ],
  },
];
