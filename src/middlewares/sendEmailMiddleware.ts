import { NextFunction, Response, Request } from "express";
import { secretKey } from "../environment_variables.ts";
import jwt from "jsonwebtoken"
import { SendEmailPayload } from "../interfaces/interfacesAndTypes.ts";

export function sendEmailMiddleware(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization
    const token = authToken && authToken.split(" ")[1]

    if(!token){
        return response.status(401).json({error: "Token não inserido"})
    }

    try{
       const decodedToken = jwt.verify(token, secretKey)
       const {email} = decodedToken as SendEmailPayload

       request.emailUser = email
    }catch(error){
        return response.status(401).json({error: "Token inválido"})
    }
    next()
}