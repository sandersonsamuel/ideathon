'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ContractorForm from '@/components/contractor-form'
import ProviderForm from '@/components/provider-form'

type UserType = 'contractor' | 'provider'

export default function ConfigurationScreen({ userId }: { userId: string }) {

  const [userType, setUserType] = useState<UserType | null>(null)

  const resetUserType = () => {
    setUserType(null)
  }

  return (
    <div className="container mx-auto p-4 w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Configuração da Conta</CardTitle>
          <CardDescription>
            Por favor, configure sua conta para continuar usando nosso serviço.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!userType ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Escolha seu tipo de conta:</h2>
              <RadioGroup onValueChange={(value) => setUserType(value as UserType)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contractor" id="contractor" />
                  <Label htmlFor="contractor">Contratante</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="provider" id="provider" />
                  <Label htmlFor="provider">Prestador de Serviço (Cuidador)</Label>
                </div>
              </RadioGroup>
            </div>
          ) : userType === 'contractor' ? (
            <ContractorForm backFn={resetUserType} userId={userId} />
          ) : (
            <ProviderForm backFn={resetUserType} userId={userId} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

