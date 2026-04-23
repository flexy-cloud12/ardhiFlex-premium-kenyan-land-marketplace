import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, MapPin, Ruler, Share2, Heart, ShieldCheck, ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
  const [hasCopied, setHasCopied] = useState(false);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setHasCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };
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
    if (!inquiryName || !inquiryEmail || !inquiryMsg) {
      toast.error("Please fill all required fields");
      return;
    }
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
      setInquiryMsg("I am interested in this property. Please provide more details.");
    } catch (e) {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (property === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#1B4332]/20 border-t-[#1B4332] animate-spin" />
        </div>
        <p className="text-muted-foreground font-display text-lg animate-pulse">ArDhiflex is gathering plot details...</p>
      </div>
    );
  }
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
        <div className="h-24 w-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
          <MapPin className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-display font-bold">Property not found</h1>
        <p className="text-muted-foreground max-w-md mx-auto">This listing might have been removed or the link is incorrect in the ArDhiflex system.</p>
        <Button asChild className="bg-[#1B4332] rounded-xl px-8 h-12"><Link to="/properties">Back to Marketplace</Link></Button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Button variant="ghost" asChild className="mb-6 hover:bg-secondary rounded-xl text-muted-foreground hover:text-foreground">
          <Link to="/properties"><ArrowLeft className="mr-2 h-4 w-4" /> Browse All Properties</Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#1B4332]" /> {property.location}</div>
              <div className="flex items-center gap-1.5"><Ruler className="h-4 w-4 text-[#1B4332]" /> {property.size}</div>
              {property.verified && (
                <div className="flex items-center gap-1.5 text-[#1B4332] bg-[#1B4332]/10 px-3 py-1 rounded-full text-sm">
                  <ShieldCheck className="h-4 w-4" /> Verified Title
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="rounded-2xl border-border hover:bg-secondary transition-all"
            >
              {hasCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              <span className="ml-2 hidden sm:inline">{hasCopied ? "Copied" : "Share"}</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleToggleFavorite}
              className={cn(
                "rounded-2xl transition-all",
                isFav ? "text-red-500 bg-red-50 border-red-200 hover:bg-red-100" : "hover:bg-secondary"
              )}
            >
              <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
              <span className="ml-2 hidden sm:inline">{isFav ? "Saved" : "Save"}</span>
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="relative group">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, idx) => (
                  <CarouselItem key={idx}>
                    <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-secondary shadow-lg">
                      <img src={image} alt={`${property.title} - ${idx}`} className="w-full h-full object-cover select-none" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 bg-white/80 hover:bg-white backdrop-blur-md border-none" />
                <CarouselNext className="static translate-y-0 h-10 w-10 bg-white/80 hover:bg-white backdrop-blur-md border-none" />
              </div>
            </Carousel>
          </div>
          <div className="space-y-8 bg-card p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-sm">
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">About this Property</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                {property.description}
              </p>
            </div>
            <div className="pt-8 border-t">
              <h3 className="text-2xl font-display font-bold mb-6">Amenities & Infrastructure</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 p-4 bg-secondary/50 rounded-2xl border border-border/30 hover:border-[#1B4332]/30 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-[#1B4332]/5 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-[#1B4332]" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-28"
          >
            <Card className="border-border shadow-2xl rounded-[2.5rem] overflow-hidden border-t-8 border-t-[#1B4332]">
              <div className="bg-secondary/30 p-8 text-center border-b border-border/50">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-1">Total Valuation</p>
                <h2 className="text-4xl font-display font-bold text-[#E07A5F]">
                  Ksh {property.price.toLocaleString()}
                </h2>
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/40">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-bold text-foreground">{property.region}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/40">
                    <span className="text-muted-foreground">Verified Plot</span>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4" /> Yes
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/40">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-bold text-foreground">{property.size}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full h-14 bg-[#1B4332] hover:bg-[#1B4332]/90 text-lg rounded-2xl shadow-lg hover:shadow-[#1B4332]/20 transition-all">
                        Inquire Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl p-8">
                      <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-display font-bold">Express Interest</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Send a direct inquiry for <span className="font-bold text-foreground">{property.title}</span> via ArDhiflex.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleInquiry} className="space-y-5">
                        <div className="space-y-2">
                          <Input
                            placeholder="Full Name"
                            required
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            className="bg-secondary/50 border-none rounded-xl h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            className="bg-secondary/50 border-none rounded-xl h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Your Message"
                            required
                            rows={4}
                            value={inquiryMsg}
                            onChange={(e) => setInquiryMsg(e.target.value)}
                            className="bg-secondary/50 border-none rounded-xl resize-none p-4"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-[#1B4332] h-12 rounded-xl"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                          {isSubmitting ? "Sending..." : "Submit Inquiry"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-border hover:bg-secondary">
                    View Documents
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">ArDhiflex agents usually respond &lt; 24 hours</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}