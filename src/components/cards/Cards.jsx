import Card from "./Card";

const Cards = ({ handleAddToCart, data }) => {
  return (
    <div className="flex flex-wrap mt-5">
      {data.map((m, index) => (
        <div key={index} className="mb-5 mr-5">
          <Card handleAddToCart={handleAddToCart} prop={m} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
