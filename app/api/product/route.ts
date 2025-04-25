
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: Request){

    const currentUser =await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    if(currentUser.role !== 'ADMIN'){
        return NextResponse.error();
    }

    try {
        const body = await req.json();

        const { name, description, price, brand, category, inStock, images } = body;
        const product = await prisma.product.create({
            data:{
                name, 
                description,  
                price: parseFloat(price),
                brand, 
                category, 
                inStock, 
                images
            }
        })

    return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: "Error al registrar usuario" }),
            { status: 500 }
        );
    }
}

export async function PUT(req: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return NextResponse.error();
    }

    const body = await req.json();
    const { id, inStock } = body;


    const product = await prisma.product.update({
        where: { id: id },
        data : { inStock }
    })

    return NextResponse.json(product);
}
