import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SignOutButton } from "@/components/SignOutButton";
import { Authenticated, Unauthenticated } from "convex/react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
export function Navbar() {
  const { pathname } = useLocation();
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Buy Land", path: "/properties" },
    { label: "About", path: "/about" },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#1B4332] flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-foreground">
                Ardhi<span className="text-[#D4A373]">Haven</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle className="static" />
              <Authenticated>
                <SignOutButton />
              </Authenticated>
              <Unauthenticated>
                <Button asChild variant="default" className="bg-[#1B4332] hover:bg-[#1B4332]/90">
                  <Link to="/">Sign In</Link>
                </Button>
              </Unauthenticated>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}