export interface UserData{
    name: string
    email: string,
    password: string
}
export interface Login{
    email: string,
    password: string
}

export interface UserResponse {
    message: string;
}

export interface UserId{
    userId: string
}