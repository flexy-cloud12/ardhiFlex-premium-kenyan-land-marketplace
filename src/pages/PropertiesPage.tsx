import React, { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
export function PropertiesPage() {
  const [search, setSearch] = useState("");
  const properties = useQuery(api.properties.get);
  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    return properties.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.region.toLowerCase().includes(search.toLowerCase())
    );
  }, [properties, search]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filters
            </h3>
            <div className="space-y-6">
              {/* Region Filter */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Region</h4>
                {["Nairobi", "Kiambu", "Coastal", "Rift Valley", "Kajiado"].map((region) => (
                  <div key={region} className="flex items-center space-x-3">
                    <Checkbox id={`region-${region}`} />
                    <Label htmlFor={`region-${region}`} className="text-sm text-muted-foreground">{region}</Label>
                  </div>
                ))}
              </div>
              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Price Range (Ksh)</h4>
                <div className="space-y-2">
                  <Input placeholder="Min" type="number" className="bg-secondary" />
                  <Input placeholder="Max" type="number" className="bg-secondary" />
                </div>
              </div>
              {/* Land Size */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Size</h4>
                {["1/8 Acre", "1/4 Acre", "1/2 Acre", "1+ Acres"].map((size) => (
                  <div key={size} className="flex items-center space-x-3">
                    <Checkbox id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`} className="text-sm text-muted-foreground">{size}</Label>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-[#1B4332] hover:bg-[#1B4332]/90">Apply Filters</Button>
            </div>
          </div>
        </aside>
        {/* Property Grid */}
        <div className="flex-1 space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-secondary/30 p-4 rounded-2xl border border-border">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by location or name..."
                className="pl-10 bg-background border-none shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Showing {properties ? filteredProperties.length : 0} results</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties === undefined ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />
              ))
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <h3 className="text-xl font-bold mb-2">No properties found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}