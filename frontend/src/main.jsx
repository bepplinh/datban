import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./shared/providers/SocketProvider.jsx";
import { PaymentProvider } from "./features/staff/context/PaymentContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
          <Toaster position="top-right" richColors />
        </SocketProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);

