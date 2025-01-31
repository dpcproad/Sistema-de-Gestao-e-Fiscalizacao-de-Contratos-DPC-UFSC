import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FaleComGestao = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const { toast } = useToast();

  const pessoas = [
    { id: "1", nome: "João Silva", cargo: "Gestor" },
    { id: "2", nome: "Maria Santos", cargo: "Fiscal Técnico" },
    { id: "3", nome: "Pedro Oliveira", cargo: "Fiscal Administrativo" },
    { id: "4", nome: "Ana Costa", cargo: "Gestora Substituta" },
  ];

  const handleChat = () => {
    if (!selectedPerson) {
      toast({
        title: "Selecione um servidor",
        description: "Por favor, selecione um servidor para iniciar o chat.",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would integrate with UFSC's chat system
    window.open("https://chat.ufsc.br", "_blank");
    
    toast({
      title: "Redirecionando para o chat UFSC",
      description: "Você será redirecionado para o sistema de chat da UFSC.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Fale com a Gestão e os Fiscais
          </h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione com quem deseja falar
                </label>
                <Select onValueChange={setSelectedPerson} value={selectedPerson}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um servidor" />
                  </SelectTrigger>
                  <SelectContent>
                    {pessoas.map((pessoa) => (
                      <SelectItem key={pessoa.id} value={pessoa.id}>
                        {pessoa.nome} - {pessoa.cargo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleChat}
                className="w-full"
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Iniciar Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaleComGestao;