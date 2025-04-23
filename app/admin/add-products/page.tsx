import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductsForm from "./addProductsForm"
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async ()=>{
    
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="¡Acceso no permitido!" />
    }

    return(
        <div>
            <Container>
                <FormWrap>
                    <AddProductsForm />
                </FormWrap>
            </Container>
        </div>
    )

};

export default AddProducts;