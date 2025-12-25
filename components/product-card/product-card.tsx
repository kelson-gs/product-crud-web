"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
    product: any
    onToggleStatus: () => void
    onDelete: () => void
    onEdit: () => void
}

export function ProductCard({ product, onToggleStatus, onDelete, onEdit }: ProductCardProps) {
    return (
        <Card className="hover:shadow-md transition w-60" >
            <CardHeader>
                <CardTitle className="flex justify-between items-center" >
                    {product.name}
                    < Badge variant={product.status ? "default" : "secondary"} >
                        {product.status ? "Ativo" : "Inativo"}
                    </Badge>
                </CardTitle>
            </CardHeader>

            < CardContent className="space-y-3 flex items-center justify-center flex-col" >
                {
                    product.image && (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-40 h-40 object-cover rounded-md "
                        />
                    )
                }

                {
                    product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2" >
                            {product.description}
                        </p>
                    )
                }

                <div className="grid grid-cols-3 gap-2 items-center justify-center" >
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onToggleStatus}
                        className="cursor-pointer"
                    >
                        {product.status ? "Inativar" : "Ativar"}
                    </Button>

                    < Button
                        size="sm"
                        variant="destructive"
                        onClick={onDelete}
                        className="cursor-pointer"
                    >
                        Excluir
                    </Button>

                    <Button 
                        
                        variant="default"
                        onClick={onEdit}
                        className="cursor-pointer w-full"
                    >
                        Editar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
