import { z } from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres"),

  email: z
    .string()
    .email("Email inválido"),

  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
})

export type RegisterSchema = z.infer<typeof registerSchema>
