import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_KEY_SECRET!,
})

export async function POST(req: Request){
    try{
        const data = await req.formData();
        const file = data.get("file") as File;

        if(!file){
            return NextResponse.json({error: "Archivo no encontrado"}, {status: 400});
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const imageUrl:string = await new Promise((resolve, reject)=>{
            cloudinary.uploader.upload_stream(
                {folder: "products"},
                (error, result)=>{
                    if(error) return reject(error);
                    if(!result?.secure_url){
                        return reject(new Error("Error al subir la imágen"));
                    }

                    resolve(result.secure_url);
                }
            ).end(buffer);
        })
        return NextResponse.json({url: imageUrl});
        }
    catch(error){
        console.log("Error:", error);
        return NextResponse.json(
            {error: "Error interno en el servidor"},
            {status: 500}
        )

    }
}