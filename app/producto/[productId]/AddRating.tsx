'use client';

import Heading from "@/app/components/Heading";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Product, Review, Order } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface AddRatingProps{
    product: Product & {
        reviews: Review[]
    },
    user:(SafeUser & {
        orders: Order[]
    }) | null
}

const AddRating: React.FC<AddRatingProps> = ({ product, user })=>{

    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const { register,handleSubmit,setValue, reset, formState: { errors }} = useForm<FieldValues>({
        defaultValues:{
            comment: '',
            rating: 0
        }
    });

    const setCustomValue = <T extends keyof FieldValues>(id: T, value: FieldValues[T]) =>{
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = async(data)=>{
        setIsLoading(true);
        if(data.rating === 0){
            setIsLoading(false);
            return toast.error('No hay calificación seleccionada');
        }

        const ratingData = {...data, userId: user?.id, product: product};

        axios.post('/api/rating', ratingData)
        .then(()=>{
            toast.success('Calificación enviada con éxito');
            router.refresh();
            reset();
        }).catch(error =>{
            toast.error('Comentario no enviado, intentelo nuevamente');
            console.log(error);
        }).finally(()=>{
            setIsLoading(false)
        })

    }

    if(!user || !product ) return null;

    const deliveredOrder = user?.orders.some(order => order.products.find(item=> item.id === product.id) && order.deliveryStatus === 'delivered');

    const userReview = product?.reviews.find((review: Review)=> review.userId === user.id );

    if(!deliveredOrder || !userReview) return null;

    return(
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title="Califica este producto" center/>
            <Rating onChange={(event, newValue)=>{
                setCustomValue('rating', newValue);
            }}/>
            <Input 
            id="comment"
            label="Comentarios"
            disabled={ isLoading }
            register={ register }
            errors={ errors }
            required
            />
            <Button label={`${isLoading ? 'Cargando' : 'Calificar'}`} onclick={ handleSubmit(onSubmit) } />
        </div>
    )

}

export default AddRating;