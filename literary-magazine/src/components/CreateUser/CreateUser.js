import axios from "axios";
import { useState } from "react";

export default function ListUser() {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
	});
	const handleChange = (event) => {
		const { name, value } = event.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
		axios
			.post("http://localhost:3001/accounts", inputs)
			.then((response) => {
				console.log(response.data);
				// Handle data
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<h1>Create user</h1>
			<form onSubmit={handleSubmit}>
				<table cellSpacing="10">
					<tbody>
						<tr>
							<th>
								<label>Email: </label>
							</th>
							<td>
								<input type="text" name="email" onChange={handleChange} />
							</td>
						</tr>

						<tr>
							<th>
								<label>Username: </label>
							</th>
							<td>
								<input type="text" name="username" onChange={handleChange} />
							</td>
						</tr>
						<tr>
							<th>
								<label>Password: </label>
							</th>
							<td>
								<input type="text" name="password" onChange={handleChange} />
							</td>

							<td colSpan="2" align="right">
								<button>Save</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	);
}
