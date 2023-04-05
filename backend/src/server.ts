import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()

const port: any = process.env.PORT || 8000

app.get("/", (req: Request, res: Response) => {
	res.json({ msg: "Say hi from root page :D" })
})

app.listen(port, () => console.log(`Server's running on port ${port}`))
