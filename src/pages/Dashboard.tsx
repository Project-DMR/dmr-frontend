import { 
  Gauge, 
  Factory, 
  TrendingUp, 
  Leaf, 
  Droplets, 
  Activity 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  kpiData, 
  dailyTrendData, 
  productionComparisonData, 
  resourceDistributionData 
} from "@/lib/mockData";

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t.dashboard.title}</h1>
        <p className="text-muted-foreground mt-1">{t.dashboard.subtitle}</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title={t.dashboard.kpi.caneCrushed}
          value={kpiData.caneCrushed}
          unit={t.common.tons}
          icon={Factory}
          trend={{ value: 2.3, isPositive: true }}
          delay={0}
        />
        <KPICard
          title={t.dashboard.kpi.sugarProduced}
          value={kpiData.sugarProduced}
          unit={t.common.tons}
          icon={Droplets}
          trend={{ value: 1.5, isPositive: true }}
          delay={50}
        />
        <KPICard
          title={t.dashboard.kpi.recovery}
          value={kpiData.recoveryRate}
          unit={t.common.percentage}
          icon={TrendingUp}
          trend={{ value: 0.3, isPositive: true }}
          delay={100}
        />
        <KPICard
          title={t.dashboard.kpi.bagasse}
          value={kpiData.bagasseProduction}
          unit={t.common.tons}
          icon={Leaf}
          trend={{ value: 1.8, isPositive: true }}
          delay={150}
        />
        <KPICard
          title={t.dashboard.kpi.molasses}
          value={kpiData.molassesOutput}
          unit={t.common.tons}
          icon={Gauge}
          trend={{ value: 0.5, isPositive: false }}
          delay={200}
        />
        <KPICard
          title={t.dashboard.kpi.efficiency}
          value="94.2"
          unit={t.common.percentage}
          icon={Activity}
          status={kpiData.efficiency}
          delay={250}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend Chart */}
        <ChartCard 
          title={t.dashboard.charts.dailyTrend} 
          description={t.dashboard.charts.dailyTrendDesc}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrendData}>
              <defs>
                <linearGradient id="colorCrushing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-green))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-green))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-amber))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-amber))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="crushing" 
                name="Crushing (Tons)"
                stroke="hsl(var(--chart-green))" 
                fillOpacity={1}
                fill="url(#colorCrushing)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="sugar" 
                name="Sugar (Tons)"
                stroke="hsl(var(--chart-amber))" 
                fillOpacity={1}
                fill="url(#colorSugar)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Recovery Rate Trend */}
        <ChartCard 
          title={t.dashboard.charts.recoveryComparison} 
          description={t.dashboard.charts.recoveryComparisonDesc}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis 
                domain={[10.5, 11]} 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="recovery" 
                name="Recovery %"
                stroke="hsl(var(--chart-teal))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-teal))", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "hsl(var(--chart-teal))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Production Comparison */}
        <ChartCard 
          title={t.dashboard.charts.productionComparison} 
          description={t.dashboard.charts.productionComparisonDesc}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productionComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar 
                dataKey="sugar" 
                name="Sugar (Tons)" 
                fill="hsl(var(--chart-amber))" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="molasses" 
                name="Molasses (Tons)" 
                fill="hsl(var(--chart-teal))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Resource Distribution */}
        <ChartCard 
          title={t.dashboard.charts.resourceDistribution} 
          description={t.dashboard.charts.resourceDistributionDesc}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resourceDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {resourceDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}