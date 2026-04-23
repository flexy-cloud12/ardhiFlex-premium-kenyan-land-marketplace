import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ShieldCheck, TrendingUp, Users, Loader2, Sparkles } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const properties = useQuery(api.properties.get);
  const seedDatabase = useMutation(api.properties.seed);
  const [isSeeding, setIsSeeding] = useState(false);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/properties");
    }
  };
  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      toast.success("Database seeded with premium mock data!");
    } catch (error) {
      toast.error("Failed to seed database.");
    } finally {
      setIsSeeding(false);
    }
  };
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Kenyan Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1B4332]/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 text-[#D4A373]" />
              <span>Verified Listings Only</span>
            </div>
            <h1 className="text-display max-w-4xl mx-auto font-display font-bold leading-[1.1]">
              Secure Your Future with <span className="text-[#D4A373] italic">Premium Kenyan Land</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              ArDhiflex provides verified titles, breathtaking locations, and hassle-free transactions for locals and the global diaspora.
            </p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-12">
              <div className="flex items-center bg-white rounded-2xl p-2 shadow-2xl border-4 border-white/10 group focus-within:ring-4 focus-within:ring-[#D4A373]/30 transition-all">
                <div className="flex-1 flex items-center px-4 text-gray-500 border-r border-gray-100">
                  <MapPin className="h-5 w-5 mr-3 text-[#1B4332]" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Tigoni, Diani, Kajiado..."
                    className="border-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-400 text-lg h-12"
                  />
                </div>
                <Button type="submit" className="bg-[#1B4332] hover:bg-[#1B4332]/90 rounded-xl px-8 h-12 shadow-md hover:shadow-lg transition-all active:scale-95">
                  <Search className="h-5 w-5 mr-2" /> Explore
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {["Tigoni", "Diani Beach", "Kajiado", "Naivasha"].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="text-sm px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* Featured Lands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">Curated Opportunities</h2>
            <p className="text-muted-foreground text-lg md:text-xl">Discover hand-picked premium listings with verified documentation and high investment potential.</p>
          </div>
          <div className="flex gap-4">
             {properties?.length === 0 && (
                <Button
                  onClick={handleSeed}
                  disabled={isSeeding}
                  variant="outline"
                  className="border-dashed border-2 border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373]/10"
                >
                  {isSeeding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Seed Marketplace
                </Button>
              )}
            <Button asChild size="lg" variant="outline" className="hidden sm:flex border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white rounded-2xl">
              <Link to="/properties">Browse All Plots</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties === undefined ? (
            [1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[440px] w-full rounded-[2.5rem]" />
            ))
          ) : properties.length > 0 ? (
            properties.slice(0, 3).map((property, idx) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-secondary/30 rounded-[3rem] border-2 border-dashed border-border/60">
              <p className="text-muted-foreground text-lg mb-4">No listings found in the marketplace yet.</p>
              <Button onClick={handleSeed} disabled={isSeeding} className="bg-[#1B4332]">
                 Initialize Sample Data
              </Button>
            </div>
          )}
        </div>
      </section>
      {/* Trust Section */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-display text-4xl font-display font-bold mb-6 tracking-tight">Why Invest with ArDhiflex?</h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-light">We provide the layer of trust and transparency needed for seamless property ownership in the Kenyan market.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: ShieldCheck, title: "100% Verified Titles", desc: "Every plot is cross-checked with the Ministry of Lands and local authorities before appearing on our platform." },
            { icon: TrendingUp, title: "Investment Hotspots", desc: "We focus on high-growth corridors like Kiambu and Naivasha, ensuring maximum ROI for long-term investors." },
            { icon: Users, title: "Diaspora Support", desc: "ArDhiflex offers dedicated support for Kenyans abroad with virtual site visits and secure remote legal handling." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6 p-10 bg-background rounded-[2.5rem] shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500"
            >
              <div className="h-20 w-20 rounded-3xl bg-[#1B4332]/5 flex items-center justify-center text-[#1B4332] group-hover:scale-110 transition-transform">
                <item.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}