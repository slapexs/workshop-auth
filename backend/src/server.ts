import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()

// Router
const createUser = require("./routers/User")
const authRouter = require("./routers/Auth")

const app: Application = express()
app.use(express.json())
const appPort: any = process.env.PORT || 8000

app.get("/", (req: Request, res: Response) => {
	res.json({ msg: "Say hi from root page :D" })
})

// User controller
app.use("/user", createUser)
app.use("/auth", authRouter)

app.listen(appPort, () => console.log(`Server's running on port ${appPort}`))
