export interface UserData {
    name: string
    email: string,
    password: string
}
export type Login = {
    email: string,
    password: string
}

export interface User  {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export type TokenPayload = {
    userId: string,
    iat: number
}
export type SendEmailPayload = {
    email: string,
    iat: number
}
export interface Message{
     [key: string]: { status: number, message: string } 
}
export type UserId = string