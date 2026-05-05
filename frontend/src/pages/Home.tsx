import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  QrCode, Users, BookOpen, BarChart3, Shield, Zap,
  CheckCircle2, ArrowRight, Sparkles, Layout as LayoutIcon, Calendar, Bell
} from "lucide-react";
import hero from "@/assets/hero-classroom.jpg";

const features = [
  { icon: QrCode, title: "QR Attendance", desc: "Rotating 8-second QR ensures only present students can mark attendance." },
  { icon: LayoutIcon, title: "Lab Seat Plan", desc: "Auto-allocate seats by roll number for every lab session." },
  { icon: Users, title: "Student Roster", desc: "Manage classes, sections, and batches in one clean dashboard." },
  { icon: BarChart3, title: "Live Analytics", desc: "Attendance trends, lab utilization, and engagement scores." },
  { icon: Calendar, title: "Smart Timetable", desc: "Auto-synced schedules with conflict detection." },
  { icon: Bell, title: "Real-time Alerts", desc: "Instant notifications for low attendance & lab clashes." },
];

const stats = [
  { v: "120+", l: "Institutions" },
  { v: "85K+", l: "Students" },
  { v: "1.2M+", l: "Sessions Tracked" },
  { v: "99.9%", l: "Uptime" },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-card-grad" />
        <div className="container relative py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Smart Classroom Platform
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Reimagine your <span className="text-gradient">classroom</span> & lab experience
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              SmartClass brings QR attendance, automated lab seating, real-time analytics, and seamless engagement
              for modern institutions — all in one beautiful platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-hero shadow-elegant hover:shadow-glow transition-smooth">
                <Link to="/attendance">Try QR Attendance <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Free for institutions", "Setup in minutes", "GDPR-ready"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-hero rounded-3xl opacity-20 blur-3xl" />
            <img
              src={hero}
              alt="SmartClass smart classroom dashboard"
              width={1600}
              height={1024}
              className="relative rounded-2xl shadow-elegant border border-border"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.l} className="p-6 text-center bg-card-grad border-primary/10">
              <div className="text-3xl md:text-4xl font-bold text-gradient">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Everything your campus needs</h2>
          <p className="mt-3 text-muted-foreground">Designed with educators, built for the modern classroom.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="p-6 hover:shadow-elegant transition-smooth hover:-translate-y-1 border-border/60">
              <div className="h-11 w-11 rounded-xl bg-hero grid place-items-center shadow-soft">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl bg-hero p-10 md:p-14 text-primary-foreground shadow-elegant relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold">Ready to digitize your campus?</h3>
              <p className="mt-3 opacity-90">Join 120+ institutions using SmartClass to run smarter classrooms.</p>
            </div>
            <div className="flex md:justify-end gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Talk to us</Link>
              </Button>
              <Button size="lg" asChild className="bg-background text-primary hover:bg-background/90">
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
