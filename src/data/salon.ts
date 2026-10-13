import olivia from "@/assets/stylist-olivia.jpg";
import amelia from "@/assets/stylist-amelia.jpg";
import charlotte from "@/assets/stylist-charlotte.jpg";
import styling from "@/assets/styling-detail.jpg";
import hero from "@/assets/hero.jpg";
import products from "@/assets/products.jpg";
import bridal from "@/assets/bridal.jpg";

export type Service = { name: string; price: number; minutes: number; description: string };
export type Category = { id: string; label: string; image: string; intro: string; services: Service[] };

export const categories: Category[] = [
  {
    id: "cuts",
    label: "Haircuts & Styling",
    image: styling,
    intro: "Precision shape and movement, finished by hand.",
    services: [
      { name: "Signature Haircut", price: 45, minutes: 45, description: "A considered cut shaped around your features and routine." },
      { name: "Wash, Cut & Blow-Dry", price: 55, minutes: 60, description: "Our full ritual — cleanse, cut and a polished finish." },
      { name: "Luxury Blow-Dry", price: 30, minutes: 30, description: "Glossy, lasting volume with a relaxing scalp massage." },
      { name: "Special Occasion Styling", price: 65, minutes: 60, description: "Waves, sleek finishes or soft texture for the evening ahead." },
    ],
  },
  {
    id: "colour",
    label: "Colour & Balayage",
    image: hero,
    intro: "Dimensional, natural-looking colour, painted with care.",
    services: [
      { name: "Full Head Colour", price: 75, minutes: 90, description: "Rich, even tone from root to tip." },
      { name: "Half Head Highlights", price: 85, minutes: 120, description: "Brightness placed where light naturally falls." },
      { name: "Full Head Highlights", price: 120, minutes: 150, description: "All-over luminosity with seamless blending." },
      { name: "Balayage", price: 150, minutes: 180, description: "Hand-painted, sun-kissed dimension that grows out softly." },
      { name: "Toner & Gloss", price: 35, minutes: 30, description: "Refresh tone and restore a mirror-like shine." },
    ],
  },
  {
    id: "treatments",
    label: "Treatments",
    image: products,
    intro: "Restorative rituals with thoughtfully selected haircare.",
    services: [
      { name: "Deep Conditioning Treatment", price: 25, minutes: 30, description: "Intensive moisture for softness and manageability." },
      { name: "Luxury Hair Repair Ritual", price: 45, minutes: 45, description: "Bond-strengthening care for stressed or coloured hair." },
      { name: "Scalp Care Treatment", price: 35, minutes: 30, description: "Gentle exfoliation and massage for a balanced scalp." },
    ],
  },
  {
    id: "bridal",
    label: "Bridal & Occasion",
    image: bridal,
    intro: "Calm, unhurried artistry for the days that matter most.",
    services: [
      { name: "Bridal Hair Trial", price: 75, minutes: 60, description: "Explore and refine your look well before the day." },
      { name: "Bridal Hair Styling", price: 120, minutes: 90, description: "Your finished bridal style, secured to last." },
      { name: "Event Hair Styling", price: 70, minutes: 60, description: "Elegant styling for galas, parties and celebrations." },
    ],
  },
];

export const allServices = categories.flatMap((c) => c.services);

export type Stylist = { name: string; role: string; bio: string; specialities: string[]; image: string };
export const stylists: Stylist[] = [
  {
    name: "Olivia Bennett",
    role: "Creative Director & Senior Stylist",
    bio: "Olivia leads the salon's creative vision, pairing precise technique with an instinct for what makes each guest feel most like themselves.",
    specialities: ["Precision cutting", "Luxury blow-dries", "Personalised styling"],
    image: olivia,
  },
  {
    name: "Amelia Rose",
    role: "Colour Specialist",
    bio: "Amelia sees colour as light and shadow. She takes time to understand your skin tone and lifestyle before a single brushstroke.",
    specialities: ["Balayage", "Dimensional colour", "Highlights", "Natural transformations"],
    image: amelia,
  },
  {
    name: "Charlotte Hayes",
    role: "Bridal & Occasion Stylist",
    bio: "Charlotte brings a calm, reassuring presence to every occasion, creating graceful styles that feel effortless and hold beautifully.",
    specialities: ["Bridal hair", "Elegant updos", "Special occasions"],
    image: charlotte,
  },
];

export const testimonials = [
  { quote: "Olivia understood exactly what I wanted. The result was beautiful, and the entire experience felt so luxurious.", name: "Sophie M.", service: "Signature Haircut" },
  { quote: "The best balayage I've ever had. Amelia took so much care to get the colour just right.", name: "Emily R.", service: "Balayage" },
  { quote: "My bridal hair was absolutely perfect. Charlotte made me feel so special on the day.", name: "Jessica T.", service: "Bridal Hair Styling" },
];

export const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

// Placeholder business details — replace before launch.
export const contact = {
  address: "24 Rosewood Lane, London, UK",
  phone: "+44 20 7946 0123",
  email: "hello@velvetandvinesalon.co.uk",
  hours: [
    ["Monday", "Closed"],
    ["Tuesday – Friday", "09:00 – 18:00"],
    ["Saturday", "09:00 – 17:00"],
    ["Sunday", "10:00 – 16:00"],
  ] as const,
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "stylists", label: "Our Stylists" },
  { id: "experience", label: "The Experience" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export const ease = [0.22, 1, 0.36, 1] as const;
