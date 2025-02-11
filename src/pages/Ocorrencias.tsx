
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, CheckCircle, XCircle, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Occurrence {
  id: string
  sequenceNumber: number
  date: string
  types: {
    faltaMaterial: boolean
    materialForaEspec: boolean
    faltaLimpeza: boolean
    ausenciaSemReposicao: boolean
    atrasoSalarios: boolean
    atrasoINSSFGTS: boolean
    outros: boolean
  }
  description: string
  status: 'gravada' | 'enviada' | 'resolvida' | 'nao_resolvida'
  attachments?: File[]
  responseDeadline: string
}

const Ocorrencias = () => {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const { toast } = useToast()
  const [occurrences, setOccurrences] = useState<Occurrence[]>([])
  const [attachments, setAttachments] = useState<File[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedItems, setSelectedItems] = useState({
    faltaMaterial: false,
    materialForaEspec: false,
    faltaLimpeza: false,
    ausenciaSemReposicao: false,
    atrasoSalarios: false,
    atrasoINSSFGTS: false,
    outros: false,
  })

  const calculateResponseDeadline = (types: Occurrence['types']): string => {
    const currentDate = new Date()
    let deadlineDate: Date

    if (types.faltaMaterial || types.materialForaEspec) {
      deadlineDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Add 1 day
    } else {
      deadlineDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000) // Add 2 hours
    }

    return deadlineDate.toLocaleString()
  }

  const getOccurrenceTypes = (types: Occurrence['types']) => {
    const selectedTypes = []
    if (types.faltaMaterial) selectedTypes.push('Falta de material')
    if (types.materialForaEspec) selectedTypes.push('Material fora da especificação')
    if (types.faltaLimpeza) selectedTypes.push('Falta de limpeza')
    if (types.ausenciaSemReposicao) selectedTypes.push('Ausência sem reposição do(a) trabalhador(a) terceirizado(a)')
    if (types.atrasoSalarios) selectedTypes.push('Atraso de salários e/ou benefícios (VA/VT)')
    if (types.atrasoINSSFGTS) selectedTypes.push('Atraso de INSS e/ou FGTS')
    if (types.outros) selectedTypes.push('Outros')
    return selectedTypes.join(', ')
  }

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

    const responseDeadline = calculateResponseDeadline(selectedItems)
    const nextSequenceNumber = occurrences.length > 0 
      ? Math.max(...occurrences.map(o => o.sequenceNumber)) + 1 
      : 1

    const newOccurrence: Occurrence = {
      id: Math.random().toString(36).substr(2, 9),
      sequenceNumber: nextSequenceNumber,
      date: new Date().toLocaleString(),
      types: selectedItems,
      description: description.trim(),
      status: action === 'save' ? 'gravada' : 'enviada',
      attachments: attachments,
      responseDeadline
    }

    setOccurrences(prev => [...prev, newOccurrence].sort((a, b) => a.sequenceNumber - b.sequenceNumber))

    toast({
      title: action === 'save' ? "Ocorrência gravada" : "Ocorrência enviada para preposto",
      description: `Prazo de resposta: ${responseDeadline}`,
    })

    setOpen(false)
    setDescription("")
    setAttachments([])
    setSelectedItems({
      faltaMaterial: false,
      materialForaEspec: false,
      faltaLimpeza: false,
      ausenciaSemReposicao: false,
      atrasoSalarios: false,
      atrasoINSSFGTS: false,
      outros: false,
    })
  }

  const handleEdit = (id: string) => {
    toast({
      title: "Editar ocorrência",
      description: "Funcionalidade em desenvolvimento",
    })
  }

  const handleDelete = (id: string) => {
    setOccurrences(prev => prev.filter(occurrence => occurrence.id !== id))
    toast({
      title: "Ocorrência excluída",
      description: "A ocorrência foi removida com sucesso",
    })
  }

  const handleAcceptResponse = (id: string) => {
    setOccurrences(prev => prev.map(occurrence => 
      occurrence.id === id 
        ? { ...occurrence, status: 'resolvida' as const } 
        : occurrence
    ))
    toast({
      title: "Resposta aceita",
      description: "A ocorrência foi marcada como resolvida",
    })
  }

  const handleRejectResponse = (id: string) => {
    setOccurrences(prev => prev.map(occurrence => 
      occurrence.id === id 
        ? { ...occurrence, status: 'nao_resolvida' as const } 
        : occurrence
    ))
    toast({
      title: "Resposta recusada",
      description: "A ocorrência foi marcada como não resolvida e incluída na Avaliação Mensal",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setAttachments(filesArray)
    }
  }

  const handleGenerateReport = () => {
    toast({
      title: "Relatório Gerado",
      description: "O relatório de pendências foi gerado com os filtros selecionados.",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ocorrências</h1>
        <div className="flex gap-4 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Gerar Relatório de Pendências
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar Relatório de Pendências</DialogTitle>
                <DialogDescription>
                  Selecione os filtros para gerar o relatório.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="startDate">Data de Início</label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="endDate">Data Fim</label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="type">Tipo</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faltaMaterial">Falta de Material</SelectItem>
                      <SelectItem value="materialForaEspec">Material Fora da Especificação</SelectItem>
                      <SelectItem value="faltaLimpeza">Falta de Limpeza</SelectItem>
                      <SelectItem value="ausenciaSemReposicao">Ausência sem Reposição</SelectItem>
                      <SelectItem value="atrasoSalarios">Atraso de Salários</SelectItem>
                      <SelectItem value="atrasoINSSFGTS">Atraso de INSS/FGTS</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="status">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gravada">Gravada</SelectItem>
                      <SelectItem value="enviada">Enviada</SelectItem>
                      <SelectItem value="resolvida">Resolvida</SelectItem>
                      <SelectItem value="nao_resolvida">Não Resolvida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleGenerateReport}>Gerar Relatório</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
                    <div className="flex items-center justify-between">
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
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        24h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
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
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        24h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
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
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        2h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="ausenciaSemReposicao" 
                          checked={selectedItems.ausenciaSemReposicao}
                          onCheckedChange={(checked) => 
                            setSelectedItems(prev => ({...prev, ausenciaSemReposicao: checked as boolean}))
                          }
                        />
                        <Label htmlFor="ausenciaSemReposicao">Ausência sem reposição do(a) trabalhador(a) terceirizado(a)</Label>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        2h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="atrasoSalarios" 
                          checked={selectedItems.atrasoSalarios}
                          onCheckedChange={(checked) => 
                            setSelectedItems(prev => ({...prev, atrasoSalarios: checked as boolean}))
                          }
                        />
                        <Label htmlFor="atrasoSalarios">Atraso de salários e/ou benefícios (VA/VT)</Label>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        2h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="atrasoINSSFGTS" 
                          checked={selectedItems.atrasoINSSFGTS}
                          onCheckedChange={(checked) => 
                            setSelectedItems(prev => ({...prev, atrasoINSSFGTS: checked as boolean}))
                          }
                        />
                        <Label htmlFor="atrasoINSSFGTS">Atraso de INSS e/ou FGTS</Label>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        2h
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
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
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        2h
                      </span>
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
                <div className="space-y-2">
                  <Label htmlFor="attachments">Anexos</Label>
                  <Input
                    id="attachments"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {attachments.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {attachments.length} arquivo(s) selecionado(s)
                    </div>
                  )}
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

      {occurrences.length > 0 ? (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Nº</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipos</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Prazo de Resposta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {occurrences
                .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
                .map((occurrence) => (
                  <TableRow key={occurrence.id}>
                    <TableCell className="font-medium">{occurrence.sequenceNumber}</TableCell>
                    <TableCell>{occurrence.date}</TableCell>
                    <TableCell>{getOccurrenceTypes(occurrence.types)}</TableCell>
                    <TableCell>{occurrence.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {occurrence.responseDeadline}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          occurrence.status === 'resolvida' ? 'default' :
                          occurrence.status === 'nao_resolvida' ? 'destructive' :
                          'outline'
                        }
                        className={
                          occurrence.status === 'resolvida' 
                            ? 'bg-[#F2FCE2] hover:bg-[#F2FCE2] text-green-700 border-green-200' 
                            : occurrence.status === 'nao_resolvida'
                            ? 'bg-red-500 hover:bg-red-500 text-white border-red-400'
                            : ''
                        }
                      >
                        {occurrence.status === 'resolvida' ? 'Resolvida' :
                         occurrence.status === 'nao_resolvida' ? 'Não resolvida' :
                         occurrence.status.charAt(0).toUpperCase() + occurrence.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(occurrence.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(occurrence.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {occurrence.status === 'enviada' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAcceptResponse(occurrence.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRejectResponse(occurrence.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Nenhuma ocorrência registrada.</p>
        </div>
      )}
    </div>
  )
}

export default Ocorrencias
