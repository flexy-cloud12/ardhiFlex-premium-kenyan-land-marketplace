import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, ShieldCheck, Heart } from "lucide-react";
import { Doc } from "@convex/_generated/dataModel";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { cn } from "@/lib/utils";
interface PropertyCardProps {
  property: Doc<"properties">;
}
export function PropertyCard({ property }: PropertyCardProps) {
  const isFav = useQuery(api.favorites.isFavorite, { propertyId: property._id });
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group h-full"
    >
      <Link to={`/properties/${property._id}`}>
        <Card className="h-full overflow-hidden border-border/40 shadow-soft hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-card flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {property.verified && (
              <Badge className="absolute top-5 left-5 bg-white/95 text-[#1B4332] hover:bg-white backdrop-blur-md border-none font-bold py-1.5 px-3 flex items-center gap-1.5 shadow-xl ring-1 ring-black/5">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Plot
              </Badge>
            )}
            <AnimatePresence>
              {isFav && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-5 right-5 bg-white/95 p-2.5 rounded-2xl text-red-500 shadow-xl backdrop-blur-md ring-1 ring-black/5"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className={cn(
              "absolute bottom-5 left-5 bg-black/40 text-white px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500",
            )}>
              {property.region}
            </div>
          </div>
          <CardContent className="p-7 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-display font-bold line-clamp-1 group-hover:text-[#1B4332] transition-colors duration-300">
                {property.title}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-[#1B4332]" />
                <span className="text-sm font-medium line-clamp-1">{property.location}</span>
              </div>
            </div>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-3xl font-display font-extrabold text-[#E07A5F] tracking-tight">
                Ksh {property.price.toLocaleString()}
              </span>
            </div>
          </CardContent>
          <CardFooter className="px-8 py-5 border-t border-border/30 bg-secondary/20 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
              <div className="h-8 w-8 rounded-lg bg-[#1B4332]/5 flex items-center justify-center">
                <Ruler className="h-4 w-4 text-[#1B4332]" />
              </div>
              {property.size}
            </div>
            <div className="flex items-center gap-1 text-[#1B4332] font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
              Details
              <span className="text-lg">→</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}