import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, Zap, TrendingUp, Factory, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

export default function Home() {

  const [kpi, setKpi] = useState({
    caneCrushed: "NA",
    totalSugar: "NA",
    expectedRecovery: "NA",
    workingHours: "NA",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dmr-backend.onrender.com/dmr_data");
        const result = await res.json();

        if (result.data && result.data.length > 0) {
          const latest = result.data[0];

          setKpi({
            caneCrushed: latest.nday_gross_cane ?? "NA",
            totalSugar: latest.total_sugar ?? "NA",
            expectedRecovery: latest.nexpected_recovery_prc_cane ?? "NA",
            workingHours: latest.nworking_hrs ?? "NA",
          });
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    }

    fetchData();
  }, []);

  const features = [
    { icon: BarChart3, title: "Real-time Monitoring", description: "Live crushing & sugar updates." },
    { icon: TrendingUp, title: "Analytics", description: "Daily trends & performance KPIs." },
    { icon: Shield, title: "Reports", description: "DMR & factory performance reports." },
    { icon: Zap, title: "Instant Updates", description: "Automated daily DMR insights." },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Factory className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Smart Sugar Factory Monitoring</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Smart <span className="text-gradient">DMR Dashboard</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track sugar production, cane crushing & recovery in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 shadow-lg">
              <Link to="/dashboard">
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to="/reports">Reports</Link>
            </Button>
          </div>
        </div>

        {/* LIVE KPI BANNER */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">

          {[
            { label: "Cane Crushed", value: kpi.caneCrushed, unit: "tons" },
            { label: "Sugar Produced", value: kpi.totalSugar, unit: "kg" },
            { label: "Expected Recovery", value: kpi.expectedRecovery, unit: "%" },
            { label: "Working Hours", value: kpi.workingHours, unit: "hrs" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-4 border shadow-card text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}

        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            View Complete Factory Dashboard
          </h2>

          <Button asChild size="lg" variant="secondary">
            <Link to="/dashboard" className="gap-2">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

    </div>
  );
}
