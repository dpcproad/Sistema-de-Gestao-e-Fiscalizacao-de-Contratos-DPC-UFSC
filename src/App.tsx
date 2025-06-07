
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Ocorrencias from "./pages/Ocorrencias";
import AvaliacaoMensal from "./pages/AvaliacaoMensal";
import KitFiscalizacao from "./pages/KitFiscalizacao";
import FaleComGestao from "./pages/FaleComGestao";
import CadastroTrabalhadores from "./pages/CadastroTrabalhadores";
import FiscalizaAcao from "./pages/FiscalizaAcao";
import NotFound from "./pages/NotFound";
import ControleMateriais from "./pages/ControleMateriais";
import RelatoriosGerenciais from "./pages/RelatoriosGerenciais";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/ocorrencias" element={
        <ProtectedRoute>
          <Ocorrencias />
        </ProtectedRoute>
      } />
      <Route path="/avaliacao-mensal" element={
        <ProtectedRoute>
          <AvaliacaoMensal />
        </ProtectedRoute>
      } />
      <Route path="/kit-fiscalizacao" element={
        <ProtectedRoute>
          <KitFiscalizacao />
        </ProtectedRoute>
      } />
      <Route path="/fale-com-gestao" element={
        <ProtectedRoute>
          <FaleComGestao />
        </ProtectedRoute>
      } />
      <Route path="/cadastro-trabalhadores" element={
        <ProtectedRoute>
          <CadastroTrabalhadores />
        </ProtectedRoute>
      } />
      <Route path="/fiscalizacao" element={
        <ProtectedRoute>
          <FiscalizaAcao />
        </ProtectedRoute>
      } />
      <Route path="/controle-materiais" element={
        <ProtectedRoute>
          <ControleMateriais />
        </ProtectedRoute>
      } />
      <Route path="/relatorios-gerenciais" element={
        <ProtectedRoute>
          <RelatoriosGerenciais />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
