"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { toast } from "sonner"

export function Sidebar() {
    const pathname = usePathname()

    const handleLogout = async () => {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })

        window.location.href = "/login"
    }

    const linkClass = (path: string) =>
        pathname === path
            ? "block px-4 py-2 bg-zinc-800 rounded"
            : "block px-4 py-2 hover:bg-zinc-800 rounded"

    return (
        <nav className="p-4 space-y-2">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>

            <Link href="/dashboard" className={linkClass("/dashboard")}>
                📦 Catálogo
            </Link>

            <Link href="/dashboard/products" className={linkClass("/dashboard/products")}>
                ➕ Cadastro Produto
            </Link>

            <div className=" border-t-1 border-white mt-50">

                <Button
                    variant={"link"}
                    className="text-white cursor-pointer"
                    onClick={handleLogout}
                >

                    Sair
                </Button>
            </div>
        </nav>
    )
}
