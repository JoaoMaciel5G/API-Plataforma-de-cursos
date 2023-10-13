import { fastify } from "fastify"
import { genSalt, hash } from "bcrypt"
import { Database } from "./db/db-controllers.ts"

interface User{
    name: string,
    email: string,
    password: string
}

const server = fastify()
const db = new Database()

server.post<{Body: User}>("/register", async (request, reply)=>{
    const {name, email, password} = request.body

    try{
        const salt = await genSalt(12)
        const passwordHash = await hash(password, salt)
        const user = await db.create({ name, email, passwordHash })

        return reply.status(200).send({message: "Usuário Criado"})
    }catch(error){
        console.log(error)
        return reply.status(403).send({message: "Houve um erro"})
    }
})

server.listen({port: 3000})