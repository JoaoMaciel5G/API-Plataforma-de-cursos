import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface User{
    name: string,
    email: string,
    passwordHash: string
}

export class Database{
    async create({name, email, passwordHash}: User){
        await prisma.profile.create({
            data: {
                name,
                email,
                password: passwordHash
            }
        })
    }

    delete(id: string){

    }

    searchUser(){

    }

    update(id: string){

    }

}