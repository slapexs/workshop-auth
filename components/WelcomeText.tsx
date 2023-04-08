import { FC, useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import axios from "axios"
const WelcomeText: FC = () => {
	const [userID, setUserID] = useState(0)
	const [userObject, setUserObject] = useState({})
	const storedToken = localStorage.getItem("token")

	const getUserInfo = async (uid: number) => {
		const resp = await fetch(`http://localhost:5000/user/finduser/${uid}`)
		const data = await resp.json()
		setUserObject(data)
	}

	useEffect(() => {
		if (storedToken) {
			const decodeToken = jwt.decode(storedToken)
			setUserID(decodeToken.uid)
			if (userID != 0) {
				getUserInfo(userID)
			}
		}
	})
	return (
		<>
			<div className="w-full bg-white rounded shadow-sm">
				<h1>Welcome {userObject.name}</h1>
			</div>
		</>
	)
}

export default WelcomeText
