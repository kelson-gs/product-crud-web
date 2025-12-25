import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  UpdateStatusProductDTO,
} from "@/types/product"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${url}`, {
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || "Erro na requisição")
  }

  return res.json()
}

export const productsService = {

  create(data: CreateProductDTO) {
    return request<Product>("/product", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include"
    })
  },

  getAll() {
    return request<Product[]>("/products")
  },

  getOnly(id: string) {
    return request<Product>(`/product/${id}`)
  },

  update(data: UpdateProductDTO) {
    return request<Product>(`/product`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  updateStatus(data: UpdateStatusProductDTO) {
    return request<Product>(`/product/status`, {
      method: "PUT",
      body: JSON.stringify({ id: data.id, status: data.status }),
    })
  },

  delete(id: number) {
    return request<void>(`/product`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
  },
}
