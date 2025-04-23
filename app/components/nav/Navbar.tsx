import Container from "../Container";
import Link from "next/link";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu"
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const NavBar = async ()=>{

    const currentUser = await getCurrentUser();

    return(
        <div className="sticky top-0 w-full bg-gradient-to-tr from-fuchsia-500 to-purple-500 z-30 shadow-md text-gray-100">
            <div className="py-4 px-2 border-b-1">
                <Container>
                    <div className="flex items-center justify-between gap-4 md:gap-1">
                        <Link className="font-bold" href='/'>K&A Market</Link>
                        <div className="hidden md:flex">
                           <SearchBar />
                        </div>
                        <div className="flex gap-8 md:gap-12 items-center">
                            <CartCount />
                            <UserMenu currentUser={ currentUser ?? null }/>
                        </div>
                    </div>
                </Container>
            </div>
            <Categories />

        </div>
    );

};

export default NavBar; 