import Navbar from "@/components/Navbar"
import TextInput from "@/components/TextInput"
import { FC, useState } from "react"
import axios from "axios"

const Login: FC = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		axios
			.post("http://localhost:5000/auth/login", {
				username,
				password,
			})
			.then((res) => {
				if (res.status == 200) {
					localStorage.setItem("token", res.data.token)
				} else {
					console.log(`Error: ${res.data}`)
				}
			})
			.catch((err) => console.log(err.response.statusText))
	}
	return (
		<>
			<Navbar />
			<section className="flex justify-center w-full">
				{/* Container */}
				<div className="w-11/12">
					<h1 className="text-2xl text-center">Login page</h1>

					<div className="bg-zinc-100 p-3 rounded w-2/6 mx-auto mt-5">
						<h1 className="font-bold">Login</h1>
						<hr />

						<form onSubmit={submitForm}>
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
								onChangeFunction={setPassword}
							/>

							<button
								type="submit"
								className="bg-indigo-200 rounded py-2 px-3 w-full mt-3 hover:bg-indigo-300 transition hover:text-white"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default Login
