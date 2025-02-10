import { QrCode, Star, ThumbsDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Feedback {
  id: number;
  type: "positive" | "negative";
  occurrenceTypes: {
    faltaMaterial: boolean;
    materialForaEspec: boolean;
    faltaLimpeza: boolean;
    ausenciaSemReposicao: boolean;
    atrasoSalarios: boolean;
    atrasoINSSFGTS: boolean;
    outros: boolean;
  };
  message: string;
  location: string;
  date: string;
}

const FiscalizaAcao = () => {
  const feedbacks: Feedback[] = [
    {
      id: 1,
      type: "positive",
      occurrenceTypes: {
        faltaMaterial: false,
        materialForaEspec: false,
        faltaLimpeza: true,
        ausenciaSemReposicao: false,
        atrasoSalarios: false,
        atrasoINSSFGTS: false,
        outros: false,
      },
      message: "Ótimo atendimento da equipe de limpeza no CCE",
      location: "Centro de Comunicação e Expressão",
      date: "2024-03-15",
    },
    {
      id: 2,
      type: "negative",
      occurrenceTypes: {
        faltaMaterial: true,
        materialForaEspec: false,
        faltaLimpeza: true,
        ausenciaSemReposicao: false,
        atrasoSalarios: false,
        atrasoINSSFGTS: false,
        outros: false,
      },
      message: "Área do hall do CTC precisa de mais atenção na limpeza e faltam materiais de limpeza",
      location: "Centro Tecnológico",
      date: "2024-03-14",
    },
  ];

  const getOccurrenceTypes = (types: Feedback["occurrenceTypes"]) => {
    const typeLabels = {
      faltaMaterial: "Falta de material",
      materialForaEspec: "Material fora da especificação",
      faltaLimpeza: "Falta de limpeza",
      ausenciaSemReposicao: "Ausência sem reposição",
      atrasoSalarios: "Atraso de salários",
      atrasoINSSFGTS: "Atraso de INSS/FGTS",
      outros: "Outros",
    };

    return Object.entries(types)
      .filter(([_, value]) => value)
      .map(([key]) => typeLabels[key as keyof typeof typeLabels]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FiscalizAção</h1>
          <Link to="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <QrCode className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">QR Codes de Avaliação</h2>
                <p className="text-gray-600 mb-8">Gere QR codes para distribuir em diferentes locais</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 border-2 border-dashed">
                <p className="text-center text-gray-600">Clique para gerar novo QR Code</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-gray-600 mb-2">Último QR Code gerado:</p>
                <p className="text-center text-gray-500">Nenhum QR code gerado ainda</p>
              </Card>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Avaliações Recebidas</h2>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="p-4">
                    <div className="flex items-start gap-3">
                      {feedback.type === "positive" ? (
                        <Star className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <ThumbsDown className="h-5 w-5 text-red-500" />
                      )}
                      <div className="flex-1">
                        <p className="text-gray-900 mb-2">{feedback.message}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {getOccurrenceTypes(feedback.occurrenceTypes).map((type, index) => (
                            <Badge key={index} variant={feedback.type === "positive" ? "secondary" : "destructive"}>
                              {type}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{feedback.location}</span>
                          <span>{new Date(feedback.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FiscalizaAcao;
