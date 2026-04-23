import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, MapPin, Ruler, Share2, Heart, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = useQuery(api.properties.getById, { id: id as Id<"properties"> });
  const isFav = useQuery(api.favorites.isFavorite, { propertyId: id as Id<"properties"> });
  const toggleFav = useMutation(api.favorites.toggleFavorite);
  const submitInquiry = useMutation(api.inquiries.submitInquiry);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("I am interested in this property. Please provide more details.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleToggleFavorite = async () => {
    try {
      const added = await toggleFav({ propertyId: id as Id<"properties"> });
      toast.success(added ? "Added to favorites" : "Removed from favorites");
    } catch (e) {
      toast.error("Please sign in to save properties");
    }
  };
  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitInquiry({
        propertyId: id as Id<"properties">,
        name: inquiryName,
        email: inquiryEmail,
        message: inquiryMsg,
      });
      toast.success("Inquiry sent successfully! An agent will contact you soon.");
      setOpenDialog(false);
    } catch (e) {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (property === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#1B4332]" />
        <p className="text-muted-foreground">Loading property details...</p>
      </div>
    );
  }
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
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleToggleFavorite}
              className={cn(isFav && "text-red-500 bg-red-50 border-red-200")}
            >
              <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
            </Button>
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
              </div>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full h-12 bg-[#1B4332] hover:bg-[#1B4332]/90 text-lg">Inquire Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Send Inquiry</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleInquiry} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Input 
                        placeholder="Your Name" 
                        required 
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Your Message" 
                        required 
                        rows={4} 
                        value={inquiryMsg}
                        onChange={(e) => setInquiryMsg(e.target.value)}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#1B4332]" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Submit Inquiry
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="w-full h-12">Download Brochure</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}