import { PrismaClient } from "@prisma/client"

export class FindUserById{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute (userId: string) {
        try{
            const search = await this.prisma.profile.findUnique({ where: { id: userId } })
            return search
        }catch(error){
            throw new Error("Usuário não encontrado")
        }
    } 
}