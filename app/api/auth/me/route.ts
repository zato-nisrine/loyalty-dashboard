import { NextResponse } from 'next/server'
import { getRestaurant } from '@/lib/auth'

export async function GET() {
  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ authenticated: false })
  return NextResponse.json({ authenticated: true, restaurant })
}

