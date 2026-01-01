import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, Zap, TrendingUp, Factory, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBanner from "@/assets/hero-banner.jpg";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: BarChart3,
      title: t.home.features.realtime,
      description: t.home.features.realtimeDesc
    },
    {
      icon: TrendingUp,
      title: t.home.features.analytics,
      description: t.home.features.analyticsDesc
    },
    {
      icon: Shield,
      title: t.home.features.reports,
      description: t.home.features.reportsDesc
    },
    {
      icon: Zap,
      title: t.home.features.realtime,
      description: t.home.features.realtimeDesc
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
            <Factory className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t.home.subtitle}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {t.home.title.split(' ').slice(0, -1).join(' ')}{" "}
            <span className="text-gradient">{t.home.title.split(' ').slice(-1)}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            {t.home.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="gap-2 shadow-lg hover:shadow-glow transition-shadow">
              <Link to="/dashboard">
                {t.home.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/reports">
                {t.nav.reports}
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          {[
            { label: "Daily Crushing Capacity", value: "5,000", unit: t.common.tons },
            { label: "Target Recovery Rate", value: "10.5", unit: t.common.percentage },
            { label: "Operational Days", value: "180", unit: "/Year" },
            { label: "Efficiency Target", value: "95", unit: t.common.percentage },
          ].map((stat) => (
            <div 
              key={stat.label}
              className="bg-card rounded-xl p-4 lg:p-6 border border-border shadow-card text-center"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t.home.features.realtime}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.home.features.realtimeDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
          <img 
            src={heroBanner} 
            alt="Sugarcane fields and factory" 
            className="w-full h-48 md:h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end">
            <div className="p-6 lg:p-8">
              <p className="text-primary-foreground font-medium">From Field to Factory</p>
              <p className="text-primary-foreground/80 text-sm">Monitoring every step of your sugar production</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-20">
            <Leaf className="h-32 w-32 text-primary-foreground" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4 relative z-10">
            {t.home.cta}
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto relative z-10">
            {t.home.description}
          </p>
          <Button asChild size="lg" variant="secondary" className="relative z-10">
            <Link to="/dashboard" className="gap-2">
              {t.nav.dashboard}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}