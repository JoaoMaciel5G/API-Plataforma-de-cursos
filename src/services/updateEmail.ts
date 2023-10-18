import { PrismaClient } from "@prisma/client"

export class UpdateEmail{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute(userId: string, email: string){
        try{
            const updateEmail = await this.prisma.profile.update({
                where: {
                    id: userId
                },
                data: {
                    email
                }
            })
        }catch(error){
            throw new Error("Não foi possivel atualizar sua informação")
        }
    }
}