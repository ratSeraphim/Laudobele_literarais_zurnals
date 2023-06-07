import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import Parchment from "../../Parchment/Parchment";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import * as S from "../style";

const AdminUsers = () => {
	const [stats, setStats] = useState(null);

	const fetchURL = process.env.REACT_APP_API_URL + "/admin/stats/users";
	useEffect(() => {
		console.log(fetchURL);
		axios.get(fetchURL).then((response) => {
			console.log(response.data);
			setStats(response.data);
		});
	}, [fetchURL]);
	const columns = [
		{ id: "id", numeric: true, label: "ID" },
		{
			id: "displayName",
			numeric: false,
			label: "Display Name",
		},
		{
			id: "stories",
			label: "Stories written",
			numeric: true,
		},
		{
			id: "comments",
			label: "Comments written",
			numeric: true,
		},
		{ id: "posts", label: "Posts made", numeric: true },
		{
			id: "collections",
			label: "Collections partaken in",
			numeric: true,
		},
		{
			id: "role",
			numeric: false,
			label: "Perms",
		},
	];

	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [page, setPage] = useState(0);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stats.length) : 0;
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const visibleRows = useMemo(
		() => stats?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, rowsPerPage, stats]
	);

	return (
		<>
			{stats && (
				<S.ContentHolder>
					<TableContainer component={Paper}>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<S.StyledTableCell key={column.id}>
										{column.label}
									</S.StyledTableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{visibleRows.map((user) => (
								<S.StyledTableRow key={user.account_id}>
									<TableCell scope="row">{user.account_id}</TableCell>
									<TableCell align="center">{user.display_name}</TableCell>
									<TableCell align="center">{user.story_count}</TableCell>
									<TableCell align="center">{user.comment_count}</TableCell>
									<TableCell align="center">{user.post_count}</TableCell>
									<TableCell align="center">{user.collection_count}</TableCell>
									<TableCell align="center">{user.role}</TableCell>
								</S.StyledTableRow>
							))}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 57 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={stats.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</S.ContentHolder>
			)}
		</>
	);
};

export default AdminUsers;
