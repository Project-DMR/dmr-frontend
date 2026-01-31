import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/vsi-logo.jpeg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f8f5] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="VSI" className="h-10" />
          <h1 className="text-xl font-bold text-green-900">VSI</h1>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center px-10">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold text-green-900 mb-6">
            Daily Manufacturing Report System
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            VSI’s Sugarcane Manufacturing Dashboard enables factories to monitor
            daily production, analyze KPIs, and gain AI-powered insights for
            better operational decisions.
          </p>

          <Button
            size="lg"
            className="bg-green-900 hover:bg-green-800"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}
