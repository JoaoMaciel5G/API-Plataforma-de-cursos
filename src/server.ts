import express from "express"
import cors from "cors"
import router from "./routes/routes.ts"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/", router)

app.listen(process.env.PORT || 3000)