import { PrismaClient } from "@prisma/client"

export class FindSignature{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute ({currentData, userId}: {currentData: Date, userId: string}){
        const search = await this.prisma.signature.findUnique({
            where: {
                user_id: userId,
                end_time: { lte:  currentData }//verifica se a data de fim da assinatura, é menor ou igual a atual, se for maior, é porque passou do prazo
            },
            select: {
                user_id: true,
                status: true
            }
        })
        return search
    } 
}