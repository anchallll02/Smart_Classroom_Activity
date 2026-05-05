import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Cpu, Database, Globe, FlaskConical, Sigma, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  { icon: Code2, t: "Computer Science", d: "Full-stack, DSA, AI/ML, and systems courses with hands-on labs.", duration: "4 years", level: "UG" },
  { icon: Cpu, t: "Electronics & VLSI", d: "Embedded systems, IoT, and chip design with real hardware labs.", duration: "4 years", level: "UG" },
  { icon: Database, t: "Data Science", d: "Statistics, ML pipelines, and analytics with industry datasets.", duration: "2 years", level: "PG" },
  { icon: Globe, t: "Information Tech", d: "Cloud, networking, security, and DevOps tracks.", duration: "3 years", level: "UG" },
  { icon: FlaskConical, t: "Biotechnology", d: "Wet labs, bioinformatics, and biomedical applications.", duration: "4 years", level: "UG" },
  { icon: Sigma, t: "Applied Math", d: "Numerical methods, optimization, and computational modelling.", duration: "3 years", level: "UG" },
];

export default function Programs() {
  return (
    <div className="container py-16 animate-fade-in">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold">Our <span className="text-gradient">Programs</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Modern academic programs delivered with smart classroom tools, hands-on labs, and live analytics.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p) => (
          <Card key={p.t} className="p-6 hover:shadow-elegant transition-smooth hover:-translate-y-1 border-border/60 group">
            <div className="flex items-start justify-between">
              <div className="h-11 w-11 rounded-xl bg-hero grid place-items-center shadow-soft">
                <p.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary text-primary">{p.level}</span>
            </div>
            <h3 className="mt-4 font-semibold text-lg">{p.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duration: <strong className="text-foreground">{p.duration}</strong></span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/contact">Apply <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
