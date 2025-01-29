import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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
  // For demonstration purposes, we're getting occurrences from localStorage
  // In a real application, this would come from a backend
  const allOccurrences: Occurrence[] = JSON.parse(localStorage.getItem('occurrences') || '[]')
  const unresolvedOccurrences = allOccurrences.filter(occ => occ.status === 'nao_resolvida')

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

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Avaliação Mensal</h1>
        <a href="/" className="text-primary hover:underline">
          Voltar ao início
        </a>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Ocorrências Não Resolvidas</h2>
        
        {unresolvedOccurrences.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipos</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unresolvedOccurrences.map((occurrence) => (
                <TableRow key={occurrence.id}>
                  <TableCell>{occurrence.date}</TableCell>
                  <TableCell>{getOccurrenceTypes(occurrence.types)}</TableCell>
                  <TableCell>{occurrence.description}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      Não resolvida
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-600">Não há ocorrências não resolvidas no momento.</p>
        )}
      </div>
    </div>
  )
}

export default AvaliacaoMensal