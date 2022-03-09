import Table from "./Table";

export default function SideLeft(product) {
    const { products } = product.product

    return (
        <div className="bg-white-500 h-screen p-6">
            <div className="p-6">

            </div>
            <div className="bg-gray-500 overflow-y-auto p-6 sm:rounded-lg">
                <Table p={products} />
            </div>
        </div >
    )
}