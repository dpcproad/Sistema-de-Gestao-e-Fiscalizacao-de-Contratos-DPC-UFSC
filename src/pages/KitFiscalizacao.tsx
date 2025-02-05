import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const KitFiscalizacao = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kit de Fiscalização</h1>
        <a href="/" className="text-primary hover:underline">
          Voltar ao início
        </a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <p className="text-gray-600 mb-4">
          Acesse o Kit de Gestores e Fiscais de Contratos disponível no site do DPC/PROAD.
        </p>
        <Button
          variant="default"
          className="w-full sm:w-auto"
          onClick={() => window.open('https://dpc.proad.ufsc.br/fiscalizacao-de-contratos/', '_blank')}
        >
          <ExternalLink className="mr-2" />
          Acessar Kit DPC/PROAD
        </Button>
      </div>
    </div>
  );
};

export default KitFiscalizacao;