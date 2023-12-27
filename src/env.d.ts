export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        SECRET: string,
        PORT_NODEMAILER: number,
        HOST_NODEMAILER: string,
        PASSWD_NODEMAILER: string,
        EMAIL_NODEMAILER: string,
        SECURE_NODEMAILER: boolean
        DATABASE_URL: string
    }
  }
}