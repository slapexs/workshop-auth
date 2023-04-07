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
		label: "Login",
		path: "/login",
	},
	{
		label: "Register",
		path: "/register",
	},
]
const Navbar: FC = () => {
	const router = useRouter()
	const [pathNow, setPathNow] = useState("/")
	useEffect(() => {
		setPathNow(router.asPath)
		console.log(pathNow)
	}, [])

	return (
		<>
			<div className="bg-indigo-400 text-white h-12 w-full flex items-center justify-center">
				<div className="grid grid-cols-2 w-3/4">
					{/* Nav brand */}
					<div>Logo here</div>
					<div className="w-auto">
						<ul className="flex justify-end gap-x-5">
							{navbarMenu.map((elem, index) => (
								<Link key={index} href={elem.path}>
									<li
										className={
											"hover:text-yellow-200 transition hover:cursor-pointer" +
												pathNow ==
											elem.path
												? "text-red-400"
												: ""
										}
									>
										{elem.label}
									</li>
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
