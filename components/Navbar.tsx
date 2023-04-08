import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

type NavMenu = {
	label: string
	path: string
}[]

const navbarMenu: NavMenu = [
	{
		label: "Home",
		path: "/",
	},
	{
		label: "Register",
		path: "/register",
	},
]
const Navbar: FC = () => {
	const router = useRouter()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const logOut = () => {
		localStorage.removeItem("token")
		router.push("/")
	}
	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
		}
	})

	return (
		<>
			<div className="bg-indigo-400 text-white h-12 w-full flex items-center justify-center">
				<div className="grid grid-cols-2 w-3/4">
					{/* Nav brand */}
					<div>Logo here</div>
					<div className="w-auto">
						<ul className="flex justify-end gap-x-5 items-center">
							{navbarMenu.map((elem, index) => (
								<Link key={index} href={elem.path}>
									<li
										className={
											"hover:text-yellow-200 transition hover:cursor-pointer"
										}
									>
										{elem.label}
									</li>
								</Link>
							))}
							{isLoggedIn ? (
								<li
									className={
										"hover:bg-yellow-200 hover:text-black transition hover:cursor-pointer border-2 border-yellow-200 px-2 py-1 rounded"
									}
									onClick={logOut}
								>
									Logout
								</li>
							) : (
								<Link href="/login">
									<li
										className={
											"hover:text-yellow-200 transition hover:cursor-pointer"
										}
									>
										Login
									</li>
								</Link>
							)}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
