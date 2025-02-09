
import { ClipboardList, BarChart2, FileBox, MessageCircle, Users, Bell, AlertCircle, MessageSquare, QrCode, Star } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  // Example notifications - in a real app, these would come from an API
  const notifications = [
    {
      id: 1,
      type: "ufsc",
      title: "Comunicado UFSC",
      message: "Nova portaria sobre fiscalização de contratos publicada",
      date: "2024-03-15",
      icon: Bell,
    },
    {
      id: 2,
      type: "dpc",
      title: "Aviso DPC",
      message: "Atualização no sistema de gestão de contratos",
      date: "2024-03-14",
      icon: AlertCircle,
    },
    {
      id: 3,
      type: "response",
      title: "Resposta do Preposto",
      message: "Nova resposta à ocorrência #123 - Ausência de funcionário",
      date: "2024-03-13",
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "fiscalizacao",
      title: "FiscalizAção - Novo Feedback",
      message: "Elogio recebido para equipe de limpeza do CCE",
      date: "2024-03-12",
      icon: Star,
    },
    {
      id: 5,
      type: "fiscalizacao",
      title: "FiscalizAção - Avaliação",
      message: "Nova avaliação registrada no CTC",
      date: "2024-03-11",
      icon: QrCode,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sistema de Fiscalização de Contratos
          </h1>
          <p className="text-gray-600">DPC/PROAD</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
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
          <MenuCard
            title="Cadastro de Trabalhadores"
            description="Gerencie o cadastro dos trabalhadores terceirizados"
            icon={Users}
            to="/cadastro-trabalhadores"
          />
          <MenuCard
            title="FiscalizAção"
            description="Avaliações via QR Code distribuídos nos centros"
            icon={QrCode}
            to="/fiscalizacao"
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Mural de Notificações
            </h2>
            <ScrollArea className="h-[400px] rounded-md">
              <div className="space-y-4">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <Alert key={notification.id} className="cursor-pointer hover:bg-gray-50">
                      <Icon className="h-4 w-4" />
                      <AlertTitle className="flex items-center justify-between">
                        {notification.title}
                        <span className="text-sm font-normal text-gray-500">
                          {new Date(notification.date).toLocaleDateString('pt-BR')}
                        </span>
                      </AlertTitle>
                      <AlertDescription>
                        {notification.message}
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
