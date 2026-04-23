import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
const REGIONS = ["Nairobi", "Kiambu", "Coastal", "Rift Valley", "Kajiado"];
const SIZES = ["1/8 Acre", "1/4 Acre", "1/2 Acre", "1+ Acres", "5 Acres", "10 Acres"];
export function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const properties = useQuery(api.properties.get);
  // Filter States
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    searchParams.get("regions")?.split(",").filter(Boolean) || []
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    searchParams.get("sizes")?.split(",").filter(Boolean) || []
  );
  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedRegions.length) params.set("regions", selectedRegions.join(","));
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (selectedSizes.length) params.set("sizes", selectedSizes.join(","));
    setSearchParams(params, { replace: true });
  }, [search, selectedRegions, minPrice, maxPrice, selectedSizes, setSearchParams]);
  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    return properties.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesRegion =
        selectedRegions.length === 0 || selectedRegions.includes(p.region);
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.some(s => p.size.includes(s));
      const price = p.price;
      const matchesMinPrice = !minPrice || price >= parseInt(minPrice);
      const matchesMaxPrice = !maxPrice || price <= parseInt(maxPrice);
      return matchesSearch && matchesRegion && matchesSize && matchesMinPrice && matchesMaxPrice;
    });
  }, [properties, search, selectedRegions, selectedSizes, minPrice, maxPrice]);
  const clearFilters = () => {
    setSearch("");
    setSelectedRegions([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedSizes([]);
  };
  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };
  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };
  const hasActiveFilters = search || selectedRegions.length > 0 || minPrice || maxPrice || selectedSizes.length > 0;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-8 bg-card p-6 rounded-3xl border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#1B4332]" /> Filters
              </h3>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-destructive h-8 px-2"
                >
                  <X className="h-3 w-3 mr-1" /> Clear
                </Button>
              )}
            </div>
            <div className="space-y-8">
              {/* Region Filter */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Region</h4>
                <div className="space-y-3">
                  {REGIONS.map((region) => (
                    <div key={region} className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox 
                        id={`region-${region}`} 
                        checked={selectedRegions.includes(region)}
                        onCheckedChange={() => handleRegionToggle(region)}
                      />
                      <Label htmlFor={`region-${region}`} className="text-sm text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer">
                        {region}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Budget (Ksh)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    placeholder="Min" 
                    type="number" 
                    className="bg-secondary/50 border-none h-10" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Input 
                    placeholder="Max" 
                    type="number" 
                    className="bg-secondary/50 border-none h-10" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              {/* Land Size */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Land Size</h4>
                <div className="grid grid-cols-2 gap-2">
                  {SIZES.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`size-${size}`} 
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={() => handleSizeToggle(size)}
                      />
                      <Label htmlFor={`size-${size}`} className="text-xs text-muted-foreground cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
        {/* Property Grid */}
        <div className="flex-1 space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-card p-4 rounded-2xl border border-border shadow-sm">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search location, name..."
                className="pl-10 bg-secondary/30 border-none shadow-none focus-visible:ring-1 focus-visible:ring-[#1B4332]"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
              <SlidersHorizontal className="h-4 w-4" />
              <span>{properties ? filteredProperties.length : 0} Available Plots</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties === undefined ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[420px] w-full rounded-3xl" />
              ))
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-secondary/10 rounded-4xl border-2 border-dashed border-border/50">
                <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">No matches found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                  We couldn't find any properties matching your current filters. Try broadening your search.
                </p>
                <Button onClick={clearFilters} className="bg-[#1B4332] rounded-xl px-8">
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}