import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";

export const config = {
    api: {
        bodyParser: false,
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-01-27.acacia'
});

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
){
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    if(!sig){
        return res.status(400).send('La firma de stripe se ha extraviado');
    }

    let event : Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(
            buf, 
            sig, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    }catch(error){
        console.log(error);
        return res.status(400).send('Webhook error');
    }

    switch(event.type){
        case 'charge.succeeded':
            const charge  = event.data.object as Stripe.Charge;

            if (typeof charge.payment_intent === 'string') {
                // Transformar la dirección para que no tenga valores null en las propiedades
                const address = charge.shipping?.address;
                const transformedAddress = {
                    ...address,
                    city: address?.city ?? '',  
                    line1: address?.line1 ?? '',  
                    line2: address?.line2 ?? '', 
                    postal_code: address?.postal_code ?? '', 
                    state: address?.state ?? '', 
                    country: address?.country ?? '', 
                };

                // Actualización de Prisma
                await prisma?.order.update({
                    where: { paymentIntentId: charge.payment_intent },
                    data: {
                        status: 'complete',
                        address: transformedAddress
                    }
                });
            }
            break;
            default:
                console.log("Tipo de evento :" +  event.type)
    }

    res.json({ received: true });

}