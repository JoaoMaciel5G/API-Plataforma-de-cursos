import { PrismaClient } from "@prisma/client"
import jsonwebtoken from "jsonwebtoken"

const prisma = new PrismaClient()

interface User{
    name: string,
    email: string,
    passwordHash: string
}

export class Database{
    async create({name, email, passwordHash}: User){
        try{
            const user = await prisma.profile.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                }
            })


        }catch(error){

        }
        
    }

    async delete(){

    }

    async searchUser(){
    }

    update(id: string){

    }

}