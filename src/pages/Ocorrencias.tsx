import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const Ocorrencias = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ocorrências</h1>
        <div className="flex gap-4 items-center">
          <Button className="bg-primary">
            <Plus className="mr-2 h-4 w-4" />
            Nova ocorrência
          </Button>
          <a href="/" className="text-primary hover:underline">
            Voltar ao início
          </a>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Sistema de registro de ocorrências em desenvolvimento.</p>
      </div>
    </div>
  );
};

export default Ocorrencias;