
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, MapPin, User, Edit, Check, X } from "lucide-react";
import { Material } from "@/pages/ControleMateriais";

interface ListaMateriaisProps {
  materiais: Material[];
  onEditar: (material: Material) => void;
  onReceber: (material: Material) => void;
  onRecusar: (material: Material) => void;
}

export const ListaMateriais = ({ materiais, onEditar, onReceber, onRecusar }: ListaMateriaisProps) => {
  const getStatusBadge = (status: Material['status']) => {
    const config = {
      pendente: { label: 'Pendente', variant: 'secondary' as const },
      recebido: { label: 'Recebido', variant: 'default' as const },
      recusado: { label: 'Recusado', variant: 'destructive' as const }
    };
    
    return (
      <Badge variant={config[status].variant}>
        {config[status].label}
      </Badge>
    );
  };

  if (materiais.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Nenhum material encontrado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {materiais.map((material) => (
        <Card key={material.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{material.descricao}</CardTitle>
              {getStatusBadge(material.status)}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Quantidade:</strong> {material.quantidade} {material.unidadeMedida}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Data:</strong> {new Date(material.data).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Fiscal responsável pelo recebimento:</strong> {material.responsavelEntrega}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Local:</strong> {material.local}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Remetente:</strong> {material.remetente}
                </span>
              </div>
              
              {material.dataRecebimento && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    <strong>Recebido em:</strong> {new Date(material.dataRecebimento).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
            </div>

            {material.observacoes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm">
                  <strong>Observações:</strong> {material.observacoes}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditar(material)}
                className="flex items-center gap-1"
              >
                <Edit className="h-4 w-4" />
                Editar
              </Button>
              
              {material.status === 'pendente' && (
                <>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onReceber(material)}
                    className="flex items-center gap-1"
                  >
                    <Check className="h-4 w-4" />
                    Receber
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRecusar(material)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <X className="h-4 w-4" />
                    Recusar/Desacordo
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
