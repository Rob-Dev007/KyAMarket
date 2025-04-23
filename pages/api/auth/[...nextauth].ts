import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/libs/prismadb";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions : AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name : 'credentials',
            credentials :{
                email: {
                    label : 'email',
                    type : 'email'
                },
                password : {
                    label : 'password',
                    type : 'password'
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password){
                    throw new Error('Email o password incorrectos');
                }
            const user = await prisma.user.findUnique({
                where : {
                    email : credentials.email
                }
            }) 
            if(!user || !user?.hashedPassword){
                throw new Error('Usuario no autenticado');
            }
            const correctPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
            )
            if(!correctPassword){
                throw new Error('Contraseña incorrecta');
            }
            return user;
            }

        })
    ],
    /**cookies: {
        sessionToken: {
          name: `__Secure-next-auth.session-token`,
          options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en producción
            sameSite: "lax",
            path: "/",
          },
        },
      },**/
    pages:{
        signIn: '/login'
    },
    debug : process.env.NODE_ENV === 'development',
    session: {
        strategy : 'jwt'
    },
    secret : process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);