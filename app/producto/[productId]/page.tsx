import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListaRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";


interface IParams{
    productId? : string 
}

const Product = async ({ params } : { params : IParams })=>{

    const product = await getProductById(params);

    const user = await getCurrentUser();

    if(!product) return <NullData title="El producto con el ID proporcionado no existe, intentalo nuevamente."/>

    return(
        <div className="p-8">
            <Container>
                <ProductDetails product = { product }/>
                <div className="flex flex-col mt-20 gap-4">
                    <AddRating product={ product } user={ user || null }/>
                    <ListaRating product={ product }/>
                </div>
            </Container>
        </div>
    )
};

export default Product;