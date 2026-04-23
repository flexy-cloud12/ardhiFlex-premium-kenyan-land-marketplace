import React from "react";
import { SignInForm } from "@/components/SignInForm";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { motion } from "framer-motion";
export function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side: Visual */}
        <div className="hidden lg:block relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200"
            alt="Kenyan Landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/80 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-display font-bold mb-4">Invest in the Heart of Africa</h2>
              <p className="text-lg text-white/80 max-w-md">
                Join ArdhiHaven to track your favorite plots and connect with verified land agents across Kenya.
              </p>
            </motion.div>
          </div>
        </div>
        {/* Right Side: Form */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <Link to="/" className="inline-flex items-center gap-2 mb-8">
                <div className="h-10 w-10 rounded-xl bg-[#1B4332] flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight">
                  Ardhi<span className="text-[#D4A373]">Haven</span>
                </span>
              </Link>
              <h1 className="text-3xl font-display font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to manage your property portfolio</p>
            </div>
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-soft">
              <SignInForm />
            </div>
            <div className="text-center">
              <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}