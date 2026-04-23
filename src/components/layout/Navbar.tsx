import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SignOutButton } from "@/components/SignOutButton";
import { Authenticated, Unauthenticated } from "convex/react";
import { MapPin, Heart, Menu, Home, LandPlot, Info, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
export function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Buy Land", path: "/properties", icon: LandPlot },
    { label: "Saved", path: "/saved", icon: Heart },
    { label: "About", path: "/about", icon: Info },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center gap-2 group">
                <div className="h-9 w-9 rounded-xl bg-[#1B4332] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold tracking-tight text-foreground">
                  Ardhi<span className="text-[#D4A373]">Haven</span>
                </span>
              </Link>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * idx }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-sm font-medium transition-all hover:text-[#1B4332] relative py-1",
                      pathname === link.path ? "text-[#1B4332]" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                    {pathname === link.path && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B4332] rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle className="static" />
              <Authenticated>
                <Link to="/saved">
                   <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                     <Heart className={cn("h-5 w-5", pathname === "/saved" && "fill-red-500 text-red-500")} />
                   </Button>
                </Link>
                <SignOutButton />
              </Authenticated>
              <Unauthenticated>
                <Button asChild variant="default" className="bg-[#1B4332] hover:bg-[#1B4332]/90 rounded-xl px-6 shadow-md hover:shadow-lg transition-all">
                  <Link to="/login">Sign In</Link>
                </Button>
              </Unauthenticated>
            </div>
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle className="static" />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] rounded-l-3xl border-none">
                  <SheetHeader className="pb-8 border-b">
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-[#1B4332] flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-display font-bold">ArdhiHaven</span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-2 py-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-2xl text-lg font-medium transition-all",
                          pathname === link.path 
                            ? "bg-[#1B4332]/10 text-[#1B4332]" 
                            : "text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        <link.icon className={cn("h-5 w-5", pathname === link.path ? "text-[#1B4332]" : "text-muted-foreground")} />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="absolute bottom-8 left-6 right-6 space-y-4">
                    <Authenticated>
                      <div className="p-4 rounded-2xl bg-secondary/50 flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-[#1B4332] flex items-center justify-center text-white font-bold">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="text-sm">
                          <p className="font-bold">Active Session</p>
                          <p className="text-muted-foreground text-xs">Logged in</p>
                        </div>
                      </div>
                      <SignOutButton />
                    </Authenticated>
                    <Unauthenticated>
                      <Button asChild className="w-full bg-[#1B4332] rounded-2xl h-12 text-lg">
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In / Register</Link>
                      </Button>
                    </Unauthenticated>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}