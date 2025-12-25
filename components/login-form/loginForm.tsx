import { merienda } from "@/app/fonts";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from 'sonner';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("res: ", { email, password });

      const result = await res.json().catch(() => null)

      if (!res.ok) {
        if (res.status === 401) {
          toast.warning("E-mail ou senha incorretos.", {
            style: {
              backgroundColor: 'red',
              border: 'none'
            }
          })
          return
        }

        toast.warning(result?.message || "Ocorreu um erro inesperado. Tente novamente.", {
          style: {
            backgroundColor: 'red',
            border: 'none'
          }
        })
        return
      }

      toast.success('Login realizado com sucesso!', {
          style: { 
            backgroundColor: 'green', 
            border: 'none' 
          }});
      window.location.href = "/dashboard"

    } catch (error) {
      toast.warning('Não foi possível conectar ao servidor', {
        style: {
          backgroundColor: 'red',
          border: 'none'
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <input
        className={` ${merienda.className} input border-b-2 border-[#A5A5A5] w-full text-[#A5A5A5] p-2 outline-none`}
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className={` ${merienda.className} input border-b-2 border-[#A5A5A5] w-full text-[#A5A5A5] p-2 outline-none`}
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className="w-full h-[47px] bg-[#31393E] hover:bg-[#3b454b] cursor-pointer mt-8"
        onClick={handleLogin}
      >Entrar</Button>
    </div>
  )
}