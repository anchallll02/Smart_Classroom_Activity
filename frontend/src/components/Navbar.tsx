import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/labs", label: "Labs" },
  { to: "/attendance", label: "Attendance" },
  { to: "/seating", label: "Seat Plan" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-hero shadow-soft group-hover:shadow-glow transition-smooth">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">SmartClass</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-smooth hover:text-primary hover:bg-secondary ${
                pathname === l.to ? "text-primary bg-secondary" : "text-foreground/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-hero hover:opacity-90 shadow-soft">
            <Link to="/login">Get Started</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background animate-fade-in">
          <div className="container py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === l.to ? "text-primary bg-secondary" : "text-foreground/80 hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild className="flex-1">
                <Link to="/login" onClick={() => setOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild className="flex-1 bg-hero">
                <Link to="/login" onClick={() => setOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
