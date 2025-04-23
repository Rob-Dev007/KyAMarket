'use client';

import { register } from "module";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { useState,useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import { SafeUser } from "@/types";

interface LoginFormProps{
    currentUser : SafeUser | null
}

const LoginForm:React.FC<LoginFormProps> = ({ currentUser })=>{

    const [ isLoading, setIsLoading ] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: ''
        }
    });

    const router = useRouter();

    useEffect(()=>{
        if(currentUser){
            router.push('/cart')
            router.refresh()
        }
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false
        }).then(callback=>{
            setIsLoading(false)

            if(callback?.ok){
                router.push('/cart')
                router.refresh()
                toast.success('Sesión iniciada')
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    };

    if(currentUser){
        return <p className="text-center">Iniciando sesión....Redirigiendo</p>
    }

    return(
        <>
            <Heading title="Inicia sesión y realiza compras online"/>
            <Button outline label="Inicia sesión con tu cuenta Google" icon={ AiOutlineGoogle } onclick={()=>{ signIn('google') }}/>
            <hr className="bg-slate w-full h-px" />
            <Input 
                id="email"
                label="Email"
                type="email"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
            <Input 
                id="password"
                label="Password"
                type="password"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
            <Button label={isLoading ? 'Cargando' : 'Inicia sesión'} onclick={ handleSubmit(onSubmit) }/>
            <p className="text-sm">¿No tienes una cuenta? <Link className="font-bold" href='/login'>Registrate</Link> </p>
        </>
    )
};

export default LoginForm; 