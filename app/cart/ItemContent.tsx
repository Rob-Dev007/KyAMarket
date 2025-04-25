'use client';

import { productCartType } from "../producto/[productId]/ProductDetails";
import Link from "next/link";
import { TruncarTextos } from "@/utils/truncarTexto";
import Image from "next/image";
import SetQuantity from "../components/products/setQuantity";
import { UseCart } from "@/hooks/useCart";
import formatPrices from "@/utils/FormatPrices";

interface ItemContentProps{
    item: productCartType,
}

const ItemContent: React.FC<ItemContentProps> = ({ item })=>{

    const { handleRemoveItemCart, handleQtyIncrease, handleQtyDecrease } = UseCart();


    return(
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain"/>
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>
                        {TruncarTextos(item.name)}
                    </Link>
                    <div>{ item.selectedImg.color }</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 font-black" onClick={()=>handleRemoveItemCart(item)}>Eliminar</button>
                    </div>
                    
                </div>
            </div>
            <div className="justify-self-center">{ formatPrices(item.price) }</div>
            <div className="justify-self-center">< SetQuantity cartCounter={true} cartProduct={item} handleQtyDecrease={()=>handleQtyDecrease(item)} handleQtyIncrease={()=>handleQtyIncrease(item)}/></div>
            <div className="justify-self-end font-semibold">{formatPrices(item.price * item.quantity)}</div>
        </div>
    )

};

export default ItemContent;