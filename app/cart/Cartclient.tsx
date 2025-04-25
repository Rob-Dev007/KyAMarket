"use client";

import { UseCart } from "@/hooks/useCart";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Heading from "../components/Heading";
import Button from "../components/button";
import ItemContent from "./ItemContent";
import { SafeUser } from "@/types";
import { useRouter } from "next/dist/client/components/navigation";
import formatPrices from "@/utils/FormatPrices";

interface CartClientProps {
    currentUser : SafeUser | null | undefined
}


const CartClient: React.FC<CartClientProps> = ({ currentUser })=>{

    const { cartProducts, handleClearCart, cartTotalAmount } = UseCart();

    const router = useRouter();

    const handleCheckout = () => {
        if (currentUser) {
            router.push('/checkout');
        } else {
            router.push('/login');
        }
    };

    if(!cartProducts || cartProducts.length === 0){
        return(
        <div className="flex flex-col items-center">
            <div className="text-3xl text-fuchsia-500">Tu carrito esta vacio</div>
            <div  className="flex text-slate-500 items-center gap-1 mt-2">
                <IoMdArrowBack />
                <Link href={'/'}>
                    <span>Empieza a comprar</span>
                </Link>
            </div>
        </div>
        )
    }

    return(
        <div>
            <Heading title="Carrito de compras" center/>
            <div className="grid grid-cols-5 text-xs gap-4 uppercase font-semibold pb-2 items-center mt-8">
                <div className="col-span-2 justify-self-start">Producto</div>
                <div className=" justify-self-center">Precio</div>
                <div className=" justify-self-center">Cantidad</div>
                <div className=" justify-self-end">Total</div>
            </div>
            <div>
                { cartProducts && cartProducts.map((item)=>{
                    return <ItemContent key={ item.id } item={ item }/>
                })
                }
            </div>
            <div className="border-t-[1.5px] border-slate-500 py-4 flex justify-between gap-4">
                <div className="w-[120px]">
                    <Button label="Borrar carrito" onclick={ ()=>handleClearCart() } small outline/>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                    <div className="font-semibold flex justify-between text-base w-full">
                        <span >Subtotal</span>
                        <span>{ formatPrices(cartTotalAmount) }</span>
                    </div>
                    <p>Calculando envio a domicilo del producto</p>
                    <Button 
                    label={ currentUser ? 'Realizar pago' : 'Inicia sesión para pagar' } 
                    outline={ currentUser ? false : true }
                    onclick={()=>{ handleCheckout }}
                    />
                    <Link href={'/'} className="flex gap-1 items-center">
                        <IoMdArrowBack />
                        <span>Continua comprando</span>
                    </Link>
                </div>
            </div>
        </div>
    )

};

export default CartClient;