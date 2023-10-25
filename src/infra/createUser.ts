import { PrismaClient } from '@prisma/client';
import { UserData } from '../interfaces/interfacesAndTypes.ts';

export class CreateUser{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(data: UserData){
      const createUser = await this.prisma.profile.create({ data })
      return createUser
  } 
}