import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

function Buys({ index, total, shopInfo, shopId, productsInfo, date }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <span className="mx-2 p-1 rounded-full bg-orange-700 text-white">
              # {index + 1}
            </span>
            Tienda: {shopInfo?.name} {date}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-orange-300">
          <Typography>
            <div className="flex flex-col">
              <div className="w-full">
                {productsInfo?.map((product, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-4 lg:flex lg:justify-between lg:items-center my-2"
                  >
                    <Link to={`/products/${shopId}/${product.id}`}>
                      <img
                        src={product?.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <p className="flex justify-start font-bold text-xl w-12">
                        {product.name}
                      </p>
                    </Link>

                    <Link
                      to={`/send-review/${product.id}`}
                      className="flex justify-center items-center lg:w-44 h-12 p-2 text-center text-white bg-darkGreen rounded-sm hover:bg-teal-800"
                    >
                      <p>Calificar</p>
                    </Link>
                    <p className="font-bold">
                      Cantidad:{" "}
                      <span className="font-bold">{product.cantidad}</span>
                    </p>
                    <p className="font-bold">
                      Pecio con descuento incluido:{" "}
                      <span className="font-bold">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "USD",
                        }).format(
                          product.price -
                            (product.price / 100) * product.discount
                        )}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative flex items-center justify-end">
                <p className="font-bold border-t-2 border-black">
                  Total de Compra:{" "}
                  <span className="text-2xl ml-2">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                    }).format(total)}
                  </span>
                </p>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <hr></hr>
    </div>
  );
}

export default Buys;
