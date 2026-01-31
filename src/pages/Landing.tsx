import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/vsi-logo.jpeg";
import landingImage from "@/assets/landing-page.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f8f5] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="VSI" className="h-10" />
          <h1 className="text-xl font-bold text-green-900">
            Vasantdada Sugar Institute, Pune
          </h1>
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

      {/* Hero Section */}
      <main className="flex-1 px-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Text */}
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-green-900 mb-6">
              Daily Manufacturing Report System
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              VSI’s Sugarcane Manufacturing Dashboard enables factories to
              monitor daily production, analyze KPIs, and gain AI-powered
              insights for better operational decisions.
            </p>

            <Button
              size="lg"
              className="bg-green-900 hover:bg-green-800"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          </div>

          {/* Right: Image */}
          <div className="hidden lg:flex justify-center">
            <img
              src={landingImage}
              alt="Sugar Factory Dashboard"
              className="w-full max-w-3xl object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
