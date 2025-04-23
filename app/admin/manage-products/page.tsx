import { getCurrentUser } from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ManageProductsClient from "./ManageProducts";

const ManageProducts = async () =>{

    const products = await getProducts({ category: null });
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser?.role !== 'ADMIN'){
        return <NullData title="Ocurrió un error, lamentamos los inconvenientes."/>
    }

    return(
        <div className="mt-8">
            <Container>
                <ManageProductsClient products = { products }/>
            </Container>
        </div>
    )

};

export default ManageProducts;