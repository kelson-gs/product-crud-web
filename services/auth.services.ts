interface ApiError {
  message: string
}

export async function registerUser(data: RegisterUser) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const error: ApiError = await res.json()
      throw new Error(error.message || "Erro ao cadastrar usuário")
    }

    return await res.json()
  } catch (err: any) {
    throw new Error(err.message || "Erro inesperado")
  }
}
