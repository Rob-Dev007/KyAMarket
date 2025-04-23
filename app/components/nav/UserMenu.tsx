'use client';

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { BiCaretDown } from "react-icons/bi";
import Link from "next/link";
import MenuItems from "./MenuItems";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps{
    currentUser : SafeUser | null 
}

const UserMenu:React.FC<UserMenuProps> = ({ currentUser })=>{

    const [ isOpen, setIsOpen ] = useState(false);

    const toggleOpen = useCallback(() =>{
        setIsOpen(prev => !prev)
    }, [])

    return(<>
    <div className="relative z-30">
        <div onClick={ toggleOpen } className="p-3 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full hover:shadow-md cursor-pointer transition text-slate-700">
            <Avatar src={ currentUser?.image }/>
            <BiCaretDown />
        </div>
        { isOpen && (
            <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 flex text-sm flex-col cursor-pointer">
                { currentUser ? 
                <div>
                    <Link href="/orders">
                        <MenuItems onClick={ toggleOpen }>Tus ordenes</MenuItems>
                    </Link>
                    <Link href="/admin">
                        <MenuItems onClick={ toggleOpen }>Panel admin</MenuItems>
                    </Link>
                    <hr />
                    <MenuItems onClick={()=>{
                        toggleOpen();
                        signOut();
                    }}>Cerrar sesión</MenuItems>
                </div> : <div>
                    <Link href="/login">
                        <MenuItems onClick={ toggleOpen }>Inicia sesión</MenuItems>
                    </Link>
                    <Link href="/register">
                        <MenuItems onClick={ toggleOpen }>Registrate</MenuItems>
                    </Link>
                </div> 
                }
            </div>
        ) }
    </div>
    {isOpen ? 
        <BackDrop onClick={ toggleOpen }/> : null
    }
    </>)

}

export default UserMenu;