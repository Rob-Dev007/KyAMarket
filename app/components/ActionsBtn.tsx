'use client';

import { IconType } from "react-icons"

interface ActionsBtnProps{
    icon: IconType,
    onClick : (e: React.MouseEvent<HTMLButtonElement>)=>void,
    disabled?: boolean
}

const ActionsBtn: React.FC<ActionsBtnProps> = ({ icon: Icon, onClick, disabled })=>{
    return(
        <button onClick={ onClick }
        disabled={ disabled }
        className={`flex items-center justify-center rounded text-slate-700 cursor-pointer w-[40px] h-[30px] border border-slate-400 ${ disabled && 'opacity-50 cursor-not-allowed' }`}>
            <Icon size={21}/>
        </button>
    )
}

export default ActionsBtn;