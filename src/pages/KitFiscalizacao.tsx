
import { Button } from "@/components/ui/button";
import { ExternalLink, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const KitFiscalizacao = () => {
  // Mock data - in a real app, this would come from an API or context
  const contractInfo = {
    number: "23080.123456/2023-12",
    company: "Empresa Prestadora de Serviços LTDA",
    object: "Prestação de serviços de limpeza e conservação",
    validity: "01/01/2024 a 31/12/2024"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contract Info Header */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-start justify-between">
            {/* Contract Information */}
            <div className="space-y-1">
              <p className="text-sm font-medium">
                <span className="text-gray-500">Contrato:</span>{" "}
                <span className="text-gray-900">{contractInfo.number}</span>
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-500">Contratada:</span>{" "}
                <span className="text-gray-900">{contractInfo.company}</span>
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-500">Objeto:</span>{" "}
                <span className="text-gray-900">{contractInfo.object}</span>
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-500">Vigência:</span>{" "}
                <span className="text-gray-900">{contractInfo.validity}</span>
              </p>
            </div>
            
            {/* Settings Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Mudar de Contrato
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
