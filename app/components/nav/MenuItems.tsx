interface MenuItemsProps{
    children : React.ReactNode,
    onClick : ()=> void
}

const MenuItems = ({ children, onClick }: MenuItemsProps) =>{
    return(
        <div onClick={ onClick } className="px-4 py-3 hover:bg-neutral-100 transition text-slate-500">
            { children }
        </div>

    )
}

export default MenuItems;