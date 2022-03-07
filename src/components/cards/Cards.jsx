import Card from "./Card";

const Cards = ({ handleAddToCart, productsloaded }) => {
  return (
    <div className="flex flex-wrap mt-5">
      {productsloaded.map((product, index) => (
        <div key={index} className="mb-5 mr-5">
          <Card handleAddToCart={handleAddToCart} product={product} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
