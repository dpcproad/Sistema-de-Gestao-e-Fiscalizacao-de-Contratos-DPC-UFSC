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

        <div className="flex justify-end">
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