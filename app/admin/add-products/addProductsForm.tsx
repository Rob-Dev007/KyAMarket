'use client';

import Heading from "@/app/components/Heading";
import Button from "@/app/components/button";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/dist/client/components/navigation";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

export type ImageType = {
    color: string,
    colorCode: string,
    image: File | null
}

export type UploadedImageType = {
    color: string,
    colorCode: string,
    image: string
}

const AddProductsForm = ()=>{

    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ images, setImages ] = useState<ImageType[] | null>();
    const [ isProductCreated, setIsProductCreated ] = useState(false);
    const { register, handleSubmit, setValue, watch, reset, formState:{ errors } } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: '',

        }
    });

    useEffect(()=>{
        setCustomValue('images', images)
    },[images]);

    useEffect(()=>{
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    },[isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        //uploaded images to Firebase
        console.log('data: ', data);

        //Save the product to MongoDB
        setIsLoading(true);

        const uploadedImages: UploadedImageType[] = [];

        if(!data.category){
            setIsLoading(false);
            return toast.error('Categoria no esta seleccionada');
        }

        if(!data.images || data.images.length === 0){
            setIsLoading(false);
            return toast.error('Imagen no esta seleccionada');
        }

        const handleImageUploads = async ()=>{
            toast('Creando producto, por favor espera...');
            try{
                for(const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime() + '' + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject)=>{
                            uploadTask.on(
                                'state_changed',
                                (snapshot)=>{
                                    // Observe state change events such as progress, pause, and resume
                                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                        case 'running':
                                        console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error)=>{
                                    console.log('Error al subir la imagen', error);
                                    reject(error)
                                },
                                ()=>{
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item, 
                                            image: downloadURL
                                        })
                                    console.log('File available at', downloadURL);
                                    resolve();
                                    }).catch((error=>{
                                        console.log('Error al obtener el url de descarga', error)
                                        reject(error);
                                    }));
                                }
                                )
                        })
                    }
                }
            }catch(error){
                setIsLoading(false);
                console.error('Error al subir la imagen', error);
                return toast.error('Error al subir la imagen');
            }
        }

        await handleImageUploads();
        const productData = {...data, images: uploadedImages};
        console.log("productData: " , productData);

        axios.post('/api/product', productData).then(()=>{
            toast.success('Producto creado');
            setIsProductCreated(true);
            router.refresh();
            
        }).catch(error=>{
            toast.error('Producto no fue creado');
            console.log(error)
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    const category = watch('category');

    const setCustomValue = (id: keyof FieldValues, value: FieldValues[keyof FieldValues])=>{
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const addImageToState = useCallback((value: ImageType)=>{
        setImages((prev)=>{
            if(!prev){
                return [value]
            } 

            return [...prev, value];
        })
    },[])
    
    const removeImageFromState = useCallback((value: ImageType)=>{
        setImages((prev)=>{
            if(prev){
                const filteredImages = prev.filter((item) => item.color !== value.color);
                return filteredImages;
            }
            return prev;
        })
    },[])

    return(
        <>
            <Heading title="Agrega un producto" center/>
            <Input id="name" label="Nombre" disabled={ isLoading } register={ register } errors={ errors } required/>
            <Input id="price" label="Precio" disabled={ isLoading } register={ register } errors={ errors } type="number" required/>
            <Input id="brand" label="Marca" disabled={ isLoading } register={ register } errors={ errors } type="checkout" required/>
            <TextArea id="description" label="Descripción" disabled={ isLoading } register={ register } errors={ errors } required/>
            <CustomCheckbox id="inStock" label="Este producto esta en stock" disabled={ isLoading } register={ register } />
            <div className="w-full font-medium">
                <div className="mb-2">Selecciona una categoria</div>
                <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3">
                    {categories.map((item)=> {
                        if(item.label === "Todas"){
                            return null;
                        }
                            return (
                        <div key={ item.label } className="col-span">
                            <CategoryInput 
                            onClick={(category)=> setCustomValue('category', category)}
                            selected={ category === item.label }
                            label={ item.label }
                            icon={ item.icon }
                            />
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
                <div>
                    <div className="font-bold">Selecciona los colores disponibles del producto y sube las imagenes.</div>
                    <div>Selecciona un color para subir una imagen con el color seleccionado, de lo contrario los productos no tendran colores disponibles al momento de estar publicados</div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                    { colors.map((item, index)=>{
                        return <SelectColor key={ index } item={ item } addImageToState={ addImageToState } removeImageFromState={ removeImageFromState } isProductCreated={ isProductCreated }/>
                    })
                    } 
                </div>
            </div>
            <Button label={isLoading ? 'Cargando...' : 'Agregar producto'} onclick={ handleSubmit(onSubmit) }/>
        </>
    )

}

export default AddProductsForm;