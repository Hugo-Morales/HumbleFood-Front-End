import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function SendReview() {
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  console.log(value);
  return (
    <div className="lg:w-1/2 sm:w-full mx-auto lg:my-12 lg:shadow-lg lg:shadow-black lg:rounded-md">
      <div className="bg-ochre lg:rounded-t-md">
        <h2 className="text-xl sm:text-2xl lg:text-4xl text-center text-isabelline font-bold p-12">
          ¿Qué te pareció el producto?
        </h2>
      </div>
      <form className="p-4 lg:p-12">
        <span>¿Cuantas estrellas le darías a este producto?</span>
        <Stack spacing={1} className="mt-4">
          <Rating
            name="size-large"
            value={value}
            onChange={(event, newValue) => {
              event.preventDefault();
              setValue(newValue);
            }}
            size="large"
          />
        </Stack>
        <div className="flex flex-col mt-8">
          <span>
            Por favor, deja un comentario opinando del producto.<br></br>
            Será útil para futuros compradores.
          </span>
          <textarea
            name="review"
            onChange={handleChange}
            className="h-40 mt-4 p-2 rounded-md border-2 border-slate-300 focus:outline-none resize-none "
          />
        </div>
        <button
          type="submit"
          className="mt-10 w-auto bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
        >
          Calificar
        </button>
      </form>
    </div>
  );
}

export default SendReview;
