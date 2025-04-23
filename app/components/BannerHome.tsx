import Image from "next/image";

const BannerHome = ()=>{
    return(
        <div className="bg-gradient-to-tr from-sky-400 to-sky-200 w-full mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="font-bold text-4xl md:text-6xl text-gray-200 mb-4">Ventas de temporada!</h1>
                    <p className="text-lg md:text-2xl">Encuentra productos de temporada</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <Image
                    src="/banner-image.png"
                    alt="imagen-banner"
                    className="object-contain"
                    fill
                    />
                </div>
            </div>
        </div>
    )

};
export default BannerHome;