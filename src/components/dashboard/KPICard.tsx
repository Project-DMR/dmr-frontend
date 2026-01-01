import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "high" | "medium" | "low";
  className?: string;
  delay?: number;
}

const statusColors = {
  high: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  high: "Excellent",
  medium: "Average",
  low: "Below Target",
};

export function KPICard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  status,
  className,
  delay = 0 
}: KPICardProps) {
  return (
    <div 
      className={cn(
        "group bg-card rounded-xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-2.5 rounded-lg transition-transform group-hover:scale-110",
          status ? statusColors[status] : "bg-primary/10"
        )}>
          <Icon className={cn(
            "h-5 w-5",
            status ? "" : "text-primary"
          )} />
        </div>
        {status && (
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium border",
            statusColors[status]
          )}>
            {statusLabels[status]}
          </span>
        )}
        {trend && !status && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend.isPositive ? "text-success" : "text-destructive"
          )}>
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl lg:text-3xl font-bold text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground font-medium">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}