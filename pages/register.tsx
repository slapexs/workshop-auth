import Navbar from "@/components/Navbar"
import TextInput from "@/components/TextInput"
import { FC, ReactHTMLElement, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const Register: FC = () => {
	const router = useRouter()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmedPassword, setConfirmedPassword] = useState("")
	const [name, setName] = useState("")

	const submitFormRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Check password matched
		if (password != confirmedPassword) {
			console.error("Password not matched!")
			setPassword("")
			setConfirmedPassword("")
			return
		}

		// Post data to server
		axios
			.post("http://localhost:5000/user/create", {
				username,
				password,
				confirmedPassword,
				name,
			})
			.then((res) => {
				if (res.data.status === 200) {
					alert(res.data.message)
				} else {
					alert(res.data.message)
				}
			})
	}
	return (
		<>
			<Navbar />
			<section className="w-full flex justify-center">
				<div className="w-11/12">
					<form onSubmit={submitFormRegister}>
						<div className="bg-zinc-100 rounded shadow-sm p-3 w-2/5 mx-auto my-2">
							<h1 className="text-2xl text-center">Register page</h1>
							<hr />
							<TextInput
								id="username"
								label="Username"
								name="username"
								type="text"
								required={true}
								onChangeFunction={setUsername}
							/>

							<TextInput
								id="password"
								label="Password"
								name="password"
								type="password"
								required={true}
								value={password}
								onChangeFunction={setPassword}
							/>

							<TextInput
								id="confirmedPassword"
								label="Confirm Password"
								name="confirmedPassword"
								type="password"
								required={true}
								value={confirmedPassword}
								onChangeFunction={setConfirmedPassword}
							/>

							<TextInput
								id="name"
								label="Name"
								name="name"
								type="text"
								required={true}
								onChangeFunction={setName}
							/>
							<button
								className="rounded bg-indigo-200 w-full px-3  py-2 my-2 hover:bg-indigo-300 hover:text-white"
								type="submit"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

export default Register
