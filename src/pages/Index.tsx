import { ClipboardList, BarChart2, FileBox } from "lucide-react";
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

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
        </div>
      </div>
    </div>
  );
};

export default Index;