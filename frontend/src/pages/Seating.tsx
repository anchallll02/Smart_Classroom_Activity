import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, User } from "lucide-react";

export default function Seating() {
  const [lab, setLab] = useState("Programming Lab A");
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(10);
  const [startRoll, setStartRoll] = useState(1001);
  const [count, setCount] = useState(50);
  const [prefix, setPrefix] = useState("R");

  const seats = useMemo(() => {
    const total = rows * cols;
    const arr: { seat: string; roll: string | null }[] = [];
    for (let i = 0; i < total; i++) {
      const r = Math.floor(i / cols) + 1;
      const c = (i % cols) + 1;
      const seat = `${String.fromCharCode(64 + r)}${c}`;
      arr.push({ seat, roll: i < count ? `${prefix}${startRoll + i}` : null });
    }
    return arr;
  }, [rows, cols, startRoll, count, prefix]);

  return (
    <div className="container py-16 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold">Lab <span className="text-gradient">Seat Plan</span></h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
        Auto-allocate seats by roll number. Configure the lab grid and student range below.
      </p>

      <div className="mt-8 grid lg:grid-cols-[320px_1fr] gap-6">
        <Card className="p-6 border-border/60 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Configuration</h3>
          </div>
          <div className="space-y-3">
            <div><Label>Lab name</Label><Input value={lab} onChange={(e) => setLab(e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Rows</Label><Input type="number" value={rows} onChange={(e) => setRows(+e.target.value || 1)} /></div>
              <div><Label>Cols</Label><Input type="number" value={cols} onChange={(e) => setCols(+e.target.value || 1)} /></div>
            </div>
            <div><Label>Roll prefix</Label><Input value={prefix} onChange={(e) => setPrefix(e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Start roll</Label><Input type="number" value={startRoll} onChange={(e) => setStartRoll(+e.target.value || 0)} /></div>
              <div><Label>Students</Label><Input type="number" value={count} onChange={(e) => setCount(+e.target.value || 0)} /></div>
            </div>
            <Button className="w-full bg-hero mt-2" onClick={() => window.print()}>Print Plan</Button>
          </div>
        </Card>

        <Card className="p-6 border-border/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{lab}</h3>
            <Badge variant="secondary">{count} / {rows * cols} seats</Badge>
          </div>
          <div className="mb-4 mx-auto w-2/3 h-2 rounded-full bg-hero opacity-70" />
          <div className="text-center text-xs text-muted-foreground mb-4">— Teacher's Desk —</div>

          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {seats.map((s) => (
              <div
                key={s.seat}
                className={`aspect-square rounded-lg border text-xs flex flex-col items-center justify-center transition-smooth ${
                  s.roll
                    ? "bg-card-grad border-primary/30 hover:shadow-soft"
                    : "bg-muted/40 border-dashed border-border text-muted-foreground"
                }`}
              >
                <div className="font-semibold">{s.seat}</div>
                {s.roll ? (
                  <div className="flex items-center gap-1 mt-0.5 text-primary">
                    <User className="h-3 w-3" />
                    <span className="text-[10px]">{s.roll}</span>
                  </div>
                ) : (
                  <div className="text-[10px]">Empty</div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
