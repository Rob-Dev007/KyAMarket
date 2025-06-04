import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

    switch (event.type) {
      case "charge.succeeded":
        const charge: any = event.data.object as Stripe.Charge;
        if(typeof charge.payment_intent === 'string'){
          await prisma?.order.update({
            where: { paymentIntentId: charge.payment_intent },
            data : { status: 'complete', address: charge.shipping?.address }
          })
        }
        break;
  
      default:
        console.log("Unhandled event type:" + event.type);
    }

  res.json({ received: true });
}
