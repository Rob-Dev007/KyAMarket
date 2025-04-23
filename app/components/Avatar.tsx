import Image from "next/image";

import { HiUserCircle } from "react-icons/hi2";


interface AvatarProps{
    src?: string | null | undefined,
}

const Avatar: React.FC<AvatarProps> = ({ src })=>{
        if(src){
            return(
                <Image src={ src } alt="Avatar" className="rounded-full" height='30' width='30'/>
            )
        }
        return <HiUserCircle  size={ 30 }/>
};

export default Avatar;