'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import toast from 'react-hot-toast'

const contractorSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  document: z.string().min(11, 'CPF/CNPJ inválido'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  careType: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos um tipo de cuidado",
  }),
  schedule: z.string().min(2, 'Horário é obrigatório'),
  location: z.string().min(2, 'Localização é obrigatória'),
  specificSkills: z.string(),
})

type ContractorFormValues = z.infer<typeof contractorSchema>

const careTypeOptions = [
  { id: 'idoso', label: 'Cuidado de Idosos' },
  { id: 'infantil', label: 'Cuidado Infantil' },
  { id: 'pcd', label: 'Cuidado de PCD' },
]

type Props = {
  userId: string
  backFn: () => void
}

export default function ContractorForm({ userId, backFn} : Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContractorFormValues>({
    resolver: zodResolver(contractorSchema),
    defaultValues: {
      name: '',
      document: '',
      email: '',
      phone: '',
      careType: [],
      schedule: '',
      location: '',
      specificSkills: '',
    },
  })

  async function onSubmit(data: ContractorFormValues) {
    try {
      const collectRef = doc(db, 'userSettings', userId)
      await setDoc(collectRef, {
        userType: 'contractor',
        ...data
      })
      toast.success('Dados cadastrados com sucesso!')
      location.reload()
    } catch (error) {
      toast.success('Erro ao cadastrar os dados')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF/CNPJ</FormLabel>
              <FormControl>
                <Input placeholder="Seu CPF ou CNPJ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="Seu telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="careType"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Tipo de Cuidado</FormLabel>
                <FormDescription>
                  Selecione todos os tipos de cuidado que você precisa
                </FormDescription>
              </div>
              {careTypeOptions.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name="careType"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, option.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== option.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Segunda a Sexta, 8h às 18h" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Cidade, Estado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specificSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habilidades Específicas</FormLabel>
              <FormControl>
                <Textarea placeholder="Liste habilidades específicas desejadas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-3'>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Configuração'}
          </Button>
          <Button onClick={backFn} >Voltar</Button>
        </div>
      </form>
    </Form>
  )
}

