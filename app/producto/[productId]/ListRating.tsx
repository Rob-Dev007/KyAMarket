'use client';

import Heading from "@/app/components/Heading";
import moment from "moment";
import { Avatar, Rating } from "@mui/material";
import { Product, Review, User } from "@prisma/client";


interface ListaRatingProps {
    product: Product & {
      reviews: (Review & {
        user: User
      })[]
    }
  }

const ListaRating: React.FC<ListaRatingProps> = ({ product })=>{

    if(product.reviews.length === 0) return null;
    
    return(
        <div>
            <Heading title="Reseñas del producto"/>
                <div className="text-sm mt-2">
                    { product.reviews && product.reviews.map((review)=>{
                        return (
                            <div key={ review.id } className="max-w-[350px]">
                                <div className="flex gap-2 items-center">
                                    <Avatar src={ review.user.image || '' }/>
                                    <div className="font-semibold">{ review?.user.name }</div>
                                    <div className="font-light">{ moment(review.createdData).fromNow() } </div>
                                </div>
                                <div className="mt-2">
                                    <Rating value={ review.rating } readOnly/>
                                    <div className="ml-1">{ review.comment }</div>
                                    < hr className="my-3"/>
                                </div>
                            </div>
                                )
                        }) }
                </div>
        </div>
    )

};

export default ListaRating;