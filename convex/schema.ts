import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
const applicationTables = {
  properties: defineTable({
    title: v.string(),
    price: v.number(),
    location: v.string(),
    region: v.string(), // Nairobi, Kiambu, Kajiado, Coastal, Rift Valley
    size: v.string(),
    images: v.array(v.string()),
    amenities: v.array(v.string()),
    description: v.string(),
    verified: v.boolean(),
    coordinates: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
  }).index("by_region", ["region"]),
  favorites: defineTable({
    userId: v.id("users"),
    propertyId: v.id("properties"),
  })
    .index("by_user", ["userId"])
    .index("by_property", ["propertyId"])
    .index("by_user_property", ["userId", "propertyId"]),
  inquiries: defineTable({
    propertyId: v.id("properties"),
    userId: v.optional(v.id("users")),
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_property", ["propertyId"]),
  files: defineTable({
    userId: v.id("users"),
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    size: v.number(),
    description: v.optional(v.string()),
    uploadedAt: v.number(),
  })
    .index("by_userId_uploadedAt", ["userId", "uploadedAt"])
    .index("by_userId_storageId", ["userId", "storageId"]),
};
export default defineSchema({
  ...authTables,
  ...applicationTables,
});