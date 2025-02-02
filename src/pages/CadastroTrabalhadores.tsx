import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Upload } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as XLSX from 'xlsx';

interface Worker {
  nome: string;
  cpf: string;
  cargo: string;
  horario: string;
  itemContrato: number;
  dataAdmissao: string;
  naoOptanteVT: string;
}

const CadastroTrabalhadores = () => {
  const [open, setOpen] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    toast({
      title: "Trabalhador cadastrado",
      description: "O cadastro foi realizado com sucesso.",
    });
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const formattedData: Worker[] = jsonData.map((row: any) => ({
          nome: row['Nome '] || '',
          cpf: row['CPF'] || '',
          cargo: row['Cargo'] || '',
          horario: row['Horário'] || '',
          itemContrato: row['item do contrato'] || 0,
          dataAdmissao: row['data de admissão']?.toString() || '',
          naoOptanteVT: row['Não Optante de VT'] || '',
        }));

        setWorkers(formattedData);
        
        toast({
          title: "Dados importados com sucesso",
          description: `${jsonData.length} registros foram importados.`,
        });
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Ocorreu um erro ao processar o arquivo. Verifique se o formato está correto.",
          variant: "destructive",
        });
      }
    };

    reader.onerror = () => {
      toast({
        title: "Erro na leitura",
        description: "Não foi possível ler o arquivo selecionado.",
        variant: "destructive",
      });
    };

    reader.readAsBinaryString(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          file.type === "application/vnd.ms-excel") {
        processExcelFile(file);
      } else {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione um arquivo Excel (.xlsx ou .xls)",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Cadastro de Trabalhadores Terceirizados
            </h1>
            <div className="flex gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls"
                className="hidden"
              />
              <Button variant="outline" onClick={handleUpload}>
                <Upload className="mr-2 h-5 w-5" />
                Incluir dados
              </Button>
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
          </div>

          <div className="bg-white rounded-lg shadow">
            {workers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Item do Contrato</TableHead>
                    <TableHead>Data de Admissão</TableHead>
                    <TableHead>Não Optante VT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workers.map((worker, index) => (
                    <TableRow key={index}>
                      <TableCell>{worker.nome}</TableCell>
                      <TableCell>{worker.cpf}</TableCell>
                      <TableCell>{worker.cargo}</TableCell>
                      <TableCell>{worker.horario}</TableCell>
                      <TableCell>{worker.itemContrato}</TableCell>
                      <TableCell>{worker.dataAdmissao}</TableCell>
                      <TableCell>{worker.naoOptanteVT}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-6">
                <p className="text-gray-600 text-center">
                  Nenhum trabalhador cadastrado ainda. Clique em "Novo Trabalhador" para começar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroTrabalhadores;