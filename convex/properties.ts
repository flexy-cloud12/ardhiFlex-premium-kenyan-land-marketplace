import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("properties").order("desc").collect();
  },
});
export const getById = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("properties").first();
    if (existing) return "Already seeded";
    const properties = [
      {
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
        description: "Breath-taking views of tea plantations. Perfect for a luxury estate or resort development.",
        verified: true,
        coordinates: { lat: -1.134, lng: 36.685 }
      },
      {
        title: "Scenic Savannah 10-Acre Plot",
        price: 12000000,
        location: "Kajiado West",
        region: "Kajiado",
        size: "10 Acres",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200"
        ],
        amenities: ["Borehole Access", "Fenced", "Wildlife View"],
        description: "Ideal for a getaway home or conservation project. Experience the magic of the Rift Valley.",
        verified: true,
        coordinates: { lat: -2.012, lng: 36.782 }
      },
      {
        title: "White Sand Beach Frontage",
        price: 85000000,
        location: "Diani Beach",
        region: "Coastal",
        size: "2 Acres",
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200"
        ],
        amenities: ["Ocean View", "Private Access", "Coconut Trees"],
        description: "Pristine ocean-front property in the heart of Diani. Perfect for a boutique hotel.",
        verified: true,
        coordinates: { lat: -4.279, lng: 39.594 }
      }
    ];
    for (const p of properties) {
      await ctx.db.insert("properties", p);
    }
    return "Seeded successfully";
  },
});