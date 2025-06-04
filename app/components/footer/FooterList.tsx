interface footerProps{
    children : React.ReactNode
}

const FooterList: React.FC<footerProps> = ({ children })=>{
    return(
        <div className="sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-4">
            { children }
        </div>
    )
};

export default FooterList;