import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const CadastroTrabalhadores = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    toast({
      title: "Trabalhador cadastrado",
      description: "O cadastro foi realizado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Cadastro de Trabalhadores Terceirizados
            </h1>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Novo Trabalhador
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Trabalhador</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funcao">Função</Label>
                    <Input id="funcao" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contrato">Contrato</Label>
                    <Input id="contrato" required />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Cadastrar</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-center">
              Nenhum trabalhador cadastrado ainda. Clique em "Novo Trabalhador" para começar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroTrabalhadores;