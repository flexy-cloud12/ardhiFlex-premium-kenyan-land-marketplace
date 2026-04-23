import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockProperties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CheckCircle2, MapPin, Ruler, Share2, Heart, ShieldCheck, ArrowLeft } from "lucide-react";
export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find((p) => p.id === id);
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Button asChild className="mt-4"><Link to="/properties">Back to Catalog</Link></Button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/properties"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties</Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold">{property.title}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {property.location}</div>
          <div className="flex items-center gap-1"><Ruler className="h-4 w-4" /> {property.size}</div>
          {property.verified && (
            <div className="flex items-center gap-1 text-green-600 font-medium">
              <ShieldCheck className="h-4 w-4" /> Verified Title
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Gallery & Content */}
        <div className="lg:col-span-2 space-y-12">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, idx) => (
                <CarouselItem key={idx}>
                  <div className="aspect-video rounded-3xl overflow-hidden">
                    <img src={image} alt={`${property.title} - ${idx}`} className="w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">About this Property</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Amenities & Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 p-4 bg-secondary rounded-2xl">
                  <CheckCircle2 className="h-5 w-5 text-[#1B4332]" />
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Sticky Card */}
        <div className="relative">
          <Card className="sticky top-24 border-border/50 shadow-xl rounded-3xl overflow-hidden">
            <div className="bg-[#1B4332] p-6 text-white text-center">
              <p className="text-sm text-white/70 uppercase tracking-widest mb-1">Asking Price</p>
              <h2 className="text-3xl font-bold">Ksh {property.price.toLocaleString()}</h2>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm py-2 border-b">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-semibold">{property.region}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b">
                  <span className="text-muted-foreground">Total Area</span>
                  <span className="font-semibold">{property.size}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-semibold">Agricultural/Residential</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full h-12 bg-[#1B4332] hover:bg-[#1B4332]/90 text-lg">Inquire Now</Button>
                <Button variant="outline" className="w-full h-12">Download Brochure</Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                By clicking "Inquire Now", you agree to share your contact details with our verified agents.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}