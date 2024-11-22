'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, DollarSign, Settings, Briefcase, Users } from 'lucide-react'
import { ServiceProvider, StatsProvider } from '@/app/page'

// Dados fictícios para o provedor de serviços logado
const currentProvider: ServiceProvider = {
  id: 1,
  name: "Maria Silva",
  rating: 4.8,
  totalServices: 156,
  specialties: ["Idoso", "PCD"],
  image: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
  description: "Cuidadora experiente com 10 anos de prática em cuidados de idosos e PCDs."
}

const providerStats: StatsProvider = {
  providers: 1,
  totalServices: 156,
  happyClients: 142
}

const jobPosts = [
    {
      id: 1,
      clientName: "João Pereira",
      service: "Cuidado de Idoso",
      date: "2024-11-22",
      description: "Procuro cuidador(a) para meu pai de 75 anos, 4 horas durante a tarde.",
    },
    {
      id: 2,
      clientName: "Ana Santos",
      service: "Acompanhante PCD",
      date: "2024-11-22",
      description:
        "Necessito de acompanhante para minha filha com paralisia cerebral por 6 horas hoje.",
    },
    {
      id: 3,
      clientName: "Carlos Oliveira",
      service: "Cuidado Infantil",
      date: "2024-11-22",
      description: "Busco babá para cuidar dos meus gêmeos por 5 horas nesta manhã.",
    },
    {
      id: 4,
      clientName: "Mariana Lima",
      service: "Cuidado de Idoso",
      date: "2024-11-22",
      description: "Preciso de cuidador(a) para minha mãe por 3 horas à noite.",
    },
    {
      id: 5,
      clientName: "Fernando Almeida",
      service: "Acompanhante PCD",
      date: "2024-11-22",
      description:
        "Busco profissional para acompanhar meu irmão em uma consulta médica por 2 horas.",
    },
    {
      id: 6,
      clientName: "Renata Souza",
      service: "Cuidado Infantil",
      date: "2024-11-22",
      description: "Procuro babá para cuidar de meu filho de 3 anos por 4 horas à tarde.",
    },
    {
      id: 7,
      clientName: "Luiz Santos",
      service: "Cuidado de Idoso",
      date: "2024-11-22",
      description: "Busco profissional para cuidar de meu avô por 3 horas após o almoço.",
    },
    {
      id: 8,
      clientName: "Camila Oliveira",
      service: "Acompanhante PCD",
      date: "2024-11-22",
      description:
        "Preciso de um(a) acompanhante para meu filho com deficiência auditiva por 4 horas à tarde.",
    },
    {
      id: 9,
      clientName: "Rafael Silva",
      service: "Cuidado Infantil",
      date: "2024-11-22",
      description:
        "Necessito de babá para cuidar de bebê de 1 ano por 3 horas no início da noite.",
    },
    {
      id: 10,
      clientName: "Beatriz Ferreira",
      service: "Cuidado de Idoso",
      date: "2024-11-22",
      description:
        "Procuro cuidador(a) para meu tio idoso por 5 horas nesta manhã.",
    },
  ];  
  

export function HomeProviderContent() {
  const [isAvailable, setIsAvailable] = useState(true)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo de volta, {currentProvider.name}!</CardTitle>
          <CardDescription>Aqui está um resumo da sua atividade recente</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={currentProvider.image}
              alt={currentProvider.name}
              className="rounded-full w-24 h-24 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{currentProvider.name}</h2>
              <div className="flex items-center mt-1">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-semibold">{currentProvider.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-2">({currentProvider.totalServices} serviços)</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {currentProvider.specialties.map(specialty => (
                  <Badge key={specialty} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant={isAvailable ? "default" : "outline"} onClick={() => setIsAvailable(!isAvailable)}>
              {isAvailable ? "Disponível" : "Indisponível"}
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Gerenciar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Realizados</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.totalServices}</div>
            <p className="text-xs text-muted-foreground">+2% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Satisfeitos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.happyClients}</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganhos do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.250</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Oportunidades de Trabalho na sua região</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {jobPosts.map(post => (
              <li key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="space-y-1">
                  <p className="font-semibold">{post.clientName}</p>
                  <p className="text-sm text-muted-foreground">{post.service}</p>
                  <p className="text-sm">{post.description}</p>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm mr-4">{post.date}</span>
                  <Button size="sm">Se Candidatar</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button>Ver Mais Oportunidades</Button>
      </div>
    </div>
  )
}

