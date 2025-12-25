"use client"

import { useEffect, useMemo, useState } from "react"
import { productsService } from "@/services/product.services"
import { ProductCard } from "@/components/product-card/product-card"
import { ProductForm } from "@/components/product-form/product-form"
import { Product, UpdateStatusProductDTO } from "../../../../types/product"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { cloudinaryService } from "@/services/cloudinary.services"
import { ProductFormEdit } from "@/components/product-form-edit/product-form-edit"

export default function ProdutosPage() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  useEffect(() => {
    productsService.getAll()
      .then(setProducts)
      .catch(() => toast.error("Erro ao carregar produtos"))
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product?.description?.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  console.log(filteredProducts)

  async function handleCreate(data: any, image: any) {
    try {
      const { url } = await cloudinaryService.uploadImage(image);

      const newProduct = await productsService.create({
        ...data,
        image: url
      });

      setProducts(prev => [...prev, newProduct]);
      toast.success("Produto cadastrado com sucesso", {
        style: {
          backgroundColor: 'green',
          border: 'none'
        }
      });
      setOpen(false)
    } catch {
      toast.error("Erro ao cadastrar produto", {
        style: {
          backgroundColor: 'red',
          border: 'none'
        }
      })
    }
  }

  async function handleEdit(data: any, image: any) {
    try {
      if(image) {
        const { url } = await cloudinaryService.uploadImage(image);
  
        var newProduct = await productsService.update({
          ...data,
          image: url
        });
        
      } else {
        var newProduct = await productsService.update({
          ...data
        });
      }

      setProducts(prev => [...prev, newProduct]);
      toast.success("Produto editado com sucesso", {
        style: {
          backgroundColor: 'green',
          border: 'none'
        }
      });
      setOpenEdit(false)
      setSelectedProduct(null)
    } catch {

    }
  }

  async function handleToggleStatus(product: UpdateStatusProductDTO) {
    try {
      const updated = await productsService.updateStatus(product)
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? updated : p))
      )
    } catch {
      toast.error("Erro ao alterar status")
    }
  }

  async function handleDelete(id: string) {
    try {
      await productsService.delete(Number(id))
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success("Produto removido")
    } catch {
      toast.error("Erro ao remover produto")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Button
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          Cadastrar produto
        </Button>
      </div>

      <Input
        placeholder="Buscar produto..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-[80%] ml-[10%]"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleStatus={() =>
              handleToggleStatus({
                id: product.id,
                status: !product.status,
              })
            }
            onDelete={() => handleDelete(product.id)}
            onEdit={() => {
              setSelectedProduct(product)
              setOpenEdit(true)
            }}
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg ml-[5%]">
          <DialogHeader>
            <DialogTitle>Cadastrar produto</DialogTitle>
          </DialogHeader>

          <ProductForm onSubmit={handleCreate} />
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-lg ml-[5%]">
          <DialogHeader>
            <DialogTitle>Editar produto</DialogTitle>
          </DialogHeader>

          <ProductFormEdit onSubmit={handleEdit} product={selectedProduct}/>
        </DialogContent>
      </Dialog>
    </div>
  )
}