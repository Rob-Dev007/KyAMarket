import ManageOrdersClient from "./ManageOrdersClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import getOrders from "@/actions/getOrders";


const ManageOrders = async()=>{

    const orders = await getOrders();
    console.log("ORDERS:", orders);
    const currentUser =  await getCurrentUser();

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title='Acceso denegado'/>
    }

    return(
        <div className="pt-8">
            <Container>
                <ManageOrdersClient orders={ orders }/>
            </Container>
        </div>
    )

};

export default ManageOrders;