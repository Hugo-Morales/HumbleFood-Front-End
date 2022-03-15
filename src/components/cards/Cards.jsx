import Card from "./Card";

const Cards = ({ handleAddToCart, products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4 mobile:mt-12 md:mt-5 mobile:px-auto md:mx-20">
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
