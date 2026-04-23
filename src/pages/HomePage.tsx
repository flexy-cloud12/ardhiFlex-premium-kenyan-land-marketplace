import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
export function HomePage() {
  const properties = useQuery(api.properties.get);
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
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-display max-w-4xl mx-auto font-display font-bold">
              Secure Your Future with <span className="text-[#D4A373]">Premium Kenyan Land</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
              Verified titles, breathtaking locations, and hassle-free transactions for locals and the diaspora.
            </p>
            <div className="max-w-2xl mx-auto mt-12">
              <div className="flex items-center bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex-1 flex items-center px-4 text-gray-500 border-r border-gray-200">
                  <MapPin className="h-5 w-5 mr-2 text-[#1B4332]" />
                  <Input
                    placeholder="Where would you like to buy?"
                    className="border-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <Button className="bg-[#1B4332] hover:bg-[#1B4332]/90 rounded-xl px-8 h-12">
                  <Search className="h-5 w-5 mr-2" /> Search
                </Button>
              </div>
              <p className="mt-4 text-sm text-white/80">Try: "Tigoni", "Diani Beach", "Kajiado"</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Featured Lands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold text-foreground">Featured Land Opportunities</h2>
            <p className="text-muted-foreground text-lg">Hand-picked premium listings with verified documentation.</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white">
            <Link to="/properties">View All Plots</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties === undefined ? (
            [1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />
            ))
          ) : (
            properties.slice(0, 3).map((property, idx) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          )}
        </div>
      </section>
      {/* Trust Section */}
      <section className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Why Invest with ArdhiHaven?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We provide the layer of trust and transparency needed for seamless property ownership in Kenya.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "100% Verified", desc: "Every title deed is cross-checked with the Ministry of Lands before listing." },
            { icon: TrendingUp, title: "High Appreciation", desc: "We list properties in high-growth corridors ensuring maximum ROI for investors." },
            { icon: Users, title: "Diaspora Friendly", desc: "Dedicated support for Kenyans abroad with virtual tours and remote legal assistance." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 p-8 bg-background rounded-3xl shadow-sm border border-border/50">
              <div className="h-16 w-16 rounded-2xl bg-[#1B4332]/5 flex items-center justify-center text-[#1B4332]">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}