
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ForkliftsPage from "./pages/Forklifts";
import ReportsPage from "./pages/Reports";
import OperatorsPage from "./pages/Operators";
import OperationsPage from "./pages/Operations";
import MaintenancePage from "./pages/Maintenance";
import GasSupplyPage from "./pages/GasSupply";
import Branches from "./pages/Branches";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Finance from "./pages/Finance";
import CRM from "./pages/CRM";
import Inventory from "./pages/Inventory";
import Communication from "./pages/Communication";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* Legacy forklift management routes */}
          <Route path="/forklifts" element={<ForkliftsPage />} />
          <Route path="/operators" element={<OperatorsPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/gas-supply" element={<GasSupplyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
