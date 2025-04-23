'use client';

import { IconType } from "react-icons";
import { useCallback } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface CategoryProps{
    icon: IconType,
    label: string,
    selected?: boolean
}

const Category: React.FC<CategoryProps> = ({ icon: Icon, label, selected })=>{

    const router = useRouter();
    const params = useSearchParams();

    const handleClick =  useCallback(()=>{
        const current = params ? new URLSearchParams(params) : new URLSearchParams();

        if (label === "Todas") {
          router.push("/");
          return;
        }
      
        current.set("category", label);
      
        const query = current.toString();
        const url = `/?${query}`;
      
        router.push(url);
    }, [label, params, router])
    return(
        <div onClick={ handleClick } className={`flex items-center justify-center text-center gap-1 border-b-4 hover:text-slate-800 transition cursor-pointer ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}`}>
            <Icon size={ 20 } />
            <div className="font-medium text-sm">{ label }</div>
        </div>
    )

}

export default Category;