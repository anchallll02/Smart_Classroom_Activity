import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch.");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div className="container py-16 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold">Get in <span className="text-gradient">Touch</span></h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
        Questions, demos, or partnership ideas — we'd love to hear from you.
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_400px] gap-8">
        <Card className="p-8 border-border/60">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            </div>
            <div><Label>Message</Label><Textarea rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <Button type="submit" size="lg" className="bg-hero shadow-soft">
              <Send className="h-4 w-4 mr-2" /> Send Message
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          {[
            { icon: Mail, t: "Email", v: "hello@edupulse.io" },
            { icon: Phone, t: "Phone", v: "+91 98765 43210" },
            { icon: MapPin, t: "Office", v: "Bengaluru, India" },
          ].map((c) => (
            <Card key={c.t} className="p-5 flex items-center gap-4 border-border/60 hover:shadow-soft transition-smooth">
              <div className="h-11 w-11 rounded-xl bg-hero grid place-items-center shadow-soft">
                <c.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{c.t}</div>
                <div className="font-semibold">{c.v}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
