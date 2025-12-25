"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Image as ImageIcon, Upload } from "lucide-react"
import { Textarea } from "../ui/textarea"

interface ProductFormProps {
    onSubmit: (data: any, image: any) => void
}

export function ProductForm({ onSubmit }: ProductFormProps) {
    const [form, setForm] = useState({
        product_code: "",
        description: "",
    })

    const [loading, setLoading] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>()
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

        if (imageFile) {
            var formData = new FormData();
            formData.append('file', imageFile);

            onSubmit({
                ...form,
                status: true,
            }, formData)
        } else {
            onSubmit({
                ...form,
                status: true,
            }, '')
        }

        setForm({ description: "", product_code: "" })
        setImageFile(null)
        setImagePreview(null)
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
                            Adicionar imagem
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
            >
                { loading ? 'Cadastrando...' : 'Cadastrar Produto'}
            </Button>
        </div>
    )
}