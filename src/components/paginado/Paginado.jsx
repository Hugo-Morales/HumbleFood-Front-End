import React from "react";

const Paginado = ({ paging, currentPage, pagesTotal, prev, next }) => {
  const pages = [];
  for (let i = 0; i <= pagesTotal - 1; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full mb-2 flex justify-center">
      {prev && (
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => paging(currentPage - 1)}
        >
          Anterior
        </button>
      )}
      {pages.length === 1
        ? null
        : pages.map((p) => (
            <button
              type="button"
              key={p}
              className={
                p === currentPage
                  ? "bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-I"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-I"
              }
              onClick={() => paging((currentPage = p))}
            >
              {p + 1}
            </button>
          ))}
      {next && (
        <div className="inline-flex">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => paging(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Paginado;
