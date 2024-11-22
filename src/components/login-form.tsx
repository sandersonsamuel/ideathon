"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth, provideer } from "@/services/firebase"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email({ message: "Endereço de e-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {

    const router = useRouter()

    onAuthStateChanged(auth, (user) => {
        if (user){
            router.push('/')
        }
    })

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: LoginFormValues) {
    console.log(data)
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
                <Input type="password" placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Entrar</Button>
        <Button type="button" variant={'ghost'} onClick={loginWithGoogle} className="w-full">Entrar com o Google</Button>
      </form>
    </Form>
  )
}

