import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ModalsProvider>
  </React.StrictMode>
);
