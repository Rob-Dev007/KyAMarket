interface NullDataProps{
    title: string
}

const NullData = ({ title }: NullDataProps)=>{
    return(
        <div className="w-full h-[50vh] text-xl md:text-2xl flex justify-center items-center">
            <p className="font-medium mx-2">{ title }</p>
        </div>
    )
}

export default NullData;