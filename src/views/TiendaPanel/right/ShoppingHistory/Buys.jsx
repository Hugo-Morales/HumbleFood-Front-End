import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


function Buys({ total, shopInfo, productsInfo }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Tienda: {shopInfo?.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex justify-between">
              <div className="w-2/3">
                {productsInfo?.map((product, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center mb-2"
                  >
                    <img
                      src={product?.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <p className="font-bold text-xl">{product.name}</p>
                    <p>
                      Cantidad:{" "}
                      <span className="font-bold">{product.cantidad}</span>
                    </p>
                    <p>
                      Precio:{" "}
                      <span className="font-bold">{product.price}</span>
                    </p>
                    <p>
                      Descuento:{" "}
                      <span className="font-bold">{product.discount}</span>
                    </p>
                    <p>
                      Pecio con descuento incluido:{" "}
                      <span className="font-bold">{product.price - ((product.price / 100) * product.discount)}</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="flex items-end font-bold">
                Total de Compra: <span className="text-2xl ml-2">{total}</span>
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <hr></hr>
    </div>
  );
}

export default Buys;
