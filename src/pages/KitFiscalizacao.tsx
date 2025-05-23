
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const KitFiscalizacao = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Kit de Fiscalização</h1>
          <Link to="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <p className="text-gray-600 mb-4">
            Acesse o Kit de Gestores e Fiscais de Contratos disponível no site do DPC/PROAD.
          </p>
          <Button
            variant="default"
            className="w-full sm:w-auto"
            onClick={() => window.open('https://arquivos.ufsc.br/d/6a6f3f1aa8034e09902a/', '_blank')}
          >
            <ExternalLink className="mr-2" />
            Acessar Kit DPC/PROAD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KitFiscalizacao;
