import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/vsi-logo.jpeg";
import landingImage from "@/assets/landing-page.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f8f5] flex flex-col">
      {/* Header */}
      <header className="px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="VSI" className="h-10 w-10 object-contain" />
            <h1 className="text-lg sm:text-xl font-bold text-green-900 leading-tight">
              Vasantdada Sugar Institute, Pune
            </h1>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-3 justify-start lg:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              size="sm"
              className="bg-yellow-500 text-black hover:bg-yellow-600"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-6 lg:px-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left: Text */}
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-green-900 mb-6">
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
