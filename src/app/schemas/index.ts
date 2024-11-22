import z from 'zod'

export const esquemaLogin = z.object({
    email: z.string().email({ message: "Endereço de e-mail inválido" }),
    senha: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  })