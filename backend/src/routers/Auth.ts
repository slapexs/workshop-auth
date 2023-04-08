import express, { Request, Response } from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mysql2 from "mysql2"
dotenv.config()
import * as jwt from "jsonwebtoken"
const router = express.Router()
const jwtSecret = "nextlogin"

// Connect database
const db = mysql2.createConnection({
	host: process.env.dbHost,
	user: process.env.dbUser,
	password: process.env.dbPassword,
	database: process.env.dbName,
	port: 3306,
})

db.connect()

router.post("/login", (req: Request, res: Response) => {
	const { username, password } = req.body

	db.execute(
		"SELECT * FROM users WHERE username = ?",
		[username],
		(err, result) => {
			if (err) throw new Error(err.message)
			// have user
			if (result.length > 0) {
				// Check username password
				const objUser = result[0]
				const passwordMatched = bcrypt.compareSync(
					password,
					objUser.hashedPassword
				)

				// is matched
				if (passwordMatched) {
					const token = jwt.sign({ uid: objUser.id }, jwtSecret)
					res.json({ token })
				} else {
					res.status(401).json({
						message:
							"Username and password not matched, please check it again.",
					})
				}
			} else {
				res.status(401).json({ message: "username's invalid" })
			}
		}
	)
})
module.exports = router
