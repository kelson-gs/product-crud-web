"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Image as ImageIcon, Upload } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { Product } from "@/types/product"

interface ProductFormEditProps {
    onSubmit: (data: any, image?: any) => void
    product: Product | null
}

export function ProductFormEdit({ product, onSubmit }: ProductFormEditProps) {
    const [form, setForm] = useState({
        product_code: "",
        description: "",
    })

    const [loading, setLoading] = useState(false)

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    /* 🔹 Preenche os dados ao abrir */
    useEffect(() => {
        if (product) {
            setForm({
                product_code: product.product_code,
                description: product.description || "",
            })

            if (product.image) {
                setImagePreview(product.image)
            }
        }
    }, [product])

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }

    function removeImage() {
        setImageFile(null)
        setImagePreview(null)
    }

    function handleSubmit() {
        setLoading(true)

        let formData: FormData | null = null

        if (imageFile) {
            formData = new FormData()
            formData.append("file", imageFile)

            onSubmit(
                {
                    id: product?.id,
                    product_code: form.product_code,
                    description: form.description,
                    status: product?.status
                },
                formData
            )
        } else {

            onSubmit(
                {
                    id: product?.id,
                    product_code: form.product_code,
                    description: form.description,
                    status: product?.status,
                    image: product?.image
                }
            )
        }


        setLoading(false)
    }

    return (
        <div className="space-y-4 max-w-md">

            {/* Upload de imagem */}
            <div className="space-y-3 flex items-center justify-center">
                {imagePreview ? (
                    <div className="relative w-32 h-32">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg border"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition"
                    >
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground mt-2">
                            Alterar imagem
                        </span>
                    </label>
                )}

                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>

            <Input
                placeholder="Código do produto"
                name="product_code"
                value={form.product_code}
                onChange={handleChange}
            />

            <Textarea
                placeholder="Descrição"
                name="description"
                value={form.description}
                onChange={handleChange}
            />

            <Button
                onClick={handleSubmit}
                className="w-full cursor-pointer"
                disabled={loading}
            >
                {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
        </div>
    )
}