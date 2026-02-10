import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  Brain,
  Activity,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Percent,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ---------------------------------- */
/* Types aligned with BACKEND */
/* ---------------------------------- */
type AIResponse = {
  status: string;
  date: string;

  recovery_analysis: {
    actual: number;
    predicted: number;
    difference: number;
  };

  recovery_confidence?: {
    level: string;
    score: number;
    reason: string;
  };

  recovery_trend?: {
    avg_7d: number;
    trend: "Improving" | "Declining" | "Stable";
    difference: number;
  };

  anomaly_detection?: {
    status: string;
    issues: string[];
  };

  alerts: string[];
  bagasse_optimization: any;
  recommendations: string[];
};

export default function AIAnalysis() {
  const [data, setData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dmr-backend.onrender.com/ai_analysis")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!data || data.status !== "success") {
    return (
      <div className="text-center text-destructive">
        Failed to load AI Analysis
      </div>
    );
  }

  const diff = data.recovery_analysis.difference;

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold">AI Analysis – DMR Optimization</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered operational intelligence
        </p>
      </div>

      {/* ================= CONFIDENCE CARD ================= */}
      {data.recovery_confidence && (
        <Card className="border-l-4 border-blue-600">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Percent /> Recovery Confidence
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Stat label="Confidence Level" value={data.recovery_confidence.level} />
              <Stat label="Score (%)" value={data.recovery_confidence.score} />
              <Stat label="AI Trust" value={data.recovery_confidence.reason} />
            </div>
          </CardContent>
        </Card>
      )}

{/* Recovery Analysis */}
<Card>
  <CardContent className="p-6 space-y-3">
    <h2 className="text-xl font-semibold flex items-center gap-2">
      <Activity /> Recovery Analysis
    </h2>

    {(() => {
      const actual = data.recovery_analysis.actual;
      const predicted = data.recovery_analysis.predicted;

      // ✅ Correct display logic
      const displayDiff = actual - predicted;

      return (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Actual Recovery (%)" value={actual.toFixed(2)} />

            <Stat label="Predicted Recovery (%)" value={predicted.toFixed(2)} />

            <Stat
              label="Difference (Actual − Predicted)"
              value={`${displayDiff >= 0 ? "+" : ""}${displayDiff.toFixed(2)} %`}
              highlight={displayDiff >= 0 ? "good" : "bad"}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {displayDiff >= 0
              ? "Recovery performance is better than AI prediction. Process efficiency is optimal."
              : "Recovery is below AI prediction. Operational tuning is recommended."}
          </p>
        </>
      );
    })()}
  </CardContent>
</Card>


      {/* ================= TREND CARD ================= */}
      {data.recovery_trend && (
        <Card>
          <CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {data.recovery_trend.trend === "Improving" ? (
                <TrendingUp className="text-green-600" />
              ) : data.recovery_trend.trend === "Declining" ? (
                <TrendingDown className="text-red-600" />
              ) : (
                <Activity />
              )}
              Recovery Trend (7 Days)
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Stat
                label="7-Day Avg Recovery"
                value={data.recovery_trend.avg_7d}
              />
              <Stat
                label="Deviation"
                value={data.recovery_trend.difference}
                highlight={data.recovery_trend.difference < 0 ? "bad" : "good"}
              />
              <Stat label="Trend" value={data.recovery_trend.trend} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================= ANOMALY CARD ================= */}
      {data.anomaly_detection && (
        <Card className="border-l-4 border-orange-500">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShieldAlert /> Anomaly Detection
            </h2>

            <Badge
              variant={
                data.anomaly_detection.status === "Normal"
                  ? "success"
                  : "destructive"
              }
            >
              {data.anomaly_detection.status}
            </Badge>

            {data.anomaly_detection.issues.length > 0 && (
              <ul className="list-disc pl-6 space-y-1">
                {data.anomaly_detection.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}

      {/* ================= EXISTING CARDS (unchanged) ================= */}
      {/* Alerts */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="text-orange-500" /> Alerts
          </h2>

          {data.alerts.length === 0 ? (
            <Badge variant="success">No critical alerts</Badge>
          ) : (
            <ul className="space-y-2">
              {data.alerts.map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Badge variant="destructive">Warning</Badge>
                  {a}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-l-4 border-green-600">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="text-green-600" /> AI Recommendations
          </h2>

          <ul className="space-y-2">
            {data.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <Badge variant="success">Action</Badge>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: any;
  highlight?: "good" | "bad";
}) {
  return (
    <div className="border rounded-lg p-4 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`text-xl font-bold ${
          highlight === "bad"
            ? "text-destructive"
            : highlight === "good"
            ? "text-green-600"
            : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}