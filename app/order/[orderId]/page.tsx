import Container from "@/app/components/Container";
import OrderDetail from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId: string;
}

export default async function Page({ params } : { params: IParams }) {
  

  const order = await getOrderById({ orderId: params.orderId });

  if (!order) {
    return <NullData title="No hay órdenes" />;
  }

  return (
    <div className="p-8">
      <Container>
        <OrderDetail order={order} />
      </Container>
    </div>
  );
}
