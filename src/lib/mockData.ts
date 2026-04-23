export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  region: 'Nairobi' | 'Kiambu' | 'Kajiado' | 'Coastal' | 'Rift Valley';
  size: string;
  images: string[];
  amenities: string[];
  description: string;
  verified: boolean;
  coordinates: { lat: number; lng: number };
}
export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Premium 5-Acre Plot in Tigoni",
    price: 45000000,
    location: "Tigoni, Kiambu",
    region: "Kiambu",
    size: "5 Acres",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1444333509402-32cb2ce1509b?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Water", "Electricity", "Red Soil", "Near Tea Farm"],
    description: "Breath-taking views of tea plantations. Perfect for a luxury estate or resort development. This land features rich volcanic red soil and is already connected to the main water line.",
    verified: true,
    coordinates: { lat: -1.134, lng: 36.685 }
  },
  {
    id: "2",
    title: "Scenic Savannah 10-Acre Plot",
    price: 12000000,
    location: "Kajiado West",
    region: "Kajiado",
    size: "10 Acres",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Borehole Access", "Fenced", "Wildlife View", "Road Access"],
    description: "Ideal for a getaway home or conservation project. Experience the magic of the Rift Valley with unobstructed views of Mt. Kilimanjaro on clear days.",
    verified: true,
    coordinates: { lat: -2.012, lng: 36.782 }
  },
  {
    id: "3",
    title: "White Sand Beach Frontage",
    price: 85000000,
    location: "Diani Beach",
    region: "Coastal",
    size: "2 Acres",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Ocean View", "Private Access", "Coconut Trees", "Security"],
    description: "Pristine ocean-front property in the heart of Diani. Perfect for building a boutique hotel or a premium private residence. Direct access to the beach.",
    verified: true,
    coordinates: { lat: -4.279, lng: 39.594 }
  },
  {
    id: "4",
    title: "Naivasha Lakeside View Plot",
    price: 18500000,
    location: "Moi South Lake, Naivasha",
    region: "Rift Valley",
    size: "1 Acre",
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200"
    ],
    amenities: ["Lake Access", "Power Connection", "Level Ground"],
    description: "Stunning 1-acre plot with a gentle slope towards Lake Naivasha. Rich biodiversity and a quiet, tranquil environment. Excellent investment potential.",
    verified: false,
    coordinates: { lat: -0.717, lng: 36.431 }
  }
];