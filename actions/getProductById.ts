import prisma from "@/libs/prismadb";

export default async function getProductById(productId: string){
    try{

        if(!productId) return null;

        const product = await prisma.product.findUnique({
            where: { 
                id: productId 
            },
            include: { 
                reviews: {
                    include:{
                        user: true
                    },
                    orderBy:{
                        createdData: 'desc'
                    }
                }
            }
        })

        return product;
    }catch(error: any){
        throw new Error(error.message || "Error al obtener producto")
    }
}