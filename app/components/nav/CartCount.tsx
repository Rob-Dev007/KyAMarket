'use client';

import { UseCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CgShoppingCart } from "react-icons/cg";

const CartCount = ()=>{
    const { cartTotalQty } = UseCart();
    const router = useRouter();

    return(
        <div className="relative cursor-pointer" onClick={ ()=>router.push('/cart') }>
            <div>

            </div>
            <div>
                <CgShoppingCart  className="text-3xl" />
            </div>
            <span className="absolute h-6 w-6 rounded-full bg-purple-700 top-[-10px] right-[-10px] flex text-white justify-center">
                { cartTotalQty }
            </span>
        </div>
    )

};

export default CartCount;