
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ocorrencias from "./pages/Ocorrencias";
import AvaliacaoMensal from "./pages/AvaliacaoMensal";
import KitFiscalizacao from "./pages/KitFiscalizacao";
import FaleComGestao from "./pages/FaleComGestao";
import CadastroTrabalhadores from "./pages/CadastroTrabalhadores";
import FiscalizaAcao from "./pages/FiscalizaAcao";
import NotFound from "./pages/NotFound";

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/avaliacao-mensal" element={<AvaliacaoMensal />} />
            <Route path="/kit-fiscalizacao" element={<KitFiscalizacao />} />
            <Route path="/fale-com-gestao" element={<FaleComGestao />} />
            <Route path="/cadastro-trabalhadores" element={<CadastroTrabalhadores />} />
            <Route path="/fiscalizacao" element={<FiscalizaAcao />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
