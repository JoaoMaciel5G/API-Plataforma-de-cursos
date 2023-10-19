import { PrismaClient, Prisma } from '@prisma/client';
import { UserData } from '../interfaces/interfacesAndTypes.ts';

export class CreateUser{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(data: UserData){
    try{
        const createUser = await this.prisma.profile.create({ data })
        return createUser
    }catch(error){
      throw new Error("Não foi possivel criar o usuário")
    }
  } 
}