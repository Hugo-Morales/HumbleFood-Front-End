import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: 4,
};


export default function DetailOrder({ productsInfo, userInfo, date }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-end mr-2 md:inline-block md:mr-0">
      <Button onClick={handleOpen} variant="contained" color="success" size="small">
        Detalle
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Orden de: <span className="text-princetonOrange">{userInfo}</span><br></br>
            Creada el: <span className="text-princetonOrange">{date}</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {productsInfo?.map((product) => (
              <div key={product.id} className="flex items-center m-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 mr-8 rounded-full"
                />
                <p className="w-1/3 font-extrabold">{product.name}</p>
                <p className="font-bold w-1/3 text-gray-400">
                  Cantidad:{" "}
                  <span className="font-bold text-black text-xl ml-2">
                    {product.cantidad}
                  </span>
                </p>
              </div>
            ))}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
