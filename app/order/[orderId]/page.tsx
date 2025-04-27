import Container from "@/app/components/Container";
import OrderDetail from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface OrderPageProps {
  params: { orderId: string };
}

export default async function OrderPage({ params }: OrderPageProps) {
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
