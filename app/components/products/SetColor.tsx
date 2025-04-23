"use client";

import { SelectedImgType, productCartType } from "@/app/producto/[productId]/ProductDetails";

interface SetColorProps{
    images: SelectedImgType[],
    cartProduct: productCartType,
    handleColorSelected : (value: SelectedImgType) => void
}

const SetColor: React.FC<SetColorProps> = ( { images, cartProduct, handleColorSelected }) =>{
    return(
        <div>
            <div className="flex gap-4 items-center">
                <span className="font-semibold uppercase">Color: </span>
                <div className="flex gap-1">
                { 
                images.map((image)=>{
                    return (<div 
                    key={ image.color }  
                    onClick={ ()=>handleColorSelected(image) }  
                    className={`${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'} w-7 h-7 rounded-full border-teal-300 flex items-center justify-center`}>
                        <div style={{background: image.colorCode}} className="h-5 w-5 rounded-full border-[1.2px] border-teal-300 cursor-pointer"></div>
                    </div>)
                })}
                </div>
            </div>
        </div>
    )

};

export default SetColor;