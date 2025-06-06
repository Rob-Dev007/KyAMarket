'use client';

import { ImageType } from "@/app/admin/add-products/addProductsForm";
import { useCallback } from "react";
import { useDropzone } from 'react-dropzone';

interface SelectImageProps{
    item?: ImageType,
    handleFileChange: (value: File)=> void

}

const SelectImage: React.FC<SelectImageProps> = ({ item, handleFileChange })=>{

    const onDrop = useCallback((acceptedFiles: File[])=>{
        if(acceptedFiles.length > 0){
            handleFileChange(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, 
    accept:{'image/*': ['.jpeg','.png']} 
});
    return(
        <div {...getRootProps()} className="border-fuchsia-500 p-2 flex items-center justify-center cursor-pointer text-sm font-normal border-dashed text-fuchsia-300">
            <input {...getInputProps()}/>
            {isDragActive ? (<p>Suelta la imagen aqui...</p>) : (<p>+ Imagen color { item?.color }</p>)}
        </div>
    )

}

export default SelectImage;