import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-[#1B4332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                <MapPin className="h-5 w-5 text-[#1B4332]" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                ArdhiHaven
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Kenya's premium land marketplace. We connect you with verified, high-value land investments across the country.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Westlands, Nairobi</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +254 700 000 000</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@ardhihaven.co.ke</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} ArdhiHaven Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}