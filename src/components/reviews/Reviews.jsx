import React from "react";
import { Link } from "react-router-dom";

function Reviews() {
  return (
    <div className="mt-16">
      <div className="flex mb-8">
        <h4 className="mr-4">Calificación del Producto</h4>
        <p>⭐⭐⭐</p>
      </div>
      {/* <div> //traer las Reviews del back y mapearlas
            {product.reviews.map((r) => {
                <div>
                    <p>{r.pointProduct}</p>
                    <p>{r.contentReview}</p>
                </div>
            })}
        </div> */}
      <div className="mb-6">
        <p className="mb-2">⭐⭐⭐⭐</p>
        <p>
          Muy buen producto y se recibio en excelente estado, el paking
          necesitada una base de carton corrugado para facilitar los movimientos
          y cuidar la mercaderia.
        </p>
      </div>
      <div className="mb-6">
        <p className="mb-2">⭐⭐⭐⭐⭐</p>
        <p>
          Muy rico gusto y el 99% vienen enteras, a mi no me cambia ya que las
          compro para licuado pero se que a muchos compradores les interesa
          saberlo.
        </p>
      </div>
      <div className="mb-6">
        <p className="mb-2">⭐⭐</p>
        <p>
          Muy prensadas! Se rompen al momento de separarlas! No me gusto
          elpackaging, la frambuesas vienen compactadas de tal forma que se
          rompen todas cuando las queres fraccionar.
        </p>
      </div>
      <Link to="/send-review"
        type="button"
        className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rorate:45"
      >
        Calificar producto
      </Link>
    </div>
  );
}

export default Reviews;
