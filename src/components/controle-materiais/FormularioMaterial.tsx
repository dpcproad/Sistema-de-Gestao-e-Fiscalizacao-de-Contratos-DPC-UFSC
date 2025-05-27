
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Material } from "@/pages/ControleMateriais";

interface FormularioMaterialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (dados: Omit<Material, 'id' | 'status' | 'remetente'>) => void;
  materialInicial?: Material | null;
}

interface FormData {
  descricao: string;
  unidadeMedida: string;
  quantidade: number;
  data: string;
  responsavelEntrega: string;
  local: string;
}

export const FormularioMaterial = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  materialInicial 
}: FormularioMaterialProps) => {
  const form = useForm<FormData>({
    defaultValues: {
      descricao: "",
      unidadeMedida: "",
      quantidade: 0,
      data: "",
      responsavelEntrega: "",
      local: ""
    }
  });

  useEffect(() => {
    if (materialInicial) {
      form.reset({
        descricao: materialInicial.descricao,
        unidadeMedida: materialInicial.unidadeMedida,
        quantidade: materialInicial.quantidade,
        data: materialInicial.data,
        responsavelEntrega: materialInicial.responsavelEntrega,
        local: materialInicial.local
      });
    } else {
      form.reset({
        descricao: "",
        unidadeMedida: "",
        quantidade: 0,
        data: "",
        responsavelEntrega: "",
        local: ""
      });
    }
  }, [materialInicial, form]);

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {materialInicial ? 'Editar Material' : 'Novo Material'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o material ou insumo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unidadeMedida"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade de Medida</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Unidade, Kg, Litro, Resma..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Entrega</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsavelEntrega"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsável pela Entrega</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do responsável..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="local"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local de Entrega</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Endereço ou local específico..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {materialInicial ? 'Atualizar' : 'Cadastrar'} Material
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
