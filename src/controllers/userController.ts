import {Request, Response} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Login, UserData } from "../interfaces/interfacesAndTypes.ts"
import { createUserUseCase } from "../useCases/createUserUseCase.ts"
import { secretKey } from "../environment_variables.ts"
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase.ts"
import { LoginUserUseCase } from "../useCases/loginUserUseCase.ts"
import { SendEmailForgotPasswordUseCase } from "../useCases/sendEmailForgotPasswordUseCase.ts"
import { UpdatePasswordUseCase } from "../useCases/updatePasswordUseCase.ts"
import { GetCoursesUseCase } from "../useCases/getCoursesUseCase.ts"

export class UserController{
    async create(request: Request, response: Response){
        const { name, email, password }: UserData = request.body
        const createUser = new createUserUseCase()
        const user = await createUser.execute({email, password, name})

        if ('id' in user) {
            const token = jwt.sign({ userId: user.id }, secretKey);
            return response.status(201).json({ message: token });
        }

        return response.status(401).json({message: user.errorSystem})//se houver erros, os returns do usecase e da createUser aparecem
    }

    async delete(request: Request, response: Response){
        const authToken = request.headers.authorization as string
        const token = authToken && authToken.split(" ")[1]
        const deleteUser = new DeleteUserUseCase()

        try{
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload
            const userId = decodedToken.userId
            const user = await deleteUser.execute(userId)

            if(user?.errorActionForbidden){
                return response.status(401).json({message: "Ação não autorizada"})
            }
            return response.status(200).json({message: "Usuario excluido como sucesso"})
        }catch(error){
            response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async loginUser(request: Request, response: Response){
        const { email, password }: Login = request.body
        const loginUseCase = new LoginUserUseCase()

        try{
            const {isErrorEmailOrPassword, sucess} = await loginUseCase.execute({email, password})
            if(isErrorEmailOrPassword){
                return response.status(401).json({isErrorEmailOrPassword})
            }
            return response.status(200).json({sucess})
        }catch(error){
            console.log(error)
            return response.status(403).json({error: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async sendEmail(request: Request, response: Response){
        const authToken = request.headers.authorization as string
        const token = authToken && authToken.split(" ")[1]
        const emailUseCase = new SendEmailForgotPasswordUseCase()
        try{
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload
            const userId = decodedToken.userId

            const sendEmail = await emailUseCase.execute(userId)
            return response.status(200).json({message: "Concluido"})
        }catch(error){
            console.log(error)
            return response.status(403).json({error: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async updatePassword(request: Request, response: Response){
        const { password } = request.body
        const authToken = request.headers.authorization as string
        const token = authToken && authToken.split(" ")[1]
        const updatePassUseCase = new UpdatePasswordUseCase()

        try{
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload
            const userId = decodedToken.userId

            const updatePassword  = updatePassUseCase.execute(userId, password)

            return response.status(200).json({message: "Dados atualizados com sucesso"})
        }catch(error){
            console.log(error)
            return response.status(403).json({error: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async getCourses(request: Request, response: Response){
        const getCourses = await new GetCoursesUseCase().execute()
        if('errorSystem' in getCourses){
            return response.status(400).json({error: getCourses.errorSystem})
        }
        return response.status(200).json(getCourses)
    }
}