import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { QrCode, ScanLine, Timer, CheckCircle2, RefreshCw, Camera } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";

const ROTATE_SEC = 8;

function genToken(session: string) {
  return `EDU|${session}|${Date.now()}|${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function Attendance() {
  const [session, setSession] = useState("CS101-LAB-A");
  const [token, setToken] = useState(() => genToken("CS101-LAB-A"));
  const [secs, setSecs] = useState(ROTATE_SEC);
  const [running, setRunning] = useState(true);
  const [marked, setMarked] = useState<{ id: string; name: string; time: string }[]>([]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          setToken(genToken(session));
          return ROTATE_SEC;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, session]);

  const restart = () => {
    setToken(genToken(session));
    setSecs(ROTATE_SEC);
  };

  return (
    <div className="container py-16 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold">QR <span className="text-gradient">Attendance</span></h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
        Teacher displays a rotating QR (every {ROTATE_SEC}s). Only students physically present can scan & mark in time.
      </p>

      <Tabs defaultValue="teacher" className="mt-10">
        <TabsList className="grid w-full md:w-96 grid-cols-2">
          <TabsTrigger value="teacher"><QrCode className="h-4 w-4 mr-2" /> Teacher</TabsTrigger>
          <TabsTrigger value="student"><ScanLine className="h-4 w-4 mr-2" /> Student</TabsTrigger>
        </TabsList>

        <TabsContent value="teacher" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-8 bg-card-grad border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-xs text-muted-foreground">Session</Label>
                  <Input
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    className="mt-1 font-semibold"
                  />
                </div>
                <Badge className="bg-success/15 text-success ml-3">LIVE</Badge>
              </div>

              <div className="mt-8 grid place-items-center">
                <div className="relative p-6 bg-background rounded-3xl shadow-elegant">
                  <QRCodeSVG value={token} size={260} level="H" includeMargin />
                  <div className="absolute -top-2 -right-2 h-12 w-12 rounded-full bg-hero text-primary-foreground grid place-items-center font-bold shadow-glow">
                    {secs}s
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4 text-primary" />
                  Rotates every {ROTATE_SEC} seconds
                </div>
                <div className="mt-4 flex gap-2">
                  <Button onClick={restart} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" /> Restart
                  </Button>
                  <Button onClick={() => setRunning(!running)} className="bg-hero">
                    {running ? "Pause" : "Resume"}
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/60">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Live Roster</h3>
                <Badge variant="secondary">{marked.length} marked</Badge>
              </div>
              <div className="mt-4 space-y-2 max-h-[460px] overflow-auto pr-2">
                {marked.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Waiting for students to scan…</p>
                ) : (
                  marked.map((m) => (
                    <div key={m.id + m.time} className="flex items-center justify-between p-3 rounded-lg bg-secondary/60 border border-border/60">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">Roll: {m.id}</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-success">
                        <CheckCircle2 className="h-4 w-4" /> {m.time}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/15 text-xs text-muted-foreground">
                <strong className="text-primary">Demo:</strong> add a sample mark
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2 h-7"
                  onClick={() =>
                    setMarked((m) => [
                      { id: `R${1000 + m.length}`, name: `Student ${m.length + 1}`, time: new Date().toLocaleTimeString() },
                      ...m,
                    ])
                  }
                >
                  + Add
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="student" className="mt-6">
          <StudentScanner currentToken={token} secsLeft={secs} onMarked={(name, id) => {
            setMarked((m) => [{ id, name, time: new Date().toLocaleTimeString() }, ...m]);
          }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StudentScanner({
  currentToken, secsLeft, onMarked,
}: { currentToken: string; secsLeft: number; onMarked: (n: string, i: string) => void }) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [scanning, setScanning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const start = async () => {
    if (!name || !roll) {
      toast.error("Enter your name and roll number");
      return;
    }
    setScanning(true);
    const html5 = new Html5Qrcode("reader");
    try {
      await html5.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 240 },
        (decoded) => {
          const parts = decoded.split("|");
          if (parts[0] !== "EDU") {
            setLastResult("Invalid QR");
            return;
          }
          const tokenTime = Number(parts[2]);
          if (Date.now() - tokenTime > ROTATE_SEC * 1000 + 1500) {
            setLastResult("QR expired — be in class & scan the live one");
            toast.error("QR expired");
            return;
          }
          onMarked(name, roll);
          toast.success("Attendance marked!");
          setLastResult(`Marked at ${new Date().toLocaleTimeString()}`);
          html5.stop().then(() => setScanning(false));
        },
        () => {}
      );
    } catch {
      toast.error("Camera not available — using demo mode");
      setScanning(false);
    }
  };

  const demoScan = () => {
    if (!name || !roll) return toast.error("Enter your details");
    onMarked(name, roll);
    toast.success("Attendance marked (demo)");
    setLastResult(`Marked at ${new Date().toLocaleTimeString()}`);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6 border-border/60">
        <h3 className="font-semibold text-lg">Your details</h3>
        <div className="mt-4 space-y-3">
          <div>
            <Label>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aarav Sharma" />
          </div>
          <div>
            <Label>Roll Number</Label>
            <Input value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="e.g. R1023" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={start} className="bg-hero flex-1" disabled={scanning}>
              <Camera className="h-4 w-4 mr-2" /> {scanning ? "Scanning…" : "Open Camera"}
            </Button>
            <Button onClick={demoScan} variant="outline">Demo Scan</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Live token expires in <strong>{secsLeft}s</strong>. Be in class and scan within the window.
          </p>
          {lastResult && (
            <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/15 text-sm">{lastResult}</div>
          )}
        </div>
      </Card>
      <Card className="p-6 border-border/60">
        <h3 className="font-semibold text-lg">Camera</h3>
        <div id="reader" className="mt-4 rounded-xl overflow-hidden bg-secondary min-h-[260px] grid place-items-center text-sm text-muted-foreground">
          {!scanning && "Camera preview will appear here"}
        </div>
        <div className="mt-3 text-xs text-muted-foreground break-all">
          Current token: <code className="text-primary">{currentToken.slice(0, 32)}…</code>
        </div>
      </Card>
    </div>
  );
}
