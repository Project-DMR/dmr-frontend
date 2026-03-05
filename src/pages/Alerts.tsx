import { useAlerts } from "@/contexts/AlertContext";

export default function Alerts() {
  const { alerts, acknowledgeAlert } = useAlerts();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Notifications</h1>

      {alerts.length === 0 && (
        <p className="text-muted-foreground">No alerts yet</p>
      )}

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 border rounded-lg ${
            alert.acknowledged ? "opacity-60" : ""
          }`}
        >
          <p>{alert.message}</p>

          {!alert.acknowledged && (
            <button
              onClick={() => acknowledgeAlert(alert.id)}
              className="text-sm text-blue-600 mt-2"
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
