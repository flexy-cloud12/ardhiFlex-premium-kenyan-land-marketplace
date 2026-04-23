import React from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { PropertyCard } from "@/components/PropertyCard";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Home, LogIn } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export function SavedPropertiesPage() {
  const favorites = useQuery(api.favorites.listMyFavorites);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-16">
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-display font-bold">My Saved Plots</h1>
          <p className="text-muted-foreground text-lg">Keep track of the properties you're most interested in.</p>
        </div>
        <Authenticated>
          {favorites === undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />
              ))}
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-secondary/30 rounded-4xl border-2 border-dashed border-border">
              <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                <Heart className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No saved plots yet</h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Explore our catalog and click the heart icon on any property to save it here.
              </p>
              <Button asChild className="bg-[#1B4332] hover:bg-[#1B4332]/90">
                <Link to="/properties">Browse Properties</Link>
              </Button>
            </div>
          )}
        </Authenticated>
        <Unauthenticated>
          <div className="text-center py-24 bg-secondary/30 rounded-4xl border-2 border-dashed border-border">
            <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
              <LogIn className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Sign in to save properties</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              You need an account to save properties and track your inquiries across sessions.
            </p>
            <Button asChild className="bg-[#1B4332] hover:bg-[#1B4332]/90">
              <Link to="/login">Sign In / Register</Link>
            </Button>
          </div>
        </Unauthenticated>
      </div>
    </div>
  );
}