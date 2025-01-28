import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const Ocorrencias = () => {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const { toast } = useToast()
  
  const [selectedItems, setSelectedItems] = useState({
    faltaMaterial: false,
    materialForaEspec: false,
    faltaLimpeza: false,
    outros: false,
  })

  const handleSubmit = (action: 'save' | 'send') => {
    if (!Object.values(selectedItems).some(value => value)) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um tipo de ocorrência",
        variant: "destructive"
      })
      return
    }

    if (!description.trim()) {
      toast({
        title: "Erro",
        description: "Adicione uma descrição da ocorrência",
        variant: "destructive"
      })
      return
    }

    // Here you would handle the form submission
    const currentDate = new Date().toLocaleString()
    console.log({
      date: currentDate,
      types: selectedItems,
      description,
      action
    })

    toast({
      title: action === 'save' ? "Ocorrência gravada" : "Ocorrência enviada para preposto",
      description: "Ação realizada com sucesso",
    })

    setOpen(false)
    setDescription("")
    setSelectedItems({
      faltaMaterial: false,
      materialForaEspec: false,
      faltaLimpeza: false,
      outros: false,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ocorrências</h1>
        <div className="flex gap-4 items-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary">
                <Plus className="mr-2 h-4 w-4" />
                Nova ocorrência
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nova Ocorrência</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <Label>Tipo de Ocorrência</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="faltaMaterial" 
                        checked={selectedItems.faltaMaterial}
                        onCheckedChange={(checked) => 
                          setSelectedItems(prev => ({...prev, faltaMaterial: checked as boolean}))
                        }
                      />
                      <Label htmlFor="faltaMaterial">Falta de material</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="materialForaEspec" 
                        checked={selectedItems.materialForaEspec}
                        onCheckedChange={(checked) => 
                          setSelectedItems(prev => ({...prev, materialForaEspec: checked as boolean}))
                        }
                      />
                      <Label htmlFor="materialForaEspec">Material fora da especificação</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="faltaLimpeza" 
                        checked={selectedItems.faltaLimpeza}
                        onCheckedChange={(checked) => 
                          setSelectedItems(prev => ({...prev, faltaLimpeza: checked as boolean}))
                        }
                      />
                      <Label htmlFor="faltaLimpeza">Falta de limpeza</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="outros" 
                        checked={selectedItems.outros}
                        onCheckedChange={(checked) => 
                          setSelectedItems(prev => ({...prev, outros: checked as boolean}))
                        }
                      />
                      <Label htmlFor="outros">Outros</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva a ocorrência..."
                    className="h-32"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Data e hora: {new Date().toLocaleString()}
                </div>
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" onClick={() => handleSubmit('save')}>
                    Gravar ocorrência
                  </Button>
                  <Button onClick={() => handleSubmit('send')}>
                    Enviar para preposto
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <a href="/" className="text-primary hover:underline">
            Voltar ao início
          </a>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Sistema de registro de ocorrências em desenvolvimento.</p>
      </div>
    </div>
  )
}

export default Ocorrencias