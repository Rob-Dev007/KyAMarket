import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"

export async function PUT(req: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    if(currentUser.role !== 'ADMIN'){
        return NextResponse.error();
    }

    const body = await req.json();

    const { id, deliveryStatus } = body;

    const order = await prisma.order.update({
        where: { id: id },
        data: { deliveryStatus }

    })


    return NextResponse.json(order);

}