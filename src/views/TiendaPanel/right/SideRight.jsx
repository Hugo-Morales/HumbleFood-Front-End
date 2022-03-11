import Table from "./Table";
import CreateProducts from "./Create/CreateProducts";
import InfoDataUser from "./InfoDataUser";
import { useSelector } from "react-redux";
import Styles from "./SideRight.module.css";
export default function SideRight({
  rol,
  product,
  idS,
  user,
  paging,
  currentPage,
}) {
  const dataUser = useSelector((state) => state.dataUser);
  const { products, next, prev, pagesTotal } = product;
  // console.log(next, prev, pagesTotal)

  const renderSwitch = (x) => {
    switch (x) {
      case "home":
        return (
          <Table
            p={products}
            d={false}
            next={next}
            prev={prev}
            pagesTotal={pagesTotal}
            paging={paging}
            currentPage={currentPage}
          />
        );
      case "crear":
        return <CreateProducts user={user} />;
      case "delete":
        return (
          <Table
            p={products}
            d={true}
            next={next}
            prev={prev}
            pagesTotal={pagesTotal}
            paging={paging}
            currentPage={currentPage}
          />
        );
      default:
        return (
          <Table
            p={products}
            d={false}
            next={next}
            prev={prev}
            pagesTotal={pagesTotal}
            paging={paging}
            currentPage={currentPage}
          />
        );
    }
  };

  return (
    <div className="bg-gray-700 h-full p-6">
      <div className={`${Styles.bg} ${"h-full p-6 sm:rounded-lg"}`}>
        {/* idS === 'crear' ? <CreateProducts user={user} /> : <Table p={products} /> */}
        {renderSwitch(idS)}
      </div>
    </div>
  );
}
