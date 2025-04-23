import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { productCartType } from "@/app/producto/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";


const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia"
});

const calculateOrderAmount = (items: productCartType[])=>{
    const totalPrice = items.reduce((acc, item)=>{
        const itemTotal = item.price * item.quantity;

        return acc + itemTotal;
    }, 0);

    const price: any = Math.floor(totalPrice);

    return price;
}

export async function POST(req: Request) {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await req.json();
        const { items, payment_intent_id } = body;

        const total = calculateOrderAmount(items) * 100;
        const orderData = {
            user: { connect: { id: currentUser.id } },
            amount: total,
            currency: 'usd',
            status: 'pending',
            deliveryStatus: 'pending',
            paymentIntentId: payment_intent_id,
            products: items
        }


        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No hay productos en el carrito" }, { status: 400 });
        }


        if (payment_intent_id) {
          
                const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

                if (current_intent) {
                const updated_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });

                //Actuzalizar la orden
                const [ existing_order, updated_order ] = await Promise.all([
                    prisma.order.findUnique({
                        where : { paymentIntentId : payment_intent_id }
                    }),
                    prisma.order.update({
                        where : { paymentIntentId : payment_intent_id },
                        data: {
                            amount: total,
                            products: items
                        }
                    })
                ]);
                
                if(!existing_order){
                    return NextResponse.error()
                }

                if (!updated_intent) {
                    return NextResponse.error();
                }

               return NextResponse.json({ paymentIntent: updated_intent });
                } 
        } else {
            //Crear el intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'usd',
                automatic_payment_methods: { enabled: true }
            });
            //Crear la orden
            orderData.paymentIntentId = paymentIntent.id;

            await prisma.order.create({
                data: orderData
            });

            return NextResponse.json({ paymentIntent });
        }

        return NextResponse.error();
}
