export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        SECRET: string,
        PORT_NODEMAILER: number,
        HOST_NODEMAILER: string,
        PASSWD_NODEMAILER: string,
        EMAIL_NODEMAILER: string,
        DATABASE_URL: string
    }
  }
}