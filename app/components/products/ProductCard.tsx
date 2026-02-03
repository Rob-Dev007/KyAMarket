'use client'

import FormatPrices from "@/utils/FormatPrices";
import { TruncarTextos } from "@/utils/truncarTexto";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface productsProps {
    data: ProductType;
}

type ReviewType = {
    rating: number;
    userId: string;
    comment: string;
  };
  
  type ProductType = {
    id: string;
    name: string;
    price: number;
    images: { image: string }[];
    reviews: ReviewType[];
  };
const ProductCard = ({ data }: productsProps)=>{

    if(!data) return null;

    const productRating =  data.reviews.length > 0 ? data.reviews.reduce((acc: number, item: ReviewType)=> acc + item.rating , 0)/data.reviews.length : 0;

    const srcImg = data?.images?.length > 0 ? data.images[0].image : 'Placeholder.png';

    const router = useRouter();
    
    return(
        <div className="col-span-1 cursor-pointer border-2 border-fuch bg-gray-50 rounded-lg p-2 transition hover:scale-105 text-center text-sm"
        onClick={()=> router.push(`/producto/${data.id}`) }>
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image 
                        fill
                        alt={ data.name }
                        src={ srcImg }
                        className="w-full h-full object-contain"
                        unoptimized
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