import { FC } from "react"

interface InputProps {
	label: string
	name: string
	id: string
	type: string
	value?: string
	required?: boolean
	onChangeFunction: (s: string) => void
}

const TextInput: FC<InputProps> = ({
	label,
	name,
	id,
	type,
	value,
	required,
	onChangeFunction,
}) => {
	return (
		<div className="my-1">
			<label htmlFor={id} className="text-gray-500 font-thin text-xs">
				{label}
			</label>

			<input
				type={type}
				name={name}
				id={id}
				value={value}
				required={required}
				className="w-full rounded py-1 px-2"
				onChange={(e) => onChangeFunction(e.target.value)}
			/>
		</div>
	)
}

export default TextInput
