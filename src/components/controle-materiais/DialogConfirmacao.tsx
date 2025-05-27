
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check, X } from "lucide-react";
import { Material } from "@/pages/ControleMateriais";

interface DialogConfirmacaoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipo: 'receber' | 'recusar' | null;
  material: Material | null;
  onConfirmarRecebimento: (material: Material, senha: string) => void;
  onConfirmarRecusa: (material: Material, motivo: string) => void;
}

export const DialogConfirmacao = ({
  open,
  onOpenChange,
  tipo,
  material,
  onConfirmarRecebimento,
  onConfirmarRecusa
}: DialogConfirmacaoProps) => {
  const [senha, setSenha] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleConfirmar = () => {
    if (!material) return;

    if (tipo === 'receber') {
      if (!senha.trim()) {
        alert('Por favor, insira sua senha IDUFSC');
        return;
      }
      onConfirmarRecebimento(material, senha);
    } else if (tipo === 'recusar') {
      if (!motivo.trim()) {
        alert('Por favor, informe o motivo da recusa');
        return;
      }
      onConfirmarRecusa(material, motivo);
    }

    // Limpar campos
    setSenha("");
    setMotivo("");
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setSenha("");
      setMotivo("");
    }
    onOpenChange(open);
  };

  if (!material || !tipo) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {tipo === 'receber' ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                Confirmar Recebimento
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600" />
                Recusar Material
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="font-medium">{material.descricao}</p>
            <p className="text-sm text-gray-600">
              Quantidade: {material.quantidade} {material.unidadeMedida}
            </p>
            <p className="text-sm text-gray-600">
              Responsável: {material.responsavelEntrega}
            </p>
          </div>

          {tipo === 'receber' && (
            <div>
              <Label htmlFor="senha">Senha IDUFSC</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha IDUFSC"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                Sua senha será validada para confirmar o recebimento
              </p>
            </div>
          )}

          {tipo === 'recusar' && (
            <div>
              <Label htmlFor="motivo">Motivo da Recusa</Label>
              <Textarea
                id="motivo"
                placeholder="Descreva o motivo da recusa ou desacordo..."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={3}
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              variant={tipo === 'receber' ? 'default' : 'destructive'}
              onClick={handleConfirmar}
            >
              {tipo === 'receber' ? 'Confirmar Recebimento' : 'Confirmar Recusa'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
