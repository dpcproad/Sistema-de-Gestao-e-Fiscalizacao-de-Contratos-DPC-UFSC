import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from "react-router-dom"

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

interface OccurrenceCount {
  month: string
  faltaMaterial: number
  materialForaEspec: number
  faltaLimpeza: number
  ausenciaSemReposicao: number
  atrasoSalarios: number
  atrasoINSSFGTS: number
  outros: number
}

const AvaliacaoMensal = () => {
  const allOccurrences: Occurrence[] = JSON.parse(localStorage.getItem('occurrences') || '[]')
  const unresolvedOccurrences = allOccurrences.filter(occ => occ.status === 'nao_resolvida')

  const countByMonthAndType = () => {
    const counts: { [key: string]: OccurrenceCount } = {}
    
    unresolvedOccurrences.forEach(occurrence => {
      const date = new Date(occurrence.date)
      const monthYear = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
      
      if (!counts[monthYear]) {
        counts[monthYear] = {
          month: monthYear,
          faltaMaterial: 0,
          materialForaEspec: 0,
          faltaLimpeza: 0,
          ausenciaSemReposicao: 0,
          atrasoSalarios: 0,
          atrasoINSSFGTS: 0,
          outros: 0
        }
      }
      
      if (occurrence.types.faltaMaterial) counts[monthYear].faltaMaterial++
      if (occurrence.types.materialForaEspec) counts[monthYear].materialForaEspec++
      if (occurrence.types.faltaLimpeza) counts[monthYear].faltaLimpeza++
      if (occurrence.types.ausenciaSemReposicao) counts[monthYear].ausenciaSemReposicao++
      if (occurrence.types.atrasoSalarios) counts[monthYear].atrasoSalarios++
      if (occurrence.types.atrasoINSSFGTS) counts[monthYear].atrasoINSSFGTS++
      if (occurrence.types.outros) counts[monthYear].outros++
    })

    return Object.values(counts)
  }

  const monthlyData = countByMonthAndType()

  const chartConfig = {
    faltaMaterial: { label: 'Falta de material', theme: { light: '#ef4444', dark: '#ef4444' } },
    materialForaEspec: { label: 'Material fora da especificação', theme: { light: '#f97316', dark: '#f97316' } },
    faltaLimpeza: { label: 'Falta de limpeza', theme: { light: '#eab308', dark: '#eab308' } },
    ausenciaSemReposicao: { label: 'Ausência sem reposição', theme: { light: '#22c55e', dark: '#22c55e' } },
    atrasoSalarios: { label: 'Atraso de salários', theme: { light: '#06b6d4', dark: '#06b6d4' } },
    atrasoINSSFGTS: { label: 'Atraso de INSS/FGTS', theme: { light: '#6366f1', dark: '#6366f1' } },
    outros: { label: 'Outros', theme: { light: '#a855f7', dark: '#a855f7' } }
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
        <Card>
          <CardHeader>
            <CardTitle>Ocorrências por Tipo e Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="faltaMaterial" name="Falta de material" fill="#ef4444" />
                  <Bar dataKey="materialForaEspec" name="Material fora da especificação" fill="#f97316" />
                  <Bar dataKey="faltaLimpeza" name="Falta de limpeza" fill="#eab308" />
                  <Bar dataKey="ausenciaSemReposicao" name="Ausência sem reposição" fill="#22c55e" />
                  <Bar dataKey="atrasoSalarios" name="Atraso de salários" fill="#06b6d4" />
                  <Bar dataKey="atrasoINSSFGTS" name="Atraso de INSS/FGTS" fill="#6366f1" />
                  <Bar dataKey="outros" name="Outros" fill="#a855f7" />
                </BarChart>
              </ChartContainer>
            </div>
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AvaliacaoMensal