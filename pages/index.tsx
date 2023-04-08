import Navbar from "@/components/Navbar"
import { FC, useState, useEffect } from "react"
import { useRouter } from "next/router"
import WelcomeText from "@/components/WelcomeText"

const Home: FC = () => {
	const router = useRouter()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const storedToken = localStorage.getItem("token")
		if (storedToken) {
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
			router.push("login")
		}
	})
	return (
		<>
			<Navbar />
			<section className="w-full flex justify-center">
				{/* Container */}
				<div className="w-11/12">{isLoggedIn && <WelcomeText />}</div>
			</section>
		</>
	)
}

export default Home
