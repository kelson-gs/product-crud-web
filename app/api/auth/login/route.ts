import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  console.log("response: ", body);

  if (!response.ok) {
    return NextResponse.json(
      { message: "Credenciais inválidas" },
      { status: 401 }
    )
  }

  const data = await response.json()
  const token = data.accessToken

  console.log("token: ", data.accessToken);

  const res = NextResponse.json({ success: true })

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/dashboard",
  })

  return res
}