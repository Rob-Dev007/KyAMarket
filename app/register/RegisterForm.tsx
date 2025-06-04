'use client';

import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps{
    currentUser : SafeUser | null
}

const RegisterForm:React.FC<RegisterFormProps> = ({ currentUser })=>{

    const [ isLoading, setIsLoading ] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    });

    const router = useRouter();

    useEffect(()=>{
        if(currentUser){
            router.push('/login')
            router.refresh();
        }
    }, [currentUser, router])

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

        axios.post('/api/register',{
            name: data.name,
            email: data.email,
            password: data.password,
        }).then(()=>{
            toast.success('Cuenta creada con éxito')

            signIn('credentials',{
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback)=>{
                if(callback?.ok){
                    router.push('/cart')
                    router.refresh()
                    toast.success('Iniciando sesión')
                }
                if(callback?.error){
                    toast.error(callback.error)
                }
            }
            )
        }).catch((error)=>{
            if (error.response?.status === 409) {
            toast.error("El usuario ya está registrado");
            }else{
            toast.error("Ocurrió un error al registrarte");
          }}).finally(()=>setIsLoading(false));
    };

    if(currentUser){
        return <p className="text-center">Iniciando sesión...Redirigiendo</p>
    }

    return(
        <>
            <Heading title="Registrate y realiza compras online"/>
            <Button outline label="Registrate con tu cuenta Google" icon={ AiOutlineGoogle } onclick={()=>{ signIn('google') }}/>
            <hr className="bg-slate w-full h-px" />
            <Input 
                id="name"
                label="Nombres"
                type="text"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
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
           
            <Button label={isLoading ? 'Cargando' : 'Registrate'} onclick={ handleSubmit(onSubmit) } disabled={ isLoading }/>
            <p className="text-sm">¿Ya tienes una cuenta? <Link className="font-bold" href='/login'>Inicia sesión</Link> </p>
        </>
    )
};

export default RegisterForm; 