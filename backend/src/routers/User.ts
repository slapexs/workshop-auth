import express, { Request, Response } from "express"
import axios from "axios"
import dotenv from "dotenv"
import mysql2 from "mysql2"
dotenv.config()
const router = express.Router()

type ConfigDb = {
	host: string | undefined
	user: string
	password: string
	database: string
	port: string | number
}

const db = mysql2.createConnection({
	host: process.env.dbHost,
	user: process.env.dbUser,
	password: process.env.dbPassword,
	database: process.env.dbName,
	port: 3306,
})

db.connect()
// Get all users
router.get("/all", (req: Request, res: Response) => {
	db.query("SELECT * FROM users", (err, result) => {
		if (err) {
			res.json({ err: err.message })
			return
		}

		res.json({ data: result })
	})
})

// Create user
router.post("/create", (req: Request, res: Response) => {
	const { username, password, name } = req.body
	db.query(
		"INSERT INTO users (username, hashedPassword, name) VALUES (?, ?, ?)",
		[username, password, name],
		(err, response) => {
			if (err) {
				res.status(401).json({ err: err.message })
			} else {
				res.status(200).json({ data: response })
			}
		}
	)
})

module.exports = router
