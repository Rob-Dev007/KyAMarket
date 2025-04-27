'use client';

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FormatPrices from "@/utils/FormatPrices";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdClose, MdDone, MdCached, MdRemoveRedEye, MdDelete } from "react-icons/md";
import ActionsBtn from "@/app/components/ActionsBtn";
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsProps{
    products: Product[]
}

type RowData = {
    id: string;
    name: string;
    price: string;
    category: string;
    brand: string;
    inStock: boolean;
  };

const ManageProductsClient: React.FC<ManageProductsProps> = ({ products })=>{

    const router = useRouter();
    const storage =  getStorage(firebaseApp);

    let rows: RowData[] = [];

    if(products){
        rows = products.map(product=>{
            return{
                id: product.id,
                name: product.name,
                price: FormatPrices(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
            }
        })
    }

     const handleToggleStock = useCallback((id: string, inStock:boolean)=>{
        axios.put('/api/product', {
            id,
            inStock : !inStock
        }).then(()=>{
            toast.success('Estado del producto cambiado');
            router.refresh();
        }).catch(error=>{
            toast.error('¡Ha ocurrido un problema!');
            console.log(error);
        })
            
        
    }, [router])

    const handleDelete = useCallback(async(id: string, images: { image: string }[])=>{
        toast('¡Eliminando producto, por favor espere...!');

        const handleImageDelete = async()=>{
            try{
                for(const item of images){
                    if(item.image){
                        const imageRef = ref(storage, item.image);
                        await deleteObject(imageRef);
                    }
                }
            }catch(error){
                console.log('Error al eliminar las imagenes', error);
            }
        }

        await handleImageDelete();

        axios.delete(`/api/product/${id}`).then(() =>{
            toast.success('Producto eliminado exitosamente');
            router.refresh();
        }).catch(error=>{
            toast.error('Ocurrio un problema, vuelve a intentarlo');
            console.log(error);
        })
    }, [])

    const columns: GridColDef[] = [
        {field:'id', headerName:'ID', width:220},
        {field:'name', headerName:'Nombre', width:220},
        {field:'price', 
        headerName:'Precio(USD)', 
        width:100, 
        renderCell:(params)=>{
            return(<div className="font-bold text-slate-500">{ params.row.price }</div>)
        }},
        {field:'category', headerName:'Categoria', width:100},
        {field:'brand', headerName:'Marca', width:120},
        {field:'inStock', 
        headerName:'En Stock', 
        width:120, 
        renderCell:(params)=>{
            return(
            <div>{ params.row.inStock === true ? 
            <Status text='En stock' icon={ MdDone } bg="bg-teal-200" color="text-teal-700"/> : 
            <Status text="Agotado" icon={ MdClose } bg="bg-rose-200" color='text-rose-700'/> 
            }</div>)
        }},
        {field:'action', 
        headerName:'Acciones', 
        width:210, 
        renderCell:(params)=>{
            return(
            <div className="flex justify-between items-center my-2 gap-4 w-full">
                <ActionsBtn icon={ MdCached } onClick={ ()=>handleToggleStock(params.row.id, params.row.inStock) }/>
                <ActionsBtn icon={ MdDelete } onClick={ ()=>handleDelete(params.row.id, params.row.images) }/>
                <ActionsBtn icon={ MdRemoveRedEye } onClick={ ()=> router.push(`/producto/${params.row.id}`) }/>
            </div>)
        }}, 
    ];

    return(
        <div className="max-w-[1150px] mx-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Administra tus productos" center/>
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

export default ManageProductsClient;