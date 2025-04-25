'use client';

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps{
    id : string,
    label: string,
    type? : string,
    disabled? : boolean,
    required? : boolean,
    register? : UseFormRegister<FieldValues>,
    errors? : FieldErrors
}

const Input: React.FC<InputProps> = ({
    id, 
    label,  
    disabled, 
    required, 
    register, 
    errors
})=>{
    const errorExists = errors && errors[id];

    return (
        <div className="w-full relative">
            <input
                autoComplete="off"
                id={id}
                disabled={disabled}
                {...(register ? register(id, { required }) : {})}
                className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-75 disabled:cursor-not-allowed 
                    ${errorExists ? 'border-rose-400' : 'border-fuchsia-400'} 
                    ${errorExists ? 'focus:border-rose-400' : 'focus:border-fuchsia-400'}`}
            />
            <label htmlFor={id} className={`absolute cursor-text text-md duration-150 transform -translate-y-5 top-7 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errorExists ? 'text-rose-500' : 'text-slate-400'}`}>
                {label}
            </label>
        </div>
    );
};


export default Input;