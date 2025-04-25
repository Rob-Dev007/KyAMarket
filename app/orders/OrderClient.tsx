'use client';

import ActionsBtn from "@/app/components/ActionsBtn";
import Status from "@/app/components/Status";
import FormatPrices from "@/utils/FormatPrices";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { GiStorkDelivery } from "react-icons/gi";
import { MdAccessTimeFilled, MdDone, MdRemoveRedEye } from "react-icons/md";


interface OrderClientProps{
    orders : ExtendedOrder[];
}

type ExtendedOrder = Order & {
    user : User
}

type RowType = {
    id: string;
    customer: string | null;
    amount: string;
    paymentStatus: string;
    date: string;
    deliveryStatus: string | null;
  };

const  OrderClient: React.FC<OrderClientProps> = ({ orders }) =>{

    const router = useRouter();

    let rows: RowType[] = [];

    if(orders){
        rows = orders.map(order=>{
            return({
                id: order.id,
                customer : order.user.name,
                amount : FormatPrices(order.amount /100),
                paymentStatus : order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus
            })
        })
    } 

    const columns : GridColDef[] =[
        { field:'id', headerName:'ID', width:120 },
        { field:'customer', headerName:'Cliente', width:300 },
        { field:'amount', 
        headerName:'Importe(USD)', 
        width:120, 
        renderCell: (params)=>{
            return(<div className="font-bold text-slate-500">{params.row.amount}</div>)
        } },
        { field:'paymentStatus', 
        headerName:'Estado de pago', 
        width:120,
        renderCell:(params)=>{
            return(<div>{ params.row.paymentStatus === 'pending' ?
            (<Status text="Pendiente" icon={ MdAccessTimeFilled } bg="bg-slate-200" color="text-slate-700"/>) :
            params.row.paymentStatus  === 'complete' ?
            (<Status text="Completado" icon={ MdDone } bg="bg-purple-200" color="text-purple-700"/>) :
            (<></>) 
        }</div>)
        }},
        { field:'date', headerName:'Fecha', width:100 },
        { field:'deliveryStatus', 
        headerName:'Estado de entrega', 
        width:120,
        renderCell: (params)=>{
            return(<div>{ params.row.deliveryStatus === 'pending' ? 
            (<Status text="Pendiente" icon={ MdAccessTimeFilled } bg="bg-slate-200" color="text-slate-700"/>) :
            params.row.deliveryStatus === 'dispatched' ? 
            (<Status text="Despachado" icon={ GiStorkDelivery  } bg="bg-purple-200" color="text-purple-700"/>) :
            params.row.deliveryStatus === 'delivered' ?
            (<Status text="Entregado" icon={ MdDone } bg="bg-green-200" color="text-green-700"/>) :
            (<></>)
            } </div>)
        }
        },
        { field:'actions', 
        headerName:'Acciones', 
        width:120, 
        renderCell: (params)=>{
            return(<div className="flex justify-center items-center gap-4 my-2 w-full">
                <ActionsBtn icon={ MdRemoveRedEye } onClick={ ()=>router.push(`/order/${params.row.id}`) }/>
            </div>)
        }}
    ]

    
    return(
        <div className="max-w-[1150px] mx-auto text-xl">
            <div className="mb-4 mt-8">
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={
                        { pagination: { 
                            paginationModel : { page: 0 , pageSize: 9 }
                        } 
                        }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    disableRowSelectionOnClick
                />
            </div>
             
        </div>
    )

} 


export default OrderClient;