import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, ShieldCheck } from "lucide-react";
import { Property } from "@/lib/mockData";
import { motion } from "framer-motion";
interface PropertyCardProps {
  property: Property;
}
export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/properties/${property.id}`}>
        <Card className="overflow-hidden border-border/50 shadow-soft hover:shadow-lg transition-all rounded-3xl bg-card">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {property.verified && (
              <Badge className="absolute top-4 left-4 bg-white/90 text-[#1B4332] hover:bg-white backdrop-blur-sm border-none font-semibold flex items-center gap-1 shadow-sm">
                <ShieldCheck className="h-3 w-3" /> Verified
              </Badge>
            )}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
              {property.region}
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-bold line-clamp-1 group-hover:text-[#1B4332] transition-colors">{property.title}</h3>
              <p className="text-2xl font-bold text-[#E07A5F]">
                Ksh {property.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-[#1B4332]" />
                  {property.location}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 border-t border-border/50 bg-secondary/30 flex justify-between">
            <div className="flex items-center gap-1 text-sm font-medium text-foreground">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              {property.size}
            </div>
            <span className="text-xs font-bold text-[#1B4332] underline underline-offset-4">View Details</span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}