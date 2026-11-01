
import { NextRequest, NextResponse } from 'next/server'

import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
      return NextResponse.json(
        { message: 'Configuration manquante : NEXT_PUBLIC_API_URL non défini.' },
        { status: 500 }
      )
    }

    let res: Response
    try {
      res = await fetch(`${apiUrl}/auth/restaurant/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (networkError) {
      console.error('Erreur réseau lors de la connexion au backend:', networkError)
      return NextResponse.json(
        {
          message: `Impossible de joindre le serveur API (${apiUrl}). Assurez-vous que le backend (loyalty-api) est bien lancé.`,
        },
        { status: 503 }
      )
    }

    if (!res.ok) {
      try {
        const error = await res.json()
        return NextResponse.json(error, { status: res.status })
      } catch {
        const textError = await res.text()
        return NextResponse.json(
          { message: textError || `Erreur serveur (${res.status} ${res.statusText})` },
          { status: res.status }
        )
      }
    }

    const data = await res.json()

    if (!data?.access_token) {
      return NextResponse.json(
        { message: 'Réponse invalide du serveur (jeton d\'accès manquant)' },
        { status: 502 }
      )
    }

    const cookieStore = await cookies()
    cookieStore.set('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Erreur inattendue dans /api/auth/login:', err)
    return NextResponse.json(
      { message: err?.message || 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

