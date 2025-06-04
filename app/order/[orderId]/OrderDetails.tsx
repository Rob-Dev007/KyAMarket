'use client';

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import FormatPrices from "@/utils/FormatPrices";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";


interface OrderDetailProps{
    order : Order 
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order })=>{

    return(
        <div className="w-max-[1150px] mx-auto flex flex-col gap-2">
            <div className="mt-8">
                <Heading title="Detalles del producto"/>
            </div>
            <div>Order Id: { order.id }</div>
            <div>Total Importe: <span className="font-bold">{ FormatPrices(order.amount / 100) }</span></div>
            <div className="">
                <div>Estado de pago: </div>
                <div className="flex gap-2 items-center">
                    { order.status === 'pending' ? (<Status text="Pendiente" icon={ MdAccessTimeFilled } bg="bg-slate-200" color="text-slate-700"/>) : order.status === 'complete' ? (<Status text="Completado" icon={ MdDone } bg="bg-teal-200" color="text-teal-700"/>) : (<></>)}
                </div>
                <div className="flex items-center gap-2">
                    { order.deliveryStatus === 'pending' ? (<Status text="Pendiente" icon={ MdAccessTimeFilled } bg="bg-slate-200" color="text-slate-700"/>) :
                    order.deliveryStatus === 'despatched' ? (<Status text="Despachado" icon={ MdDeliveryDining } bg="bg-purple-200" color="text-purple-700"/>) :
                    order.deliveryStatus === 'delivered' ? (<Status text="Entregado" icon={ MdDone } bg="bg-green-200" color="text-green-700"/>) : (<></>)}

                </div>
            </div>
            <div>Fecha: { moment(order.createDate).fromNow() }</div>
            <div>
                <h2 className="font-semibold mt-4 mb-2">Productos ordenados</h2>
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                    <div className="col-span-2 justify-self-start">Producto</div>
                    <div className="justify-self-center">Precio</div>
                    <div className="justify-self-center">Cantidad</div>
                    <div className="justify-self-end">Total</div>
                </div>
                { order.products && order.products.map(item=> {
                    return <OrderItem key={ item.id } item={ item }></OrderItem>
                }) }
            </div>
        </div>
    )
}

export default OrderDetail;