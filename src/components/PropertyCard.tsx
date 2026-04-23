import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { Doc } from "@convex/_generated/dataModel";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { cn } from "@/lib/utils";
interface PropertyCardProps {
  property: Doc<"properties">;
}
const FALLBACK_IMAGE = "https://placehold.co/600x400/1B4332/D4A373?text=Property+Image+Coming+Soon";
export function PropertyCard({ property }: PropertyCardProps) {
  const isFav = useQuery(api.favorites.isFavorite, { propertyId: property._id });
  const displayImage = property.images?.[0] || FALLBACK_IMAGE;
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="group h-full"
    >
      <Link to={`/properties/${property._id}`}>
        <Card className="h-full overflow-hidden border-border/40 shadow-soft hover:shadow-2xl transition-all duration-500 rounded-[2rem] bg-card flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={displayImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            {property.verified && (
              <Badge className="absolute top-4 left-4 bg-white/95 text-[#1B4332] hover:bg-white backdrop-blur-md border-none font-bold py-1.5 px-3 flex items-center gap-1.5 shadow-xl">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </Badge>
            )}
            <AnimatePresence>
              {isFav && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-4 right-4 bg-white/95 p-2 rounded-xl text-[#E07A5F] shadow-xl backdrop-blur-md"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              {property.region}
            </div>
          </div>
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-display font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium line-clamp-1">{property.location}</span>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-display font-black text-[#E07A5F] tracking-tight">
                Ksh {property.price.toLocaleString()}
              </span>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t border-border/30 bg-secondary/10 flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/70">
              <Ruler className="h-3.5 w-3.5 text-primary" />
              {property.size}
            </div>
            <div className="flex items-center gap-1 text-primary font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
              Details
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}