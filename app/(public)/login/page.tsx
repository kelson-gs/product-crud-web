"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { merienda } from "../../fonts";
import { AuthModal } from "@/components/auth-modal/authModal";

export default function Login() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")

  return (
    <>
      <div
        className={`
        ${merienda.className}
        relative
        flex min-h-screen items-end justify-center
        bg-[url('/birld.png')] bg-cover bg-center
        pb-16
        before:absolute
        before:inset-0
        before:bg-black/30
        before:content-['']
      `}
      >
        <div className="relative z-10">

          <div className="text-center">
            <h1 className="text-white text-[64px]">
              Bem-vindo
            </h1>
            <h2 className="text-[#9E9C9C] text-[32px]">
              Tecnologia refinada. Experiência absoluta.
            </h2>
          </div>

          <div className="flex flex-col items-center mt-16 gap-4">
            <Button
              className="w-[444px] h-[57px] bg-[#31393E] hover:bg-[#3b454b] cursor-pointer"
              onClick={() => {
                setMode("login")
                setOpen(true)
              }}
            >
              Login
            </Button>

            <div className="text-[#9E9C9C]">
              Não tem uma conta?
              <Button 
                variant="link" 
                className="text-white cursor-pointer"
                onClick={() => {
                  setMode("register")
                  setOpen(true)
                }}
              >
                Cadastre-se
              </Button>
            </div>
          </div>

        </div>
      </div>

      <AuthModal open={open} mode={mode} onClose={() => setOpen(false)} />
    </>
  );
}
