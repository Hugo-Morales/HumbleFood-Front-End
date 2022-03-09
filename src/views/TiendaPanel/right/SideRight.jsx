import Table from "./Table";
import CreateProducts from './Create/CreateProducts';

export default function SideRight({ product, idS, user }) {
    const { products } = product;

    return (
        <div className="bg-white-500 h-full p-6">
            <div className="bg-gray-500 h-full p-6 sm:rounded-lg">
                {
                    idS === 'crear' ? <CreateProducts user={user} /> : <Table p={products} />
                }
            </div>
        </div >
    )
}