import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ListaMateriais } from "@/components/controle-materiais/ListaMateriais";
import { FormularioMaterial } from "@/components/controle-materiais/FormularioMaterial";
import { DialogConfirmacao } from "@/components/controle-materiais/DialogConfirmacao";

export interface Material {
  id: string;
  descricao: string;
  unidadeMedida: string;
  quantidade: number;
  data: string;
  responsavelEntrega: string;
  local: string;
  status: 'pendente' | 'recebido' | 'recusado';
  remetente: string;
  dataRecebimento?: string;
  observacoes?: string;
}

const ControleMateriais = () => {
  const [materiais, setMateriais] = useState<Material[]>([
    {
      id: "1",
      descricao: "Papel A4 75g",
      unidadeMedida: "Resma",
      quantidade: 10,
      data: "2024-03-20",
      responsavelEntrega: "Roberto Silva",
      local: "Almoxarifado Central",
      status: "pendente",
      remetente: "João empresa X"
    },
    {
      id: "2",
      descricao: "Canetas esferográficas azuis",
      unidadeMedida: "Unidade",
      quantidade: 50,
      data: "2024-03-19",
      responsavelEntrega: "Maria Santos",
      local: "Reitoria I - Sala 205",
      status: "recebido",
      remetente: "João empresa X",
      dataRecebimento: "2024-03-19"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [materialEdicao, setMaterialEdicao] = useState<Material | null>(null);
  const [dialogConfirmacao, setDialogConfirmacao] = useState<{
    open: boolean;
    tipo: 'receber' | 'recusar' | null;
    material: Material | null;
  }>({
    open: false,
    tipo: null,
    material: null
  });

  // Mock user profile data
  const userProfile = {
    name: "João da Silva",
    role: "Fiscal Setorial",
    unit: "Reitoria I"
  };

  // Mock contract info
  const contractInfo = {
    number: "23080.123456/2023-12",
    company: "Empresa Prestadora de Serviços LTDA",
    object: "Prestação de serviços de limpeza e conservação",
    validity: "01/01/2024 a 31/12/2024"
  };

  const handleSubmitMaterial = (dados: Omit<Material, 'id' | 'status' | 'remetente'>) => {
    if (materialEdicao) {
      setMateriais(prev => prev.map(m => 
        m.id === materialEdicao.id 
          ? { ...m, ...dados }
          : m
      ));
      setMaterialEdicao(null);
    } else {
      const novoMaterial: Material = {
        ...dados,
        id: Date.now().toString(),
        status: 'pendente',
        remetente: "João empresa X"
      };
      setMateriais(prev => [...prev, novoMaterial]);
    }
    setShowForm(false);
  };

  const handleEditarMaterial = (material: Material) => {
    setMaterialEdicao(material);
    setShowForm(true);
  };

  const handleReceberMaterial = (material: Material, senha: string) => {
    // Aqui você validaria a senha IDUFSC
    console.log(`Validando senha IDUFSC: ${senha}`);
    
    setMateriais(prev => prev.map(m => 
      m.id === material.id 
        ? { 
            ...m, 
            status: 'recebido' as const,
            dataRecebimento: new Date().toISOString().split('T')[0]
          }
        : m
    ));
    
    setDialogConfirmacao({ open: false, tipo: null, material: null });
  };

  const handleRecusarMaterial = (material: Material, motivo: string) => {
    setMateriais(prev => prev.map(m => 
      m.id === material.id 
        ? { 
            ...m, 
            status: 'recusado' as const,
            observacoes: motivo
          }
        : m
    ));
    
    setDialogConfirmacao({ open: false, tipo: null, material: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header contractInfo={contractInfo} userProfile={userProfile} />
      
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao início
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Controle de Materiais e Insumos
              </h1>
              <p className="text-gray-600 mt-2">
                Gestão de materiais para {userProfile.unit}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => {
              setMaterialEdicao(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Material
          </Button>
        </div>

        <ListaMateriais
          materiais={materiais}
          onEditar={handleEditarMaterial}
          onReceber={(material) => setDialogConfirmacao({
            open: true,
            tipo: 'receber',
            material
          })}
          onRecusar={(material) => setDialogConfirmacao({
            open: true,
            tipo: 'recusar',
            material
          })}
        />

        <FormularioMaterial
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleSubmitMaterial}
          materialInicial={materialEdicao}
        />

        <DialogConfirmacao
          open={dialogConfirmacao.open}
          onOpenChange={(open) => setDialogConfirmacao(prev => ({ ...prev, open }))}
          tipo={dialogConfirmacao.tipo}
          material={dialogConfirmacao.material}
          onConfirmarRecebimento={handleReceberMaterial}
          onConfirmarRecusa={handleRecusarMaterial}
        />
      </div>
    </div>
  );
};

export default ControleMateriais;
