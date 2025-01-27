import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const orders = await prisma.order.findMany({ include: { items: true } });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const { tableNumber, items, total } = await req.json();

  const order = await prisma.order.create({
    data: {
      tableNumber,
      total,
      items: {
        create: items.map((item: { menuId: number; quantity: number }) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        })),
      },
    },
  });
  return NextResponse.json(order, { status: 201 });
}
