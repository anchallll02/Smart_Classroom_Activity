import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/40">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-hero shadow-soft">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">SmartClass</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Smart classroom platform empowering institutions with QR attendance, lab seating, and engagement analytics.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Linkedin, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-smooth">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/programs" className="hover:text-primary">Programs</Link></li>
            <li><Link to="/labs" className="hover:text-primary">Labs</Link></li>
            <li><Link to="/attendance" className="hover:text-primary">Attendance</Link></li>
            <li><Link to="/seating" className="hover:text-primary">Seat Plan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
            <li><a href="#" className="hover:text-primary">Terms</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary" /> hello@edupulse.io</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary" /> Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SmartClass. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
