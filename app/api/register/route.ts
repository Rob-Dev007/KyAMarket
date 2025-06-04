import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',');

export async function POST(req: Request){

    try {
        const body = await req.json();

        const { name, email, password } = body;

        const existUser = await prisma.user.findUnique({
            where: { email },
        });
      
        if (existUser) {
            return new NextResponse(
              JSON.stringify({ error: "El usuario ya está registrado" }),
              { status: 409 } // Código HTTP 409: Conflicto
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const isAdmin = ADMIN_EMAILS.includes(email);
          
        const user = await prisma.user.create({
            data:{
                name, 
                email, 
                hashedPassword,
                role: isAdmin ? 'ADMIN' : 'USER'
            }
        })

    return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: "Error al registrar usuario" }),
            { status: 500 }
        );
    }
}