import prisma from "@/libs/prismadb";
import { Product, Review, User } from "@prisma/client";

interface Params {
  category: string | null;
  searchTerm: string;
}


export interface ExtendedProduct extends Product {
  reviews: (Review & {
    user: User;
  })[];
}

export default async function getProducts({ category, searchTerm }: Params ){
  try {

    const query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdData: 'desc', 
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    console.error('Error getting products:', error);
    throw new Error(error.message || "Error fetching products");
  }
}
