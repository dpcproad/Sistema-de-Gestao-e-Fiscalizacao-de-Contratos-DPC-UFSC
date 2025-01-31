import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

interface Occurrence {
  id: string
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
}

const AvaliacaoMensal = () => {
  const { toast } = useToast()
  const allOccurrences: Occurrence[] = JSON.parse(localStorage.getItem('occurrences') || '[]')
  const unresolvedOccurrences = allOccurrences.filter(occ => occ.status === 'nao_resolvida')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const countTotalByType = () => {
    const totals = {
      faltaMaterial: 0,
      materialForaEspec: 0,
      faltaLimpeza: 0,
      ausenciaSemReposicao: 0,
      atrasoSalarios: 0,
      atrasoINSSFGTS: 0,
      outros: 0
    }

    unresolvedOccurrences.forEach(occurrence => {
      if (occurrence.types.faltaMaterial) totals.faltaMaterial++
      if (occurrence.types.materialForaEspec) totals.materialForaEspec++
      if (occurrence.types.faltaLimpeza) totals.faltaLimpeza++
      if (occurrence.types.ausenciaSemReposicao) totals.ausenciaSemReposicao++
      if (occurrence.types.atrasoSalarios) totals.atrasoSalarios++
      if (occurrence.types.atrasoINSSFGTS) totals.atrasoINSSFGTS++
      if (occurrence.types.outros) totals.outros++
    })

    return totals
  }

  const totalCounts = countTotalByType()
  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  const handleReviewOccurrences = () => {
    window.location.href = '/ocorrencias'
  }

  const handleSignAndSend = () => {
    toast({
      title: "Avaliação Mensal Enviada",
      description: `A avaliação mensal de ${currentMonth} foi enviada com sucesso.`,
    })
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
        <h1 className="text-2xl font-bold text-gray-900">Avaliação Mensal</h1>
        <Link to="/" className="text-primary hover:underline">
          Voltar ao início
        </Link>
      </div>
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Falta de Material
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCounts.faltaMaterial}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Material Fora da Especificação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCounts.materialForaEspec}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Falta de Limpeza
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCounts.faltaLimpeza}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Ausência sem Reposição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCounts.ausenciaSemReposicao}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Atraso de Salários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCounts.atrasoSalarios}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Atraso de INSS/FGTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCounts.atrasoINSSFGTS}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Outros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCounts.outros}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
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

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Enviar Avaliação de {currentMonth}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar Avaliação Mensal</DialogTitle>
                <DialogDescription>
                  Escolha uma das opções abaixo para prosseguir com a avaliação mensal.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleReviewOccurrences}
                >
                  Revisar ocorrências
                </Button>
                <Button 
                  className="w-full justify-start"
                  onClick={handleSignAndSend}
                >
                  Assinar e enviar avaliação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default AvaliacaoMensal