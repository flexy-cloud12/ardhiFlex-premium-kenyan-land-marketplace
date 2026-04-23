"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Button
      variant="ghost"
      className="text-muted-foreground hover:text-primary hover:bg-primary/5 font-semibold transition-all duration-200 rounded-xl flex items-center gap-2 group"
      onClick={() => void signOut()}
    >
      <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
      <span>Sign out</span>
    </Button>
  );
}