import { NextFunction, Response, Request } from "express";
import { secretKey } from "../environment_variables.ts";
import jwt from "jsonwebtoken"
import { TokenPayload } from "../interfaces/interfacesAndTypes.ts";

export function deleteMiddleware(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization
    const token = authToken && authToken.split(" ")[1]

    if(!token){
        return response.status(401).json({error: "Token não inserido"})
    }
    
    try{
       const decodedToken = jwt.verify(token, secretKey)
       const { userId } = decodedToken as TokenPayload

        request.userId = userId
    }catch(error){
        return response.status(401).json({error: "Token inválido"})
    }
    next()
}