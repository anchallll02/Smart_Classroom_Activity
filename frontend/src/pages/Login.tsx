import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPw, setLoginPw] = useState<string>("");

  const [signupName, setSignupName] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPw, setSignupPw] = useState<string>("");

  // LOGIN
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginEmail || !loginPw) {
      toast.error("Fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPw,
        }),
      });

      const data: { token?: string; error?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success("Login successful");
      nav("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // SIGNUP
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signupName || !signupEmail || !signupPw) {
      toast.error("Fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPw,
        }),
      });

      const data: { token?: string; error?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success("Account created");
      nav("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-hero">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>

          <h1 className="mt-4 text-3xl font-bold">
            Welcome to <span className="text-gradient">SmartClass</span>
          </h1>

          <p className="text-sm text-muted-foreground">
            Sign in or create account
          </p>
        </div>

        {/* CARD */}
        <Card className="p-6">

          <Tabs defaultValue="signin">

            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="signin">
              <form onSubmit={handleLogin} className="space-y-4">

                <div>
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4" />
                    <Input
                      className="pl-9"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4" />
                    <Input
                      type="password"
                      className="pl-9"
                      value={loginPw}
                      onChange={(e) => setLoginPw(e.target.value)}
                    />
                  </div>
                </div>

                <Button className="w-full" type="submit">
                  Sign In
                </Button>

              </form>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">

                <div>
                  <Label>Name</Label>
                  <Input
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={signupPw}
                    onChange={(e) => setSignupPw(e.target.value)}
                  />
                </div>

                <Button className="w-full" type="submit">
                  Create Account
                </Button>

              </form>
            </TabsContent>

          </Tabs>
        </Card>

      </div>
    </div>
  );
}