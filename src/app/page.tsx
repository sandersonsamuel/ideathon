'use client'

import { getUserSettings } from "@/querys/getUserSettings";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import ConfigurationScreen, { UserType } from "@/components/configuration-screen";
import { ClipLoader } from 'react-spinners'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import {LogOut } from 'lucide-react'

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
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { HomeContractorContent } from "@/components/home-contractor-content";
import { HomeProviderContent } from "@/components/home-provider-content";

export type ServiceProvider = {
  id: number;
  name: string;
  rating: number;
  totalServices: number;
  specialties: string[];
  image: string;
  description: string;
};

export type StatsProvider = {
  providers: number
  totalServices: number
  happyClients: number
}


export default function Home() {

  const [user, setUser] = useState<User | null>(null)
  const [configured, setConfigured] = useState<DocumentSnapshot<DocumentData, DocumentData> | null>()
  const configuredData = configured?.data()?.userType as UserType

  const router = useRouter()

  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userSettings = await getUserSettings(currentUser.uid)
        setUser(currentUser)
        if (userSettings){
          setConfigured(userSettings)
        }
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">

      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-3">

        <div className="text-center space-y-2 md:text-start">
          <h1 className="text-3xl font-bold tracking-tight">BemMeCare</h1>
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

      {
        configuredData && configuredData == 'contractor' ? <HomeContractorContent/> : <HomeProviderContent/>
        
      }
      
    </div>
  );
}

