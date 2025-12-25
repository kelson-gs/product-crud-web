"use client"

import { useEffect } from "react"
import { LoginForm } from "../login-form/loginForm"
import { RegisterForm } from "../register-form/registerForm"
import { merienda } from "@/app/fonts"

type AuthMode = "login" | "register"

interface AuthModalProps {
  open: boolean
  mode: AuthMode
  onClose: () => void
}

export function AuthModal({ open, mode, onClose }: AuthModalProps) {
  // Fecha com ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }

    if (open) {
      document.addEventListener("keydown", handleEsc)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="
        relative z-10 w-full max-w-lg
        rounded-2xl 
        bg-[#10161D]/90 p-8 py-16 
        shadow-2xl
        animate-modal
      ">
        {/* Header */}
        <div className="mb-6 text-start">
          <h2 className={`${merienda.className} text-3xl font-semibold text-white pb-2`}>
            {mode === "login" ? "Login" : "Criar conta"}
          </h2>
          <p className={`${merienda.className}text-sm text-zinc-400`}>
            {mode === "login"
              ? "Acesse sua conta para continuar"
              : "Preencha os dados para criar sua conta"}
          </p>
        </div>

        {/* Conteúdo */}
        {mode === "login" ? <LoginForm /> : <RegisterForm onClose={onClose} />}

        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
