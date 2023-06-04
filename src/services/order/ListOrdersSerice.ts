import prismaClient from "../../prisma";

class ListOrdersSerice{
    async execute(){
        const orders = await prismaClient.order.findMany({
            where:{
                draft: false,
                status: false,
            },
            orderBy:{
                created_at: 'desc'
            }
        });

        return orders;
    }
}

export { ListOrdersSerice }