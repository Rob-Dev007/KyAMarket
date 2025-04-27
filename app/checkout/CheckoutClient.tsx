'use client';

import { UseCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = ()=>{

    const { cartProducts, paymentIntent, handleSetPaymentIntent } = UseCart();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ clientSecret, setClientSecret ] = useState('');
    const [ paymentSuccess, setPaymentSuccess ] = useState(false);

    console.log("paymentIntent", paymentIntent);
    console.log("secretClient", clientSecret);

    const router = useRouter();
    
    useEffect(()=>{
        //Crear una intención de pago tan pronto como se cargue la pagina
        if(cartProducts){
            setLoading(true);
            setError(false);

            fetch('/api/create-payment-intent',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    //'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res)=>{
                console.log(res)
                setLoading(false);
                if(res.status === 401){
                    return router.push('/login');
                }

                return res.json()
            }).then((data)=>{ 
                console.log(data)

                if (!data.paymentIntent) {
                    throw new Error("paymentIntent no definido en la respuesta");
                }

                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            }).catch((error)=>{
                setError(true);
                console.log(error);
                toast.error(`Ocurrió un error : ${error.message}`);
            })
        }
    }, [ cartProducts, paymentIntent, handleSetPaymentIntent, router ])

    const options:StripeElementsOptions ={
        clientSecret,
        appearance: { 
            theme: 'stripe',
            labels: 'floating'
         }
    }

    const handleSetPaymentSuccess = useCallback((value:boolean)=>{
        setPaymentSuccess(value);
    }, [])

    return(
    <div className="w-full">
        { clientSecret && cartProducts && (
            <Elements options={ options } stripe={ stripePromise }>
                <CheckoutForm handlePaymentSuccess={ handleSetPaymentSuccess } clientSecret={ clientSecret }/>
            </Elements>
        )}
        {loading && <div className="text-center text-slate-600 font-bold">Cargando pago en linea</div>}
        {error && <div className="text-center text-rose-500 font-bold">¡Opsss! Algo salio mal...</div>}
        {paymentSuccess && (
            <div className="flex flex-col items-center gap-4">
                <div className="text-center text-teal-500 font-bold">Pago en linea realizado con exito</div>
                <div className="max-w-[220px] w-full">
                    <Button label="Mira tus ordenes" onclick={ ()=>router.push('/orders') } />
                </div>
            </div>)}
    </div>) 
}

export default CheckoutClient;