import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Award } from "lucide-react";

export default function About() {
  const values = [
    { icon: Target, t: "Mission", d: "Empower educators with tools that make every minute of class count." },
    { icon: Eye, t: "Vision", d: "A connected, data-driven classroom in every institution." },
    { icon: Heart, t: "Values", d: "Privacy-first, student-centric, and educator-led design." },
    { icon: Award, t: "Trust", d: "Built with security and reliability at the core." },
  ];
  return (
    <div className="container py-16 animate-fade-in">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold">About <span className="text-gradient">SmartClass</span></h1>
        <p className="mt-5 text-lg text-muted-foreground">
          We're a team of educators and engineers building the future of classroom management.
          SmartClass helps institutions run attendance, labs, and engagement workflows seamlessly.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v) => (
          <Card key={v.t} className="p-6 hover:shadow-elegant transition-smooth border-border/60">
            <div className="h-11 w-11 rounded-xl bg-hero grid place-items-center shadow-soft">
              <v.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-lg">{v.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-10">
        <Card className="p-8 bg-card-grad border-primary/10">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            SmartClass started in a university computer lab where attendance and seat allocation took longer than the
            actual lecture. We set out to fix it — and ended up reimagining the entire classroom experience.
          </p>
        </Card>
        <Card className="p-8 bg-card-grad border-primary/10">
          <h2 className="text-2xl font-bold">Why institutions love us</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• 90% reduction in attendance time</li>
            <li>• Zero-conflict lab seat allocation</li>
            <li>• Real-time engagement insights</li>
            <li>• Easy integration with existing systems</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
