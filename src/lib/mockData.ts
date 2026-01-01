// Mock data for the dashboard
export const kpiData = {
  caneCrushed: 4520,
  sugarProduced: 485,
  recoveryRate: 10.8,
  bagasseProduction: 2340,
  molassesOutput: 156,
  efficiency: "high" as const,
};

export const dailyTrendData = [
  { date: "Mon", crushing: 4200, sugar: 450, recovery: 10.7 },
  { date: "Tue", crushing: 4350, sugar: 468, recovery: 10.8 },
  { date: "Wed", crushing: 4100, sugar: 438, recovery: 10.7 },
  { date: "Thu", crushing: 4500, sugar: 490, recovery: 10.9 },
  { date: "Fri", crushing: 4420, sugar: 478, recovery: 10.8 },
  { date: "Sat", crushing: 4520, sugar: 485, recovery: 10.7 },
  { date: "Sun", crushing: 4600, sugar: 502, recovery: 10.9 },
];

export const productionComparisonData = [
  { month: "Oct", sugar: 12500, bagasse: 58000, molasses: 4200 },
  { month: "Nov", sugar: 14200, bagasse: 66000, molasses: 4800 },
  { month: "Dec", sugar: 15800, bagasse: 72000, molasses: 5300 },
];

export const resourceDistributionData = [
  { name: "Sugar", value: 15, color: "hsl(var(--chart-amber))" },
  { name: "Bagasse", value: 65, color: "hsl(var(--chart-green))" },
  { name: "Molasses", value: 12, color: "hsl(var(--chart-teal))" },
  { name: "Other", value: 8, color: "hsl(var(--chart-orange))" },
];

export const reportTableData = [
  { id: 1, date: "2024-12-30", caneCrushed: 4520, sugarProduced: 485, recovery: 10.8, efficiency: "High" },
  { id: 2, date: "2024-12-29", caneCrushed: 4420, sugarProduced: 478, recovery: 10.8, efficiency: "High" },
  { id: 3, date: "2024-12-28", caneCrushed: 4500, sugarProduced: 490, recovery: 10.9, efficiency: "High" },
  { id: 4, date: "2024-12-27", caneCrushed: 4100, sugarProduced: 438, recovery: 10.7, efficiency: "Medium" },
  { id: 5, date: "2024-12-26", caneCrushed: 4350, sugarProduced: 468, recovery: 10.8, efficiency: "High" },
  { id: 6, date: "2024-12-25", caneCrushed: 4200, sugarProduced: 450, recovery: 10.7, efficiency: "Medium" },
  { id: 7, date: "2024-12-24", caneCrushed: 4150, sugarProduced: 445, recovery: 10.7, efficiency: "Medium" },
  { id: 8, date: "2024-12-23", caneCrushed: 4300, sugarProduced: 462, recovery: 10.7, efficiency: "High" },
  { id: 9, date: "2024-12-22", caneCrushed: 4450, sugarProduced: 480, recovery: 10.8, efficiency: "High" },
  { id: 10, date: "2024-12-21", caneCrushed: 4380, sugarProduced: 472, recovery: 10.8, efficiency: "High" },
];