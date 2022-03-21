import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reviews() {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      return await axios
        .get(`https://back-end-prueba.herokuapp.com/reviews/${productId}`)
        .then((res) => {
          setReviews(res.data);
        });
    };
    getReviews();
  }, [productId]);


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
    </div>
  );
}

export default Reviews;
