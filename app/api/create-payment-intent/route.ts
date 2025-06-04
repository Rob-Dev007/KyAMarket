import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { productCartType } from "@/app/producto/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

const calculateOrderAmount = (items: productCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return Math.floor(totalPrice); 
};

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Sin autorización" }, { status: 401 });
  }

  const body = await req.json();
  const { items, payment_intent_id } = body;

  if (!items || items.length === 0) {
    return NextResponse.json(
      { error: "No hay productos en el carrito" },
      { status: 400 }
    );
  }

  const total = calculateOrderAmount(items) * 100; 

  try {
    if (payment_intent_id) {
      // Ya existe un intent de pago → actualizarlo
      const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

      if (!current_intent) {
        return NextResponse.json({ error: "Intento de pago no encontrado" }, { status: 404 });
      }

      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: total,
      });

      const existing_order = await prisma.order.findUnique({
        where: { paymentIntentId: payment_intent_id },
      });

      if (!existing_order) {
        return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
      }

      await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: {
          amount: total,
          products: items,
        },
      });

      return NextResponse.json({ paymentIntent: updated_intent });
    } else {
      // Crear nuevo intent de pago
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      await prisma.order.create({
        data: {
          user: { connect: { id: currentUser.id } },
          amount: total,
          currency: "usd",
          status: "pending",
          deliveryStatus: "pending",
          paymentIntentId: paymentIntent.id,
          products: items,
        },
      });

      return NextResponse.json({ paymentIntent });
    }
  } catch (err: any) {
    console.error("❌ Error en el servidor:", err.message);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar el pago" },
      { status: 500 }
    );
  }
}