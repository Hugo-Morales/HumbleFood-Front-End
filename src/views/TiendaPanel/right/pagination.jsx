import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({
	paging,
	currentPage,
	pagesTotal,
}) {
	const [page, setPage] = React.useState(currentPage + 1);
	const handleChange = (event, value) => {
		setPage(value);
		paging(value - 1);
	};

	return (
		<>
			{pagesTotal === 1 || pagesTotal === 0 ? null : (
				<Stack spacing={2}>
					<div className="w-full my-4 flex justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
						<Pagination
							count={pagesTotal}
							page={page}
							color="primary"
							variant="outlined"
							shape="rounded"
							showFirstButton
							showLastButton
							boundaryCount={2}
							onChange={handleChange}
						/>
					</div>
				</Stack>
			)}
		</>
	);
}
