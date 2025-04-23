'use client';

import { IconType } from "react-icons";

interface ButtonLabel{
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onclick : (e: React.MouseEvent<HTMLButtonElement>)=> void
}

const Button: React.FC<ButtonLabel> = ({ label, disabled, outline, small, custom, icon: Icon, onclick })=>{
    return (<button 
    className={`${outline ? 'bg-white' : 'bg-fuchsia-500'} ${outline ? 'text-slate-700' : 'text-white'} ${small ? 'text-sm font-light' : 'text-md'} ${small ? 'px-1 py-2 border-[1px]' : 'py-3 px-4 border-4'} ${custom ? '' : ''} disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-fuchsia-500 flex items-center justify-center gap-2 font-semibold`}
    onClick={ onclick }
    disabled = { disabled }
    >
        { Icon && <Icon size={24} />}
        { label }
    </button>)

};

export default Button;