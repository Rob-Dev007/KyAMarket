import prisma from "@/libs/prismadb";
import { Product, Review, User } from "@prisma/client";

export interface IProductsParams {
    category?: string | null;
    searchTerm?: string | null;
  }
  
export interface ExtendedProduct extends Product {
    reviews: (Review & {
      user: User;
    })[];
  }
  
export default async function getProducts(params: IProductsParams): Promise<ExtendedProduct[]> {
    try{
    const { category, searchTerm } = params;
       
        let searchString = searchTerm;

        if(!searchTerm){
            searchString = '';
        }

        let query:any = {};
        
        if(category){
            query.category =  category;
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                        
                    },
                    {
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include:{
                reviews:{
                    include:{
                        user: true
                    },
                    orderBy:{
                        createdData: 'desc'
                    }
                }
            }
        });

        return products;

    }catch(error: any){
        throw new Error(error);
    }
}