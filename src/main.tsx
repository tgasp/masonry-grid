import { createRoot } from "react-dom/client";
import { Profiler, StrictMode } from "react";
import App from "./App";
import { reportWebVitals } from "./utils/webVitals";
import "./index.css";

// Performance callback for React Profiler
const onRenderCallback = (
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => {
  if (import.meta.env.DEV) {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  }
};

// Create root and render app
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);

root.render(
  <StrictMode>
    <Profiler id="App" onRender={onRenderCallback}>
      <App />
    </Profiler>
  </StrictMode>
);

// Report web vitals
reportWebVitals({
  reportToConsole: import.meta.env.DEV,
});

// Add service worker registration in production
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
