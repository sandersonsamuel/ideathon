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
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Label } from './ui/label'

const providerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  careTypes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos um tipo de cuidado",
  }),
  skills: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Selecione pelo menos uma habilidade",
  }),
  availability: z.string().min(2, 'Disponibilidade é obrigatória'),
  curriculum: z.string().min(10, 'Currículo é obrigatório'),
})

type ProviderFormValues = z.infer<typeof providerSchema>

const careTypeOptions = [
  { id: 'idoso', label: 'Cuidado de Idosos' },
  { id: 'infantil', label: 'Cuidado Infantil' },
  { id: 'pcd', label: 'Cuidado de PCD' },
]

const skillOptions = [
  { id: 'basic', label: 'Cuidados básicos' },
  { id: 'meds', label: 'Administração de medicamentos' },
  { id: 'firstAid', label: 'Primeiros socorros' },
  { id: 'special', label: 'Cuidados especiais (autismo, mobilidade reduzida, etc.)' },
  { id: 'therapy', label: 'Terapia ocupacional' },
  { id: 'physio', label: 'Fisioterapia' },
  { id: 'nutrition', label: 'Nutrição' },
]

type Props = {
  userId: string
  backFn: () => void
}

export default function ProviderForm({ userId, backFn }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      careTypes: [],
      skills: [],
      availability: '',
      curriculum: '',
    },
  })

  async function onSubmit(data: ProviderFormValues) {
    setIsSubmitting(true)
    try {
      const collectRef = doc(db, 'userSettings', userId)
      await setDoc(collectRef, {
        userType: 'provider',
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
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="Seu CPF" {...field} />
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

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>


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
          name="careTypes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Tipos de Cuidado</FormLabel>
                <FormDescription>
                  Selecione todos os tipos de cuidado que você oferece
                </FormDescription>
              </div>
              {careTypeOptions.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name="careTypes"
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
          name="skills"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Habilidades</FormLabel>
                <FormDescription>
                  Selecione todas as habilidades que você possui
                </FormDescription>
              </div>
              {skillOptions.map((skill) => (
                <FormField
                  key={skill.id}
                  control={form.control}
                  name="skills"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={skill.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(skill.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, skill.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== skill.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {skill.label}
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
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disponibilidade</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva seus horários, dias e regiões de atuação" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="curriculum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currículo</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva sua experiência, formação e qualificações relevantes" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-3'>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Configuração'}
          </Button>
          <Button type='button' onClick={backFn}>Voltar</Button>
        </div>
      </form>
    </Form>
  )
}

