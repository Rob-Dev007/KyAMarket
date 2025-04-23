'use client';

import { UseCart } from "@/hooks/useCart";
import FormatPrices from "@/utils/FormatPrices";
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/button";

interface CheckoutFormProps {
    clientSecret : String,
    handlePaymentSuccess : (value: boolean)=> void,
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handlePaymentSuccess })=>{
    const { cartTotalAmount,handleClearCart, handleSetPaymentIntent } = UseCart();
    const stripe = useStripe();
    const elements = useElements();
    const [ isLoading, setIsLoading ] = useState(false);

    const formattedPrice = FormatPrices(cartTotalAmount);
    
    useEffect(()=>{
        if(!stripe){
            return;
        }

        if(!clientSecret){
            return; 
        }

        handlePaymentSuccess(false);
    }, [stripe])

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        setIsLoading(true);

        stripe.confirmPayment({
            elements,
            redirect: 'if_required' 
        }).then(result=>{
            console.log(result);
            if(!result.error){
                toast.success('Pago realizado con exito');

                handleClearCart();
                handlePaymentSuccess(true);
                handleSetPaymentIntent(null);
            }

            setIsLoading(false);
        })
    }
    return(
        <>
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Completa los datos para realizar tu compra" />
            </div>
            <h2 className="font-semibold mt-4 mb-2">
                Informacion de dirección
            </h2>
            <AddressElement options={{
                mode: 'shipping',
                allowedCountries: ['EC']
            }} />
            <h2 className="font-semibold mt-4 mb-2">Información del pago en linea</h2>
            <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
            <div className="py-4 text-center text-xl text-slate-700 font-bold">
                Total : {formattedPrice}
            </div>
            <Button label={ isLoading ? 'Procesando pago...' : 'Pagar Ahora'} onclick={() => { } } disabled={ isLoading || !stripe || !elements } />
        </form>
        </>

    )

};

export default CheckoutForm;