import { productCartType } from "@/app/producto/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast/headless";

type CartContextType = {
    cartTotalQty : number,
    cartProducts : productCartType[] | null,
    cartTotalAmount: number,
    handleAddCart : (product: productCartType)=> void,
    handleRemoveItemCart : (product: productCartType)=>void,
    handleQtyIncrease : (product: productCartType)=>void,
    handleQtyDecrease: (product: productCartType)=> void,
    handleClearCart : ()=> void
    paymentIntent: string | null,
    handleSetPaymentIntent : (val: string | null) => void
}

interface Props{
    [propName : string] : any
}

export const CartContext = createContext<CartContextType | null>(null); 
export const CartContextProvider = ( props : Props )=>{

    const [ cartTotalQty, setCartTotalQty ] =  useState(0);
    const [ cartProducts, setCartProducts ] = useState<productCartType [] | null>(null);
    const [ cartTotalAmount, setCartTotalAmount ] = useState(0);
    const [ paymentIntent, setPaymentIntent ] = useState<string | null>(null);

    useEffect(()=>{
        const cartItems : any = localStorage.getItem('KyAMarketItems');
        const carProducts : productCartType[] | null = JSON.parse(cartItems);
        const kyAMarketPaymentIntent: any = localStorage.getItem("kyAMarketPaymentIntent");
        const paymentIntent: string | null = JSON.parse(kyAMarketPaymentIntent);
        
        setCartProducts(carProducts);
        setPaymentIntent(paymentIntent);
    },[])

    useEffect(()=>{
        const getTotal = ()=>{

            if(cartProducts){
                const { total, qty } = cartProducts?.reduce((acc, item)=>{
                    const itemTotal = item.price * item.quantity;
    
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
    
                    return acc;
                },
                {
                    total: 0,
                    qty: 0
                })
            setCartTotalQty(qty);
            setCartTotalAmount(total);
            };
            }
            
        getTotal();
    },[cartProducts])

    const handleAddCart = useCallback((product: productCartType)=>{
        setCartProducts((prev)=>{
            let updatedCart;

            if(prev){
                updatedCart = [...prev, product]; 
            }else{
                updatedCart = [product];
            }

            toast.success('Producto agregado al carrito');
            localStorage.setItem('KyAMarketItems', JSON.stringify(updatedCart));
            return updatedCart;
        })
    }, []); 

    const handleRemoveItemCart = useCallback((product : productCartType )=>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item)=>{
                return item.id !== product.id;
            })
            setCartProducts(filteredProducts);
            toast.success('Producto eliminado con éxito');
            localStorage.setItem('KyAMarketItems', JSON.stringify(filteredProducts))
        }
    },[cartProducts])

    const handleQtyIncrease = useCallback((product: productCartType)=>{
        let updatedCart;
        if(product.quantity === 99){
            return toast.error('Limite máximo de productos');
        }

        if(cartProducts){
            updatedCart = [...cartProducts];

            const existIndex = cartProducts.findIndex((item)=> item.id === product.id );

            if(existIndex > -1){
                updatedCart[existIndex].quantity = ++updatedCart[existIndex].quantity;
            }

            setCartProducts(updatedCart);
            localStorage.setItem('KyAMarketItems', JSON.stringify(updatedCart));
        }

    }, [cartProducts])

    const handleQtyDecrease = useCallback((product: productCartType)=>{
        let updatedCart;
        if(product.quantity <= 1){
            return toast.error('Cantidad minima no permitida');
        }

        if(cartProducts){
            updatedCart = [...cartProducts];
            const existIndex = cartProducts.findIndex((item)=> item.id === product.id);

            if(existIndex > -1){
                updatedCart[existIndex].quantity = --updatedCart[existIndex].quantity;
            }
            setCartProducts(updatedCart);
            localStorage.setItem('KyAMarketItems', JSON.stringify(updatedCart));
        }
        
    }, [cartProducts])

    const handleClearCart = useCallback(()=>{
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem('KyAMarketItems', JSON.stringify(null));
    }, [])

    const handleSetPaymentIntent = useCallback((val: string | null)=>{
        setPaymentIntent(val),
        localStorage.setItem("kyAMarketPaymentIntent", JSON.stringify(val))
    }, [paymentIntent])

    const value = {
        cartTotalQty,
        cartProducts,
        cartTotalAmount,
        paymentIntent,
        handleAddCart,
        handleRemoveItemCart,
        handleQtyIncrease,
        handleQtyDecrease,
        handleClearCart,
        handleSetPaymentIntent
    }
    
    return <CartContext.Provider value={ value } {...props} />

}

export const UseCart = ()=>{
    const context = useContext(CartContext);
    if(context === null){
        throw new Error('UseCart puede estar sin useContext')
    };

    return context;
}