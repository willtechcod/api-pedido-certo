import prismaClient from "../../prisma";

interface OrderRequest{
    table: number;
    client: string;
}

class CreateOrderService{
    async execute({ table, client}: OrderRequest){

        const order = await prismaClient.order.create({
            data:{
                table: table,
                client: client
            }
        })

        return order;
    }
}

export { CreateOrderService }