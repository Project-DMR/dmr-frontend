// 🔥 SAME IMPORTS (unchanged)
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

/* ================= SAFE TYPES ================= */
type AIResponse = any;

export default function AIAnalysis() {
  const [data, setData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dmr-backend.onrender.com/ai_analysis", {
      cache: "no-store",
    })
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

  if (!data) {
    return (
      <div className="text-center text-destructive">
        Failed to load AI Analysis
      </div>
    );
  }
const actual = Number(data?.recovery_analysis?.actual_recovery ?? 0);
const predicted = Number(data?.recovery_analysis?.predicted_recovery ?? 0);
const diff = Number(data?.recovery_analysis?.difference ?? 0);
  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <div className="text-center">
        <h1 className="text-3xl font-bold">AI Analysis – DMR Optimization</h1>
      </div>

      {/* ================= RECOVERY ================= */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity /> Recovery Analysis
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <Stat label="Actual (%)" value={actual.toFixed(2)} />
            <Stat label="Predicted (%)" value={predicted.toFixed(2)} />
            <Stat
              label="Difference"
              value={`${diff >= 0 ? "+" : ""}${diff.toFixed(2)} %`}
              highlight={diff >= 0 ? "good" : "bad"}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= TREND ================= */}
      {data?.recovery_trend && (
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
              7-Day Trend
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <Stat label="7-Day Avg" value={data.recovery_trend.avg_7d ?? 0} />
              <Stat label="Deviation" value={data.recovery_trend.difference ?? 0} />
              <Stat label="Trend" value={data.recovery_trend.trend ?? "N/A"} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================= ANOMALY ================= */}
      {data?.anomaly_detection && (
        <Card className="border-l-4 border-orange-500">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShieldAlert /> Anomaly Detection
            </h2>

            <Badge>
              {data.anomaly_detection.status ?? "Unknown"}
            </Badge>

            {data.anomaly_detection.issues?.length > 0 && (
              <ul className="list-disc pl-6">
                {data.anomaly_detection.issues.map((i: string, idx: number) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}

      {/* ================= ROOT CAUSE ================= */}
      {data?.root_cause && (
        <Card className="border-l-4 border-red-600">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Brain /> Root Cause
            </h2>

            <Stat
              label="Primary Cause"
              value={data.root_cause.primary_cause ?? "N/A"}
            />
          </CardContent>
        </Card>
      )}

      {/* ================= ALERTS ================= */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle /> Alerts
          </h2>

          {data?.alerts?.length === 0 ? (
            <Badge>No critical alerts</Badge>
          ) : (
            <ul>
              {data?.alerts?.map((a: string, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* ================= RECOMMENDATIONS ================= */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle /> Recommendations
          </h2>

          <ul>
            {data?.recommendations?.map((r: string, i: number) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ================= SUMMARY ================= */}
      {data?.conclusion && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Brain /> AI Daily Summary
            </h2>
            <p>{data.conclusion}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

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
      <p className="text-sm">{label}</p>
      <p
        className={`text-xl font-bold ${
          highlight === "bad"
            ? "text-red-600"
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
