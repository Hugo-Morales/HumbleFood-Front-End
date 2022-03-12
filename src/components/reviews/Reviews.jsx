import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // dispatch(getReviews("6223c090aba4fcbd7aa97314"));
    const getReviews = async () => {
      return await axios
        .get(`https://back-end-prueba.herokuapp.com/reviews/${id}`)
        .then((res) => {
          setReviews(res.data);
        });
    };
    getReviews();
  }, [id]);

  const rating = reviews.map((r) => r.pointProduct);
  const generalRating = rating.reduce((acc, rating) => acc + rating, 0);
  
  return (
    <div className="mt-16">
      <div className="flex mb-8">
        <h4 className="mr-4">Calificación del Producto</h4>
        <Rating
          className="mb-2"
          name="read-only"
          value={generalRating / rating.length}
          readOnly
        />
      </div>
      <div>
        {reviews.map((r) => (
          <div key={r.id} className="mt-6 flex flex-col">
            <Rating
              className="mb-2"
              name="read-only"
              value={r.pointProduct}
              readOnly
            />
            <p>{r.contentReview}</p>
          </div>
        ))}
      </div>
      <Link
        to={`/send-review/${id}`}
        type="button"
        className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
      >
        Calificar producto
      </Link>
    </div>
  );
}

export default Reviews;
