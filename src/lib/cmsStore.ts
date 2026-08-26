import { sampleProducts, sampleVideos, sampleGalleryImages, sampleBlogs } from "@/data/sampleData";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: string;
  capacity: string;
  paperSize: string;
  powerReq: string;
  weightDim: string;
  guarantee: string;
  description: string;
  features: string[];
  image: string;
  bestSeller?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
}

export interface SlideItem {
  id: number;
  eyebrow: string;
  titleRed: string;
  titleGreen: string;
  titleSuffix: string;
  subtitle: string;
  capacityTag: string;
  image: string;
  bullets: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  cardTitle: string;
  cardSubtitle: string;
  cardLink: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  machineType: string;
  quantity?: string;
  city?: string;
  state?: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";
  createdAt: string;
}

const STORAGE_KEYS = {
  PRODUCTS: "mohanty_cms_products",
  VIDEOS: "mohanty_cms_videos",
  GALLERY: "mohanty_cms_gallery",
  BLOGS: "mohanty_cms_blogs",
  SLIDES: "mohanty_cms_slides",
  LEADS: "mohanty_cms_leads",
};

// Initial default hero slides
export const initialSlides: SlideItem[] = [
  {
    id: 1,
    eyebrow: "A MARK OF QUALITY & TRUST • ISO 9001:2015 CERTIFIED",
    titleRed: "Paper Plate",
    titleGreen: "Making Machines",
    titleSuffix: "High Performance",
    subtitle:
      "Engineered for maximum efficiency, durability and high output. Fully automatic, semi automatic, and heavy-duty hydraulic paper plate machines manufactured in Jagatpur Industrial Estate, Cuttack.",
    capacityTag: "Capacity: 36,000+ / Day",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "36,000+ Plates / Day Production Capacity",
      "Heavy Duty Vibration-Free Steel Frame",
      "Pan-India On-Site Installation & Setup",
      "24/7 After Sales Support & Genuine Spares",
    ],
    primaryCtaText: "REQUEST QUOTATION",
    primaryCtaLink: "/contact",
    secondaryCtaText: "EXPLORE MACHINES",
    secondaryCtaLink: "/products",
    cardTitle: "Fully Automatic Machine",
    cardSubtitle: "High speed multi-die automatic feeder & heater",
    cardLink: "/products/fully-automatic-paper-plate-making-machine",
  },
  {
    id: 2,
    eyebrow: "HEAVY-DUTY INDUSTRIAL HYDRAULICS",
    titleRed: "Hydraulic Press",
    titleGreen: "Thali Machines",
    titleSuffix: "Heavy Duty",
    subtitle:
      "100 Ton high-pressure hydraulic machines built for thick paper thali, buffet plates, and deep wrinkle dies with vibration-free steel frames.",
    capacityTag: "Pressure: 100 Ton Hydraulic",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "100 Ton Hydraulic Cylinder Pressure",
      "Deep Wrinkle & Heavy Paper Thali Dies",
      "Low Power Consumption Motor",
      "Pan-India Fast Dispatch & Setup",
    ],
    primaryCtaText: "VIEW HYDRAULIC MACHINES",
    primaryCtaLink: "/products?category=hydraulic",
    secondaryCtaText: "REQUEST QUOTATION",
    secondaryCtaLink: "/contact",
    cardTitle: "Hydraulic Paper Plate Machine",
    cardSubtitle: "100 Ton pressure for heavy buffet & thali plates",
    cardLink: "/products/hydraulic-paper-plate-making-machine",
  },
  {
    id: 3,
    eyebrow: "DUAL PRODUCTION LINES • 2X DAILY OUTPUT",
    titleRed: "Double Die",
    titleGreen: "Automatic Lines",
    titleSuffix: "High Speed",
    subtitle:
      "Double die automatic machines designed for high-capacity manufacturing plants. Run two separate production lines simultaneously with automated paper feeding.",
    capacityTag: "Dual Line: 2X Output",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "Simultaneous Dual-Die Production",
      "Automated Roll Feeder & Counter",
      "Independent Temperature Control",
      "Heavy Steel Frame Construction",
    ],
    primaryCtaText: "EXPLORE DOUBLE DIE",
    primaryCtaLink: "/products/hydraulic-double-die-machine",
    secondaryCtaText: "DOWNLOAD CATALOGUE",
    secondaryCtaLink: "/products",
    cardTitle: "Double Die High-Speed Machine",
    cardSubtitle: "Dual production lines running simultaneously",
    cardLink: "/products/hydraulic-double-die-machine",
  },
  {
    id: 4,
    eyebrow: "BUFFET & CATERING SPECIALTY MACHINERY",
    titleRed: "Buffet & Thali",
    titleGreen: "Die Machines",
    titleSuffix: "Specialty",
    subtitle:
      "Specialized deep wrinkle dies and multi-cavity moulds for heavy-duty buffet catering plates, bowls, and meal thalis with precision heating.",
    capacityTag: "Specialty: Buffet & Thali",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "Deep Wrinkle & Diamond Die Cutters",
      "Suitable for 80 GSM to 400 GSM Raw Paper",
      "Precision Temperature Control Heaters",
      "Custom Mould Sizes Available",
    ],
    primaryCtaText: "VIEW BUFFET MACHINES",
    primaryCtaLink: "/products/fully-automatic-buffet-plate-making-machine",
    secondaryCtaText: "CONTACT FACTORY",
    secondaryCtaLink: "/contact",
    cardTitle: "Buffet & Thali Specialty Machine",
    cardSubtitle: "Deep wrinkle die mechanism for heavy catering plates",
    cardLink: "/products/fully-automatic-buffet-plate-making-machine",
  },
  {
    id: 5,
    eyebrow: "STATE-OF-THE-ART MANUFACTURING PLANT • CUTTACK",
    titleRed: "Mohanty Udyog",
    titleGreen: "Manufacturing Unit",
    titleSuffix: "Industrial Facility",
    subtitle:
      "Spanning 25,000 Sq. Ft. in Jagatpur Industrial Estate, Cuttack, Odisha. ISO 9001:2015 certified plant equipped with CNC precision machinery.",
    capacityTag: "Facility: 25,000 Sq. Ft.",
    image:
      "https://images.unsplash.com/photo-158109187062b-7428641d42f7?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "25,000 Sq. Ft. Jagatpur Industrial Estate Plant",
      "CNC Lathes & Precision Engineering",
      "In-House Quality Testing Laboratory",
      "Pan-India Dispatch & Logistics Network",
    ],
    primaryCtaText: "TOUR OUR PLANT",
    primaryCtaLink: "/manufacturing-unit",
    secondaryCtaText: "WHY CHOOSE US",
    secondaryCtaLink: "/why-choose-us",
    cardTitle: "Jagatpur Manufacturing Facility",
    cardSubtitle: "25,000 Sq. Ft. ISO certified plant in Cuttack, Odisha",
    cardLink: "/manufacturing-unit",
  },
];

// Initial default leads
export const initialLeads: LeadItem[] = [
  {
    id: "LEAD-101",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@gmail.com",
    machineType: "Fully Automatic Paper Plate Machine",
    quantity: "2 Units",
    city: "Bhubaneswar",
    state: "Odisha",
    message: "Looking for setup cost and installation timeframe for paper plate unit.",
    status: "NEW",
    createdAt: "2026-08-10 10:30 AM",
  },
  {
    id: "LEAD-102",
    name: "Sunil Patnaik",
    phone: "+91 94371 11223",
    email: "sunil.patnaik@rediffmail.com",
    machineType: "Hydraulic Paper Plate Machine",
    quantity: "1 Unit",
    city: "Cuttack",
    state: "Odisha",
    message: "Interested in heavy duty thali making dies.",
    status: "CONTACTED",
    createdAt: "2026-08-09 02:15 PM",
  },
  {
    id: "LEAD-103",
    name: "Amitabh Swain",
    phone: "+91 70081 99887",
    email: "amitabh.swain@yahoo.com",
    machineType: "Double Die Paper Plate Machine",
    quantity: "3 Units",
    city: "Rourkela",
    state: "Odisha",
    message: "Need quotation for commercial plant installation.",
    status: "QUALIFIED",
    createdAt: "2026-08-08 11:45 AM",
  },
];

export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// Helpers for each collection
export const cmsStore = {
  // Products
  getProducts: (): ProductItem[] => getStoredData(STORAGE_KEYS.PRODUCTS, sampleProducts as unknown as ProductItem[]),
  saveProducts: (products: ProductItem[]) => setStoredData(STORAGE_KEYS.PRODUCTS, products),

  // Videos
  getVideos: (): VideoItem[] => getStoredData(STORAGE_KEYS.VIDEOS, sampleVideos as unknown as VideoItem[]),
  saveVideos: (videos: VideoItem[]) => setStoredData(STORAGE_KEYS.VIDEOS, videos),

  // Gallery
  getGallery: (): GalleryItem[] => getStoredData(STORAGE_KEYS.GALLERY, sampleGalleryImages as unknown as GalleryItem[]),
  saveGallery: (gallery: GalleryItem[]) => setStoredData(STORAGE_KEYS.GALLERY, gallery),

  // Blogs
  getBlogs: (): BlogItem[] => getStoredData(STORAGE_KEYS.BLOGS, sampleBlogs as unknown as BlogItem[]),
  saveBlogs: (blogs: BlogItem[]) => setStoredData(STORAGE_KEYS.BLOGS, blogs),

  // Hero Slides
  getSlides: (): SlideItem[] => getStoredData(STORAGE_KEYS.SLIDES, initialSlides),
  saveSlides: (slides: SlideItem[]) => setStoredData(STORAGE_KEYS.SLIDES, slides),

  // Leads
  getLeads: (): LeadItem[] => getStoredData(STORAGE_KEYS.LEADS, initialLeads),
  saveLeads: (leads: LeadItem[]) => setStoredData(STORAGE_KEYS.LEADS, leads),
};
