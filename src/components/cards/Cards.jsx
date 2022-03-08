import Card from "./Card";

const Cards = ({ handleAddToCart, products }) => {
  console.log(products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-20">
      {products &&
        products?.map((product, index) => (
          <div key={index} className="mb-5 mr-5">
            <Card handleAddToCart={handleAddToCart} product={product} />
          </div>
        ))}
    </div>
  );
};

export default Cards;
