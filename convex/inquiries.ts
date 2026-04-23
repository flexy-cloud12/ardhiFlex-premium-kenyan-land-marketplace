import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
export const submitInquiry = mutation({
  args: {
    propertyId: v.id("properties"),
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    await ctx.db.insert("inquiries", {
      propertyId: args.propertyId,
      userId: userId ?? undefined,
      name: args.name,
      email: args.email,
      message: args.message,
      createdAt: Date.now(),
    });
    return { success: true };
  },
});