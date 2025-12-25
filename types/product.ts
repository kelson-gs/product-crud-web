export interface Product {
    id: string
    name: string
    product_code: string
    description?: string
    image?: string
    status: boolean
}

export interface CreateProductDTO {
    name: string
    description: string
    product_code: string
    image?: string
}

export interface UpdateProductDTO {
    id: string
    name?: string
    product_code?: string
    description?: string
    image?: string
}

export interface UpdateStatusProductDTO {
    id: string
    status: boolean
}
