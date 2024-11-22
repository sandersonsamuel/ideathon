"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth, provideer } from "@/services/firebase"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const signUpSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Endereço de e-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignUpForm() {

    const router = useRouter()

    onAuthStateChanged(auth, (user) => {
        if (user){
            router.push('/')
        }
    })

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const {setValue} = form 

  async function onSubmit(data: SignUpFormValues) {
    await createUserWithEmailAndPassword(auth, data.email, data.password).then((res) => {
        setValue('email', '')
        setValue('password', '')
        toast.success("Conta criada com sucesso!")
    }).catch(err => {
        toast.error("Erro ao criar conta")
    })
  }
  
  const loginWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, provideer)
        
        if (res.user){
            toast.success("Login realizado!")
            router.push('/')
        }
    }catch(err){
        console.log(err);
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
                <Input placeholder="Digite seu nome" {...field} />
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
                <Input placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Crie uma senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirme sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Cadastrar</Button>
        <Button type="button" variant={'ghost'} onClick={loginWithGoogle} className="w-full">Entrar com o Google</Button>
      </form>
    </Form>
  )
}

