interface ContainerProps{
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children })=>{
    return(
        <div className="max-w-[2000px] mx-auto xl:p-18 px-1 md:p-4">
            { children }
        </div>
    )

};

export default Container;