import Container from "@/app/components/Container";
import OrderDetail from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";


interface IParams{
    orderId? : string
}

const Order = async ({ params } : { params : IParams })=>{

    const order = await getOrderById(params);

    if(!order) return <NullData title="No hay ordenes"></NullData>

    return(
        <div className="p-8">
            <Container>
                <OrderDetail order={ order }/>
            </Container>
        </div>
    )

}

export default Order;