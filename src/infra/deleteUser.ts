import { PrismaClient } from '@prisma/client';

export class DeleteUser{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute(userId: string){
        try{
            const deleteUser = await this.prisma.profile.delete({ where: { id: userId } })
        }catch(error){
            throw new Error("Não foi possivel deletar o usuário")
        }
    }
}