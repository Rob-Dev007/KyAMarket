import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData(){

    try{
        //Obtener el rango de datos por fecha de inicio y fin(7 dias anteriores a la fecha actual)
        const startedData = moment().subtract(6, "days").startOf("day");
        const endData = moment().endOf("day");

        const result = await prisma.order.groupBy({
            by:["createDate"],
            where:{
                createDate:{
                    gte: startedData.toISOString(),
                    lte: endData.toISOString()
                },
            status: "complete",
        },
        _sum:{
            amount: true
        }
        })

        //Inicializar un objeto  para agregar los datos por dia
        const aggregatedData : {
            [day: string] : { day: string, date:string, totalAmount: number }
        } = {};

        //Crear un clon de fecha de inicio para iterar cada dia
        const currentDate = startedData.clone();

        //Iterar cada dia en el rango de fechas
        while(currentDate <= endData){
            //Formatear el dia como un string
            const day = currentDate.format('dddd');

            //Inicializar los datos agregados por dia, fecha y el monto total
            aggregatedData[day] = {
                day,
                date: currentDate.format("YYYY-MM-DD"),
                totalAmount: 0
            }

            //Cambiar al siguiente dia
            currentDate.add(1, "day");
        }

        //Calcular el monto total por cada dia sumando el monto de las ordenes
        result.forEach((entry)=>{
            const day = moment(entry.createDate).format("dddd");
            const amount = entry._sum.amount || 0 ;
            aggregatedData[day].totalAmount += amount;
        })

        //Cpnvertir la funcion aggregatedData en un array y ordenalo por fecha
        const formattedData = Object.values(aggregatedData).sort((a,b)=>{
            return moment(a.date).diff(moment(b.date));
        })


        return formattedData;

    }catch(error: any){
        throw new Error(error);
    }
}


