import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AlertProvider } from "@/contexts/AlertContext";

createRoot(document.getElementById("root")!).render(
  <AlertProvider>
    <App />
  </AlertProvider>,
);

