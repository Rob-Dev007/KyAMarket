import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return new NextResponse(null, { status: 401 });

  if (currentUser.role !== 'ADMIN') {
    return new NextResponse(null, { status: 403 });
  }

  // Obtener ID desde la URL
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // obtiene el último segmento del path

  if (!id) return new NextResponse(null, { status: 400 });

  const product = await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json(product);
}
