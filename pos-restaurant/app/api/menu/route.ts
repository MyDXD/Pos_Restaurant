import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const menus = await prisma.menu.findMany();
  return NextResponse.json(menus);
}

export async function POST(req: Request) {
  const { name, price, category } = await req.json();
  const menu = await prisma.menu.create({
    data: { name, price, category },
  });
  return NextResponse.json(menu, { status: 201 });
}
