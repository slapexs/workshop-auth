import express, { Request, Response, response } from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mysql2 from "mysql2"
dotenv.config()
const router = express.Router()

// hash password
const saltRound: number = 5

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
	const { username, password, confirmedPassword, name } = req.body

	// Check already user
	db.execute(
		"SELECT * FROM users WHERE username = ?",
		[username],
		(err, result) => {
			if (err) throw new Error(err.message)
			const countUser = result.length
			if (countUser > 1) {
				res
					.status(401)
					.json({ message: "Username's already please change it!" })
				return
			}

			if (password === confirmedPassword) {
				// Create new user
				const hashedPassword = bcrypt.hashSync(password, saltRound)
				db.query(
					"INSERT INTO users (username, hashedPassword, name) VALUES (?, ?, ?)",
					[username, hashedPassword, name],
					(err, response) => {
						if (err) {
							res.status(401).json({ message: err.message })
						} else {
							res.status(200).json({ message: "Registration's successful" })
						}
					}
				)
			} else {
				res.status(401).json({ message: "Your password's not matched" })
			}
		}
	)
})

module.exports = router
