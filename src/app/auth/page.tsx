"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/sign-up-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Auth() {
  
  const [activeTab, setActiveTab] = useState("entrar")

  return (
    <div className="flex items-center justify-center min-h-screen"> 
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
          <CardDescription className="text-center">
            {activeTab === "entrar" ? "Entre na sua conta" : "Crie uma nova conta"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entrar">Entrar</TabsTrigger>
              <TabsTrigger value="cadastrar">Cadastrar</TabsTrigger>
            </TabsList>
            <TabsContent value="entrar">
              <LoginForm />
            </TabsContent>
            <TabsContent value="cadastrar">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

