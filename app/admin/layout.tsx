import React from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title : "KyAMarket Admin",
    description: "KyAMarket panel de control del Admin"
}

const AdminLayout = ({ children }: { children: React.ReactNode })=>{
    return(
        <div>
            <AdminNav />
            { children }
        </div>
    )

};

export default AdminLayout;