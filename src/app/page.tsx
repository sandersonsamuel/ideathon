'use client'

import { getUserSettings } from "@/querys/getUserSettings";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import ConfigurationScreen from "@/components/configuration-screen";
import { ClipLoader } from 'react-spinners'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Users, Briefcase, Search, LogOut } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const serviceProviders = [
  { 
    id: 1, 
    name: "Maria Silva", 
    rating: 4.8, 
    totalServices: 156,
    specialties: ["Idoso", "PCD"], 
    image: "/placeholder.svg?height=100&width=100",
    description: "Cuidadora experiente com 10 anos de prática em cuidados de idosos e PCDs."
  },
  { 
    id: 2, 
    name: "João Santos", 
    rating: 4.7, 
    totalServices: 98,
    specialties: ["Infantil", "PCD"], 
    image: "/placeholder.svg?height=100&width=100",
    description: "Especializado em cuidados infantis e atendimento a crianças com necessidades especiais."
  },
  { 
    id: 3, 
    name: "Ana Oliveira", 
    rating: 4.9, 
    totalServices: 203,
    specialties: ["Idoso", "Infantil"], 
    image: "/placeholder.svg?height=100&width=100",
    description: "Profissional versátil com experiência em cuidados de idosos e babá."
  },
  { 
    id: 4, 
    name: "Carlos Mendes", 
    rating: 4.6, 
    totalServices: 87,
    specialties: ["PCD", "Idoso"], 
    image: "/placeholder.svg?height=100&width=100",
    description: "Enfermeiro especializado em cuidados de PCDs e idosos acamados."
  },
  { 
    id: 5, 
    name: "Fernanda Lima", 
    rating: 4.8, 
    totalServices: 132,
    specialties: ["Infantil", "PCD"], 
    image: "/placeholder.svg?height=100&width=100",
    description: "Pedagoga com experiência em cuidados infantis e educação especial."
  },
]

const stats = {
  providers: 235,
  totalServices: 3450,
  happyClients: 890
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [configured, setConfigured] = useState<boolean | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [specialty, setSpecialty] = useState("all")

  const router = useRouter()

  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userSettings = await getUserSettings(currentUser.uid)
        setUser(currentUser)
        setConfigured(!!userSettings)
      }

      if (!currentUser){
        setUser(null)
        setConfigured(null)
        router.push('/auth')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (user === null || configured === null) {
    return <div className="w-screen h-screen flex justify-center items-center"><ClipLoader className="text-primary"/></div>
  }

  if (!configured) {
    return <div className="w-full flex justify-center items-center"><ConfigurationScreen userId={user.uid} /></div>
  }

  const filteredProviders = serviceProviders.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === "all" || provider.specialties.includes(specialty))
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 dark">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-3">

        <div className="text-center space-y-2 md:text-start">
          <h1 className="text-3xl font-bold tracking-tight">Silvas job</h1>
          <p className="text-muted-foreground">Encontre os melhores cuidadores em Caxias-MA</p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={'outline'}><LogOut className="h-4 w-4 mr-2" />Sair</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
              <AlertDialogDescription>
                Você será desconectado da aplicação.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={logOut}>Sair</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </header>

      <Card>
        <CardContent className="p-4">
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Buscar por nome</Label>
                <Input 
                  id="search" 
                  placeholder="Nome do cuidador" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <Label htmlFor="specialty">Especialidade</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Idoso">Idoso</SelectItem>
                    <SelectItem value="Infantil">Infantil</SelectItem>
                    <SelectItem value="PCD">PCD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Buscar Cuidadores
            </Button>
          </form>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cuidadores em Caxias-MA</h2>
        {filteredProviders.map(provider => (
          <Card key={provider.id}>
            <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-4 py-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={provider.image} alt={provider.name} />
                <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold">{provider.name}</h3>
                <div className="flex items-center justify-center sm:justify-start space-x-1 mt-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({provider.totalServices} serviços)</span>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-1 mt-2">
                  {provider.specialties.map(specialty => (
                    <Badge key={specialty} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{provider.description}</p>
              </div>
              <Button className="w-full sm:w-auto">Ver Perfil</Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-3 gap-4 text-center">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.providers}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex items-center justify-center">
              <Users className="h-4 w-4 mr-1" />
              Cuidadores
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.totalServices}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex items-center justify-center">
              <Briefcase className="h-4 w-4 mr-1" />
              Serviços Realizados
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.happyClients}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex items-center justify-center">
              <MapPin className="h-4 w-4 mr-1" />
              Clientes em Caxias
            </CardDescription>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

