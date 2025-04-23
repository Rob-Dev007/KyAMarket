'use client';

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = ()=>{

    const params =  useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();

    const isMainPage = pathName === '/';

    if(!isMainPage) return null;

    return(
        <div className="bg-white">
            <Container>
                <div className="flex pt-4 items-center justify-between overflow-x-auto">
                    { categories.map(item=>(
                    
                        <Category key={ item.label } icon={ item.icon } label={ item.label } selected={ category === item.label || (category === null && item.label === 'Todas')} />
                        
                        )) }
                </div>
            </Container>
        </div>
    )

}

export default Categories;