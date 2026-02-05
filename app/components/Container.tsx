interface ContainerProps{
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps)=>{
    return(
        <div className="max-w-[2000px] mx-auto xl:p-18 px-1 md:p-4">
            { children }
        </div>
    )

};

export default Container;