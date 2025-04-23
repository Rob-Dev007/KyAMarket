'use client';

import { Container } from "@mui/material";
import AdminNavItem from "./AdminNavItems";
import Link from "next/link";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { TbLibraryPlus } from "react-icons/tb";
import { MdDns } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";

const AdminNav = ()=>{

    const pathname = usePathname();

    return(
        <div className="w-full top-20 shadow-sm border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row gap-8 md:gap-12 items-center justify-between md:justify-center overflow-x-auto flex-nowrap">
                    <Link href='/admin'>
                        <AdminNavItem label="Resumen" icon={ RiDashboardHorizontalFill } selected={ pathname === '/admin' }/>
                    </Link>
                    <Link href='/admin/add-products'>
                        <AdminNavItem label="Agregar productos" icon={ TbLibraryPlus} selected={ pathname === '/admin/add-products' }/>
                    </Link>
                    <Link href='/admin/manage-products'>
                        <AdminNavItem label="Gestionar productos" icon={ MdDns } selected={ pathname === '/admin/manage-products' }/>
                    </Link>
                    <Link href='/admin/manage-orders'>
                        <AdminNavItem label="Gestionar ordenes" icon={ MdFormatListBulletedAdd } selected={ pathname === '/admin/manage-orders' }/>
                    </Link>
                </div>
            </Container>
        </div>
    )

};

export default AdminNav;