import Container from "@/app/components/Container";
import OrderDetail from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface PageProps {
    orderId: string;
}

const Page = async ({ params }: { params: Promise<PageProps>}) => {

  const { orderId }= await params;

  const order = await getOrderById(orderId);

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
};

export default Page;
