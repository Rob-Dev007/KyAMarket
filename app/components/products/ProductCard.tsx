'use client'

import FormatPrices from "@/utils/FormatPrices";
import { TruncarTextos } from "@/utils/truncarTexto";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface productsProps {
    data: any;
}
const ProductCard: React.FC<productsProps> = ({ data })=>{

    const productRating = data.reviews.reduce((acc: number, item: any)=> item.rating + acc , 0)/data.reviews.length;

    const router = useRouter();
    
    return(
        <div className="col-span-1 cursor-pointer border-2 border-fuch bg-gray-50 rounded-lg p-2 transition hover:scale-105 text-center text-sm"
        onClick={()=> router.push(`/producto/${data.id}`) }>
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image 
                    fill
                    alt={ data.name }
                    src={ data.images[0].image }
                    className="w-full h-full object-contain"
                    />
                </div>
                <div className="mt-4"> { TruncarTextos(data.name) } </div>
                <div> <Rating value={ productRating } readOnly /> </div>
                <div>{ data.reviews.length } reviews</div>
                <div className="font-semibold">{ FormatPrices( data.price ) }</div>
            </div>
        </div>
    )

};

export default ProductCard;