import prisma from "@/libs/prismadb";

interface IParams {
    orderId?: string;
}

export default async function getOrderById(params: IParams) {
    try {
        const { orderId } = params;

        if (!orderId) return null;
        
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) return null;

        return order;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Error desconocido al obtener la orden.");
    }
}

