import getOrders from "@/actions/getOrders";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import getGraphData from "@/actions/getGraphData";
import BarGraph from "./BarGraph";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin = async()=>{

  const orders = await getOrders() ?? [];
  const products = await getProducts({ category: null, searchTerm: '' });
  const users = await getUsers();
  const graphData = await getGraphData();
  const currentUser = await getCurrentUser();

  if(currentUser?.role !== 'ADMIN'){
    return <NullData title='Acceso denegado'/>
  }

  

  const labels = graphData.map((item) => item.day);
  const amounts = graphData.map((item) => item.totalAmount);

  return (
    <div className="py-8">
      <Container>
        <Summary orders={orders} products={products} users={users} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph labels={labels} amounts={amounts} />
        </div>
      </Container>
    </div>
  );
}

export default Admin;