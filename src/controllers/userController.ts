import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import { Login, UserData } from "../interfaces/interfacesAndTypes.ts"
import { CreateUserUseCase } from "../useCases/createUserUseCase.ts"
import { secretKey } from "../environment_variables.ts"
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase.ts"
import { LoginUserUseCase } from "../useCases/loginUserUseCase.ts"
import { SendEmailForgotPasswordUseCase } from "../useCases/sendEmailForgotPasswordUseCase.ts"
import { UpdatePasswordUseCase } from "../useCases/updatePasswordUseCase.ts"
import { GetCoursesUseCase } from "../useCases/getCoursesUseCase.ts"

export class UserController{
    async create(request: Request, response: Response){
        const { name, email, password }: UserData = request.body
        const createUser = new CreateUserUseCase()

        try{
          const user = await createUser.execute({email, password, name})

          if(user){
            const token = jwt.sign({ userId: user?.id, email: user.email }, secretKey)
            return response.status(201).json({ token })
          }
        }catch(error){
            return response.status(401).json({message: error.message})
        }
    }

    async delete(request: Request, response: Response){
        const deleteUser = new DeleteUserUseCase()
        const userId = request.userId

        try{
            const user = await deleteUser.execute(userId)

            return response.status(200).json({message: "Usuario excluido com sucesso"})
        }catch(error){
            return response.status(400).json({message: error.message})
        }
    }

    async loginUser(request: Request, response: Response){
        const {email, password}: Login = request.body
        const loginUseCase = new LoginUserUseCase()

        try{
            const login = await loginUseCase.execute({email, password})
            
            if(login?.sucess){
              return response.status(200).json({message: "Usuário logado com sucesso"})  
            }
            return response.status(401).json({error: "Houve algum erro, tente novamente mais tarde"})
        }catch(error){
            return response.status(403).json({error: error.message})
        }
    }

    async sendEmail(request: Request, response: Response){
        const emailUseCase = new SendEmailForgotPasswordUseCase()
        const email = request.emailUser

        try{
            const sendEmail = await emailUseCase.execute(email)
            return response.status(200).json({message: "Concluido"})
        }catch(error){
            return response.status(403).json({error: error.message})
        }
    }

    async updatePassword(request: Request, response: Response){
        const { password } = request.body
        const updatePassUseCase = new UpdatePasswordUseCase()
        const userId = request.userId

        try{
            const updatePassword  = updatePassUseCase.execute(userId, password)

            return response.status(200).json({message: "Dados atualizados com sucesso"})
        }catch(error){
            return response.status(403).json({error: error.message})
        }
    }

    async getCourses(request: Request, response: Response){
        try{
            const getCourses = await new GetCoursesUseCase().execute()
            return response.status(200).json(getCourses)
        }catch(error){
          return response.status(400).json({error: error.message})  
        }
    }
}