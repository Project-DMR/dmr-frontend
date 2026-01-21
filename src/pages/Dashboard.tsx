"use client";

import { useEffect, useState } from "react";
import {
  Factory,
  Droplets,
  Leaf,
  Gauge,
  TrendingUp,
  Activity
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { useLanguage } from "@/contexts/LanguageContext";

const API_URL = "http://127.0.0.1:9000/dmr_data?limit=30";

export default function Dashboard() {
  const { t } = useLanguage();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setRows(data.data || []))
      .catch(console.error);
  }, []);

  if (!rows.length) return <p className="text-center">Loading data…</p>;

  const latest = rows[0];

  /* ---------------- REAL DB VALUES ---------------- */

  const caneCrushed = Number(latest.nday_gross_cane || 0);
  const sugarProduced = Number(latest.total_sugar || 0);
  const recovery = Number(latest.nexpected_recovery_prc_cane || 0);

  // Derived values (industry logic)
  const bagasse = (Number(latest.nbagasse_prc_cane || 0) * caneCrushed) / 100;
  const molasses = sugarProduced * 0.045; // ~4.5% thumb rule

  /* ---------------- TREND DATA ---------------- */

  const dailyTrendData = rows
    .slice()
    .reverse()
    .map(r => ({
      date: r.dcrush_date,
      crushing: Number(r.nday_gross_cane || 0),
      sugar: Number(r.total_sugar || 0),
      recovery: Number(r.nexpected_recovery_prc_cane || 0),
    }));

  /* ---------------- PIE DATA ---------------- */

  const resourceDistribution = [
    { name: "Sugar", value: sugarProduced, color: "#f59e0b" },
    { name: "Bagasse", value: bagasse, color: "#22c55e" },
    { name: "Molasses", value: molasses, color: "#06b6d4" },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{t.dashboard.title}</h1>
        <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Cane Crushed" value={caneCrushed.toLocaleString()} unit="Tons" icon={Factory} />
        <KPICard title="Sugar Produced" value={sugarProduced.toLocaleString()} unit="Tons" icon={Droplets} />
        <KPICard title="Recovery" value={recovery.toFixed(2)} unit="%" icon={TrendingUp} />
        <KPICard title="Bagasse" value={bagasse.toFixed(0)} unit="Tons" icon={Leaf} />
        <KPICard title="Molasses" value={molasses.toFixed(0)} unit="Tons" icon={Gauge} />
        <KPICard title="Efficiency" value={recovery.toFixed(2)} unit="%" icon={Activity} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Crushing vs Sugar */}
        <ChartCard title="Daily Crushing vs Sugar Production">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area dataKey="crushing" stroke="#22c55e" fill="#22c55e33" />
              <Area dataKey="sugar" stroke="#f59e0b" fill="#f59e0b33" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Recovery Trend */}
        <ChartCard title="Recovery Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 14]} />
              <Tooltip />
              <Line dataKey="recovery" stroke="#06b6d4" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Production Comparison */}
        <ChartCard title="Production Comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Resource Distribution */}
        <ChartCard title="Resource Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resourceDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {resourceDistribution.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}
