import Navbar from "@/components/Navbar"
import { FC } from "react"

const Home: FC = () => {
	return (
		<>
			<Navbar />
			<section className="w-full flex justify-center">
				{/* Container */}
				<div className="w-11/12"></div>
			</section>
		</>
	)
}

export default Home
