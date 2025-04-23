"use client";

import Button from "@/app/components/button";
import ProductImage from "@/app/components/products/ProductoImg";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/setQuantity";
import { UseCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";


interface ProductProps {
    product : any
}

export type productCartType =  {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}


const ProductDetails: React.FC <ProductProps>  = ({ product })=>{
    const { handleAddCart, cartProducts } = UseCart();
    const [ isProductInCart, setIsProductInCart ] = useState(false);
    const [ cartProduct, setCartProduct ] = useState<productCartType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: {...product.images[0]},
        quantity: 1,
        price: product.price
    })

    const router = useRouter();

    useEffect(()=>{
        setIsProductInCart(false);

        if(cartProducts){
            const existIndex = cartProducts.findIndex((item)=> item.id === product.id);

            if(existIndex > -1){
                setIsProductInCart(true);
            }
        }
    },[cartProducts])

    const Horizontal = ()=>{
        return <hr className="w-[30%] my-2"/>
    }

    const productRating = 
        product.reviews.reduce((acc: number ,item: any)=>
            item.rating + acc, 0)/product.reviews.length
    
    const handleColorSelected =  useCallback((value: SelectedImgType)=>{
        setCartProduct((prev)=>{
            return {...prev, selectedImg: value}
        })
    },[cartProduct.selectedImg]);

    const handleQtyIncrease = useCallback(()=>{
        
        setCartProduct((prev)=>{
            if(prev.quantity >= 99){
                return prev;
            }
            return { ...prev, quantity: prev.quantity + 1}
        });
    },[cartProduct]);

    const handleQtyDecrease = useCallback(()=>{
       
        setCartProduct((prev)=>{
            if(prev.quantity <= 1){
                return prev;
            }
            return { ...prev, quantity: prev.quantity - 1 }
        });
    },[cartProduct]);

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ProductImage cartProduct={ cartProduct } product={ product } handleColorSelected={ handleColorSelected }/>
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-medium text-purple-600">{ product.name }</h2>
                <div className="flex gap-1 items-center text-sm">
                    <Rating value={ productRating } readOnly/>
                    <div>{product.reviews.length} reviews</div>
                </div>
                < Horizontal />
                <div className="text-justify">{ product.description }</div>
                < Horizontal />
                <div>
                    <span className="font-semibold uppercase"> Categoria: </span>
                    { product.category }
                </div>
                <div>
                    <span className="font-semibold uppercase">Marca: </span>
                    { product.brand }
                </div>
                <div className={product.inStock ? 'text-teal-400' : 'text-red-400'}>
                    { product.inStock ? 'En Stock' : 'Sin Stock'}
                </div>
                <Horizontal />
                { isProductInCart ? 
                (<>
                    <p className="mb-3 flex gap-1 items-center text-slate-500">
                        <MdCheckCircle className="text-teal-400" size={ 20 }/>
                        <span>Producto agregado al carrito</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button label="Ver carrito" outline onclick={()=>{ router.push('/cart') }}/>
                    </div>
                </>) : 
                
                (<>
                    <SetColor 
                    images={ product.images }
                    cartProduct={ cartProduct }
                    handleColorSelected={ handleColorSelected }
                    />
                    <Horizontal />
                    <SetQuantity 
                    cartProduct={ cartProduct }
                    handleQtyDecrease={ handleQtyDecrease }
                    handleQtyIncrease={ handleQtyIncrease }
                    />
                    <Horizontal />
                        <div className="max-w-[300px]">
                            <Button label="Agregar al carrito"
                            onclick={ ()=>handleAddCart(cartProduct) }
                        />
                        </div>
                </> )
                }
            </div>
        </div>
    )

};

export default ProductDetails;