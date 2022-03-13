import CardShop from "./CardShop";

const Cards = ({ shops }) => {
  console.log(shops);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 lg:mx-20">
      {shops &&
        shops?.map((shop, index) => (
          <div key={index} className="mb-5 mr-5">
            <CardShop shop={shop} />
          </div>
        ))}
    </div>
  );
};

export default Cards;
