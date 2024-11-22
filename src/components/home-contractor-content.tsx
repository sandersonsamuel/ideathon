import { useState } from "react"
import { HomeContractor } from "./home-contractor"

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

export const HomeContractorContent = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [specialty, setSpecialty] = useState("all")

    const filteredProviders = serviceProviders.filter(provider => 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (specialty === "all" || provider.specialties.includes(specialty))
      )

    return (
        <HomeContractor filteredProviders={filteredProviders} searchTerm={searchTerm} searchTermFn={setSearchTerm} specialty={specialty} specialtyFn={setSpecialty} stats={stats}/>
    )
}