import CardShop from "./CardShop";
import InformacionShop from "../informacionShop/informacionShop";
import Card from "../cards/Card";

const Cards = ({ shops }) => {
  // console.log(products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-20">
      {shops &&
        shops?.map((shop, shopi, index) => (
          <div key={index} className="mb-5 mr-5">
            <CardShop shop={shop} />
            {/* <Card shop={shop} /> */}
          </div>
        ))}
    </div>
  );
};

export default Cards;
