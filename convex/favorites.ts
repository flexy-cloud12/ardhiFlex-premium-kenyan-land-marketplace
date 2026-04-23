import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
export const toggleFavorite = mutation({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_property", (q) =>
        q.eq("userId", userId).eq("propertyId", args.propertyId)
      )
      .unique();
    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("favorites", {
        userId,
        propertyId: args.propertyId,
      });
      return true;
    }
  },
});
export const listMyFavorites = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    const properties = await Promise.all(
      favorites.map((f) => ctx.db.get(f.propertyId))
    );
    return properties.filter((p) => p !== null);
  },
});
export const isFavorite = query({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_user_property", (q) =>
        q.eq("userId", userId).eq("propertyId", args.propertyId)
      )
      .unique();
    return !!favorite;
  },
});