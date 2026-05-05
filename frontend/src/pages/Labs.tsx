import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlaskConical, Cpu, Code2, Microscope, Zap, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const labs = [
  { icon: Code2, name: "Programming Lab A", capacity: 60, equipment: "60 PCs · Linux + Win11", status: "Available" },
  { icon: Cpu, name: "Hardware Lab", capacity: 40, equipment: "FPGA Kits · Oscilloscopes", status: "Occupied" },
  { icon: FlaskConical, name: "Chemistry Lab", capacity: 30, equipment: "Fume hoods · Reagents", status: "Available" },
  { icon: Microscope, name: "Biotech Lab", capacity: 25, equipment: "Microscopes · Centrifuge", status: "Maintenance" },
  { icon: Zap, name: "Electrical Lab", capacity: 50, equipment: "Power benches · Multimeters", status: "Available" },
  { icon: Wifi, name: "Networking Lab", capacity: 35, equipment: "Cisco gear · Servers", status: "Available" },
];

const statusColor = (s: string) =>
  s === "Available" ? "bg-success/15 text-success" : s === "Occupied" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground";

export default function Labs() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="container py-16 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold">Smart <span className="text-gradient">Labs</span></h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Modern, equipped labs with auto seat allocation, attendance, and real-time monitoring.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((l) => (
          <Card
            key={l.name}
            onClick={() => setSelected(selected === l.name ? null : l.name)}
            className={`p-6 cursor-pointer transition-smooth border-border/60 hover:shadow-elegant hover:-translate-y-1 ${
              selected === l.name ? "ring-2 ring-primary shadow-elegant" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="h-11 w-11 rounded-xl bg-hero grid place-items-center shadow-soft">
                <l.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <Badge className={statusColor(l.status)}>{l.status}</Badge>
            </div>
            <h3 className="mt-4 font-semibold text-lg">{l.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{l.equipment}</p>
            <div className="mt-3 text-sm">Capacity: <strong>{l.capacity}</strong></div>
            {selected === l.name && (
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2 animate-fade-in">
                <Button asChild size="sm" className="bg-hero">
                  <Link to="/seating">View Seat Plan</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/attendance">Take Attendance</Link>
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
