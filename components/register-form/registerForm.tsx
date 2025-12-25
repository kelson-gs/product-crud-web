"use client"

import { merienda } from "@/app/fonts"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterSchema } from "@/schemas/register-schema"
import { registerUser } from "@/services/auth.services"
import { toast } from "sonner"

interface RegisterProps {
  onClose: () => void
}

export function RegisterForm({ onClose }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterSchema) {
    try {
      await registerUser(data)

      toast.success("Conta criada com sucesso!", {
        style: {
          backgroundColor: 'green',
          border: 'none'
        }
      })
      onClose()
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          backgroundColor: 'red',
          border: 'none'
        }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      <div>
        <input
          {...register("name")}
          className={`${merienda.className} border-b-2 border-[#A5A5A5] w-full text-[#A5A5A5] p-2 outline-none`}
          placeholder="Nome"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          className={`${merienda.className} border-b-2 border-[#A5A5A5] w-full text-[#A5A5A5] p-2 outline-none`}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          className={`${merienda.className} border-b-2 border-[#A5A5A5] w-full text-[#A5A5A5] p-2 outline-none`}
          placeholder="Senha"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        disabled={isSubmitting}
        className="w-full h-[47px] bg-[#31393E] cursor-pointer mt-8"
      >
        {isSubmitting ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  )
}
