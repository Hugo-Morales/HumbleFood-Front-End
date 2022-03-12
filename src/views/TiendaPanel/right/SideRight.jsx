import Table from "./Table";
import CreateProducts from "./Create/CreateProducts";
import HacerAdmin from "./make/HacerAdmin";
import Styles from "./SideRight.module.css";

export default function SideRight({ rol, product, idS, shopsId, paging, currentPage }) {
  const { products, next, prev, pagesTotal } = product;
  console.log(idS)

  const renderSwitch = (x) => {
    switch (x) {
      case 'home':
        // if (rol === 2) {
        //   return <HacerAdmin />
        // } else {
        return <Table p={products} d={false} next={next} prev={prev} pagesTotal={pagesTotal} paging={paging} currentPage={currentPage} />;
      // }
      case 'crear':
        return <CreateProducts shopId={shopsId} />;
      case 'delete':
        return <Table p={products} d={true} next={next} prev={prev} pagesTotal={pagesTotal} paging={paging} currentPage={currentPage} />;
      case 'makeAdmin':
        return <HacerAdmin />
      // return <Table p={products} d={true} next={next} prev={prev} pagesTotal={pagesTotal} paging={paging} currentPage={currentPage} />;
      default:
        // if (rol === 2) {
        //   return <HacerAdmin />
        // } else {
        return <Table p={products} d={false} next={next} prev={prev} pagesTotal={pagesTotal} paging={paging} currentPage={currentPage} />;
      // }
    }
  }

  return (
    <div className="bg-gray-700 h-full p-6">
      <div className={`${Styles.bg} ${"h-full p-6 sm:rounded-lg"}`}>
        {/* idS === 'crear' ? <CreateProducts user={user} /> : <Table p={products} /> */}
        {renderSwitch(idS)}
      </div>
    </div>
  );
}
