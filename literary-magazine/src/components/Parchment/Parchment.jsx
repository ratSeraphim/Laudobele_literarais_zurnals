import React from "react";

import * as S from "./style";
const Parchment = (props) => {
	return <S.Story>{props.children}</S.Story>;
};

export default Parchment;
