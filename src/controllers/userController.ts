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
import { CreateSignatureUseCase } from "../useCases/signatureUseCases/createSignatureUseCase.ts"
import { VerifySignatureAndUpdateUseCase } from "../useCases/signatureUseCases/verifySignatureAndUpdateUseCase.ts"
import { GetPlainsUseCase } from "../useCases/signatureUseCases/getPlainsUseCase.ts"

export class UserController{
    async create(request: Request, response: Response){
        const { name, email, password }: UserData = request.body
        const createUser = new CreateUserUseCase()

        try{
          const user = await createUser.execute({email, password, name})

          if(user){
            const token = jwt.sign({ userId: user?.id, email: user.email }, secretKey, {expiresIn: '1d'})
            return response.status(201).json({
                token,
                userData: user
            })
          }
        }catch(error){
            if(error.cause == "email"){
                return response.status(409).json({message: error.message})
            }
            return response.status(500).json({message: error.message})
        }
    }

    async delete(request: Request, response: Response){
        const deleteUser = new DeleteUserUseCase()
        const userId = request.userId

        try{
            const user = await deleteUser.execute(userId)

            return response.status(200).json({message: "Usuario excluido com sucesso"})
        }catch(error){
            return response.status(403).json({message: error.message})
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

    async getCoursesById(request: Request, response: Response){
        const id = request.params.id 

        try{
            const getCourses = await new GetCoursesUseCase().execute()
            const courseById = getCourses.filter((item)=> item.id == id)

            return response.status(200).json(courseById)
        }catch(error){
          return response.status(400).json({error: error.message})  
        }
    }

    async buySignatureCourse(request: Request, response: Response){
        const {type_signature, status, user_id} = request.body
        const start_date = new Date()
        const end_time = new Date()

        if(type_signature == "1"){
            end_time.setMonth(end_time.getMonth() + 1);
        }else if(type_signature == "5"){
            end_time.setMonth(end_time.getMonth() + 5);
        }

        try{
            const createNewSignature = new CreateSignatureUseCase()
            await createNewSignature.execute({type_signature, start_date, end_time, status, user_id})

            return response.status(200).json("Assinatura criada")
        }catch(error){
            return response.status(400).json({error: error.message})
        }
    }

    async verifySignature(request: Request, response: Response){
        const userId = request.userId
        const currentData = new Date()

        try{
            const verify = new VerifySignatureAndUpdateUseCase()

            const data = await verify.execute({currentData, userId})

            return response.status(200).json({message: data})
        }catch(error){
            return response.status(400).json({error: error.message})
        }
    }

    async getPlains(request: Request, response: Response){
        try{
            const getPlains = new GetPlainsUseCase ()
            await getPlains.execute()
        }catch(error){
            return response.status(400).json({error: error.message})
        }
    }   
}