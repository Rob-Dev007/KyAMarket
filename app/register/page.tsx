import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = async()=>{

    const currentUser = await getCurrentUser();

    return(
        <Container >
            <FormWrap>
                <RegisterForm currentUser={ currentUser || null }/>
            </FormWrap>
        </Container>
    )
};

export default Register;