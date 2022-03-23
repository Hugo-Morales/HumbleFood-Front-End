import CardShop from "./CardShop";
import PaginationControlled from "../../views/TiendaPanel/right/pagination";

const CardsShops = ({ shops, id, pagesTotal, paging, currentPage }) => {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mobile:px-auto md:mx-20">
				{shops &&
					shops?.map((shop, index) => (
						<div key={index} className="mb-5 mr-5">
							<CardShop shop={shop} userId={id} />
						</div>
					))}
			</div>
			{shops && (
				<PaginationControlled
					pagesTotal={pagesTotal}
					paging={paging}
					currentPage={currentPage}
				/>
			)}
		</>
	);
};

export default CardsShops;
