import { PrismaClient } from "@prisma/client"

export class FindUserByEmail{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute (email: string) {
        try{
            const search = await this.prisma.profile.findUnique({ where: { email } })
            return search
        }catch(error){
            throw new Error("Usuário não encontrado")
        }
    } 
}