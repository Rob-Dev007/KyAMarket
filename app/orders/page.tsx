import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import Heading from "../components/Heading";
import OrderClient from "./OrderClient";
import NullData from "../components/NullData";
import getOrdersByUsersId from "@/actions/getOrdersByUsersId";

const Orders = async()=>{

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return <NullData title="Acceso denegado"/>;
    }

    const orders =  await getOrdersByUsersId(currentUser.id);

    if(!orders){
        return <NullData title="Sin ordenes existentes"/>
    }

    return(
        <div className="pt-8">
            <Container>
                <Heading title="Tus ordenes" center/>
                <OrderClient  orders={ orders}/>
            </Container>
        </div>
    )

}

export default Orders;