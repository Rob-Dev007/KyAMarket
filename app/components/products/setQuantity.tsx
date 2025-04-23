"use client"

import { productCartType } from "@/app/producto/[productId]/ProductDetails";

interface SetQuantityProps{
    cartCounter? : boolean,
    cartProduct: productCartType,
    handleQtyIncrease : () => void,
    handleQtyDecrease : () => void,
}

const SetQuantity: React.FC<SetQuantityProps> = ({ cartCounter, cartProduct, handleQtyDecrease, handleQtyIncrease })=>{
    return(
        <div className="flex gap-8 items-center">
            {cartCounter ? null : <div className="font-semibold uppercase">Cantidad: </div>}
            <div className="flex gap-4 items-center text-base">
                <button className="rounded border-2 px-2 border-fuchsia-500" onClick={ handleQtyDecrease }>-</button>
                <div>{ cartProduct.quantity }</div>
                <button className="rounded border-2 px-2 border-fuchsia-500" onClick={handleQtyIncrease}>+</button>
            </div>
        </div>
    )
};

export default SetQuantity;