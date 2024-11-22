import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Users, Briefcase, Search } from 'lucide-react'
import { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button"
import { ServiceProvider, StatsProvider } from "@/app/page"

type Props = {
    specialtyFn: Dispatch<SetStateAction<string>>
    searchTerm: string
    searchTermFn: Dispatch<SetStateAction<string>>
    specialty: string
    filteredProviders: ServiceProvider[]
    stats: StatsProvider
}

export const HomeContractor = ({specialtyFn: setSpecialty, searchTerm, searchTermFn: setSearchTerm, specialty, filteredProviders, stats} : Props) => {

    return (
        
        <>
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
        </>
    )

}