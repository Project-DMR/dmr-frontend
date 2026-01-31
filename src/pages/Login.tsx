import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [factoryCode, setFactoryCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(email, password, factoryCode);
    if (success) {
      navigate("/home");
    } else {
      setError("Invalid credentials or factory code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8f5]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-green-900">
            Login to VSI
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            placeholder="Factory Code"
            value={factoryCode}
            onChange={(e) => setFactoryCode(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            className="w-full bg-green-900 hover:bg-green-800"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
