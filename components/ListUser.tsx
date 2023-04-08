import { FC, useState, useEffect } from "react"

const ListUser: FC = () => {
	const [listUser, setListUser] = useState([])
	const getAllUser = async () => {
		const resp = await fetch("http://localhost:5000/user/all")
		const data = await resp.json()
		// console.log(data.data)
		setListUser(data.data)
	}
	useEffect(() => {
		getAllUser()
	}, [])
	return (
		<div className="my-4">
			<h1 className="text-2xl">List users</h1>
			<hr />

			<ul className="flex gap-x-2">
				{listUser.map((elem, index) => (
					<li key={index} className="my-2 bg-zinc-100 px-2 py-1 rounded w-fit">
						{elem.name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default ListUser
