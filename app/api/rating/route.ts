import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from '@/libs/prismadb';
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    
    const body = await req.json();

    const { rating, comment, userId, product } = body;

    const deliveredOrder = currentUser?.orders.some(order=>{
        order.products.find(item=> item.id === product.id ) && order.deliveryStatus === 'delivered';
    })

    const userReview =  product?.review.find((review: Review)=>{
        return review.userId === currentUser.id;
    })

    if(userReview || !deliveredOrder){
        return NextResponse.error();
    }

    const review = await prisma.review.create({
        data: { 
            userId,
            rating,
            comment,
            productId : product.id,
           
         }
    })

    return NextResponse.json(review);


}