
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, FileText, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const RelatoriosGerenciais = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  // Mock contract and user data
  const contractInfo = {
    number: "23080.123456/2023-12",
    company: "Empresa Prestadora de Serviços LTDA",
    object: "Prestação de serviços de limpeza e conservação",
    validity: "01/01/2024 a 31/12/2024"
  };

  const userProfile = {
    name: "João da Silva",
    role: "Fiscal Setorial",
    unit: "Reitoria I"
  };

  const handleGenerateReport = async (reportType: string, reportName: string) => {
    setIsGenerating(reportType);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(null);
      toast({
        title: "Relatório Gerado",
        description: `O relatório "${reportName}" foi gerado com sucesso e está pronto para download.`,
      });
    }, 2000);
  };

  const reportTypes = [
    {
      id: "ocorrencias",
      title: "Relatório de Ocorrências",
      description: "Relatório completo de todas as ocorrências registradas no sistema",
      icon: FileText,
    },
    {
      id: "avaliacao-mensal",
      title: "Relatório de Avaliações Mensais",
      description: "Compilação de todas as avaliações mensais por setor",
      icon: BarChart3,
    },
    {
      id: "trabalhadores",
      title: "Relatório de Cadastro de Trabalhadores",
      description: "Lista completa dos trabalhadores terceirizados cadastrados",
      icon: FileText,
    },
    {
      id: "materiais",
      title: "Relatório de Controle de Materiais",
      description: "Movimentação e status de todos os materiais e insumos",
      icon: FileText,
    },
    {
      id: "fiscalizacao",
      title: "Relatório FiscalizAção",
      description: "Avaliações e feedbacks coletados via QR Code nos centros",
      icon: BarChart3,
    },
    {
      id: "consolidado",
      title: "Relatório Consolidado Geral",
      description: "Relatório executivo com dados de todos os módulos do sistema",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header contractInfo={contractInfo} userProfile={userProfile} />
      
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Relatórios Gerenciais
            </h1>
            <p className="text-gray-600 mt-2">
              Geração de relatórios consolidados do sistema de fiscalização
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            const isLoading = isGenerating === report.id;
            
            return (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {report.description}
                  </p>
                  <Button
                    onClick={() => handleGenerateReport(report.id, report.title)}
                    disabled={isLoading}
                    className="w-full flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Gerar Relatório
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Informações dos Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Os relatórios são gerados em formato PDF e Excel para facilitar análise e compartilhamento</p>
                <p>• O relatório consolidado inclui dados de todos os módulos em um único documento</p>
                <p>• Todos os relatórios respeitam o período de competência selecionado</p>
                <p>• Os dados são extraídos em tempo real do sistema</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosGerenciais;
