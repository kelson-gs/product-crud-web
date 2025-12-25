"use client"

import { useEffect, useMemo, useState } from "react"
import { productsService } from "@/services/product.services"
import { Product } from '../../../types/product';
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export default function CatalogoPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await productsService.getAll()
                setProducts(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    const filteredProducts = useMemo(() => {
        if (!search) return products

        return products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [products, search])

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Catálogo</h1>
                <p className="text-muted-foreground">
                    Gerencie e visualize seus produtos
                </p>
            </div>

            <Input
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" w-[80%] ml-[10%] my-5"
            />

            {loading && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin" />
                    Carregando produtos...
                </div>
            )}

            {/* Lista */}
            {!loading && filteredProducts.length === 0 && (
                <p className=" flex items-center justify-center text-muted-foreground">
                    Nenhum produto encontrado.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
                {filteredProducts.map(product => (
                    <Card
                        key={product.id}
                        className={`overflow-hidden hover:shadow-lg transition-shadow duration-200 py-0 ${product.status ? '' : 'opacity-50'}`}
                    >
                        <div className="relative w-full h-full bg-zinc-100 py-0">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-sm text-zinc-400 py-0" >
                                    Sem imagem
                                </div>
                            )}

                            <div className="absolute top-2 right-2">
                                <Badge variant={product.status ? "default" : "secondary"}>
                                    {product.status ? "Ativo" : "Inativo"}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className=" bg-black/85 p-4 ">
                            {product.description && (
                                <p className="text-[16px] text-start text-white line-clamp-2">
                                    {product.description}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}