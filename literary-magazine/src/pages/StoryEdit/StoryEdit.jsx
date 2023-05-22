import React from "react";
import * as S from "./style";
import Side from "../../components/Side/Side";

const StoryEdit = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<S.Content>
				<S.CusPaper>
					<div>New story</div>

					<form onSubmit={handleSubmit}>
						<label>Title</label>
						<input type="text" name="title" />
						<label>Content</label>
						<textarea />
						<button type="submit">Submit</button>
					</form>
				</S.CusPaper>
				<Side></Side>
			</S.Content>
		</>
	);
};

export default StoryEdit;
