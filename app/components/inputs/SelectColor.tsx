'use client';

import { ImageType } from "@/app/admin/add-products/addProductsForm";
import { useState, useEffect, useCallback } from "react"
import SelectImage from "./SelectImage";
import Button from "../button";

interface SelectColorProps{
    item: ImageType,
    addImageToState: (value: ImageType)=> void,
    removeImageFromState: (value: ImageType)=> void,
    isProductCreated: boolean
}

const SelectColor: React.FC<SelectColorProps> = ({ item, addImageToState, removeImageFromState, isProductCreated })=>{

    const [ isSelected, setIsSelected ] = useState(false);
    const [ file, setFile ] = useState<File | null>(null);

    useEffect(()=>{
        if(isProductCreated){
            setIsSelected(false);
            setFile(null);
        }
    },[isProductCreated])

    const handleFileChange = useCallback((value: File)=>{
        setFile(value);
        addImageToState({...item, image: value});
    },[])

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        setIsSelected(e.target.checked);

        if(!e.target.checked){
            setFile(null);
            removeImageFromState(item);
        }
    }, [])

    return(
        <div className="grid md:grid-cols-2 overflow-y-auto border-b-[1.2px] border-fuchsia-500 items-center">
            <div className="flex flex-row gap-2 items-center h-[60px]">
                <input id={ item.color } type="checkbox" checked={ isSelected } onChange={ handleCheck } className="cursor-pointer" />
                <label htmlFor={ item.color } className="font-medium cursor-pointer">
                    { item.color }
                </label>
            </div>
            <>
                { isSelected && !file && (
                    <div className="col-span-2 text-center">
                        <SelectImage item={ item } handleFileChange={ handleFileChange }/>
                    </div>
                )}
                { file && (
                <div className="flex flex-row items-center justify-between gap-2 text-sm col-span-2">
                    <p>{ file?.name }</p>
                    <div className="w-[80px]">
                        <Button label="Cancelar" small outline onclick={()=>{ setFile(null); removeImageFromState(item)}}/>
                    </div>
                </div>
                )}
            </>
        </div>
    )

};

export default SelectColor;