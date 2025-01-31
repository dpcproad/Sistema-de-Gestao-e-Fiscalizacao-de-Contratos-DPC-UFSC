import { ClipboardList, BarChart2, FileBox, MessageCircle } from "lucide-react";
import MenuCard from "@/components/MenuCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sistema de Fiscalização de Contratos
          </h1>
          <p className="text-gray-600">DPC/PROAD</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <MenuCard
            title="Ocorrências"
            description="Registre e acompanhe ocorrências relacionadas aos contratos"
            icon={ClipboardList}
            to="/ocorrencias"
          />
          <MenuCard
            title="Avaliação Mensal"
            description="Realize avaliações mensais dos contratos em vigor"
            icon={BarChart2}
            to="/avaliacao-mensal"
          />
          <MenuCard
            title="Kit de Fiscalização"
            description="Acesse documentos e ferramentas para fiscalização"
            icon={FileBox}
            to="/kit-fiscalizacao"
          />
          <MenuCard
            title="Fale com a Gestão"
            description="Chat direto com gestores e fiscais do contrato"
            icon={MessageCircle}
            to="/fale-com-gestao"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;