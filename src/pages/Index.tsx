import { ClipboardList, BarChart2, FileBox, MessageCircle, Users, Bell, AlertCircle, MessageSquare, QrCode, Star, Package, FileSpreadsheet } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/Header";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Mock data - in a real app, this would come from an API or context
  const contractInfo = {
    number: "23080.123456/2023-12",
    company: "Empresa Prestadora de Serviços LTDA",
    object: "Prestação de serviços de limpeza e conservação",
    validity: "01/01/2024 a 31/12/2024"
  };

  // Mock user profile data
  const userProfile = {
    name: "João da Silva",
    role: "Fiscal Setorial",
    unit: "Reitoria I"
  };

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
      {/* Use the new Header component */}
      <Header contractInfo={contractInfo} userProfile={userProfile} />

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
            title="Fale com a Gestão e Fiscalização do contrato"
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
            title="Controle de Materiais e Insumos"
            description="Gerencie o recebimento e controle de materiais e insumos"
            icon={Package}
            to="/controle-materiais"
          />
          <MenuCard
            title="FiscalizAção"
            description="Avaliações dos usuários via QR Code distribuídos nos centros e unidades"
            icon={QrCode}
            to="/fiscalizacao"
          />
          <MenuCard
            title="Relatórios Gerenciais"
            description="Gere relatórios consolidados de todos os módulos do sistema"
            icon={FileSpreadsheet}
            to="/relatorios-gerenciais"
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
