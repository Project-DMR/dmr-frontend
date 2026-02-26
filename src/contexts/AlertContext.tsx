import { createContext, useContext, useState } from "react";

export type AlertItem = {
  id: string;
  message: string;
  acknowledged: boolean;
  timestamp: string;
};

type AlertContextType = {
  alerts: AlertItem[];
  addAlerts: (messages: string[]) => void;
  acknowledgeAlert: (id: string) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlerts = (messages: string[]) => {
    setAlerts((prev) => {
      const newAlerts = messages.map((msg) => ({
        id: crypto.randomUUID(),
        message: msg,
        acknowledged: false,
        timestamp: new Date().toISOString(),
      }));

      return [...newAlerts, ...prev];
    });
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    );
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlerts, acknowledgeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlerts = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlerts must be used inside AlertProvider");
  return ctx;
};
