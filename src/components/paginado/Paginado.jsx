import React from "react";

export const Paginado = ({ paging, currentPage, pagesTotal, prev, next }) => {
  const pages = [];
  for (let i = 0; i <= pagesTotal - 1; i++) {
    pages.push(i);
  }

  return (
    <div className="w-full flex justify-center">
      {next && (
        <div class="inline-flex">
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => paging(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
      {pages.map((p) => (
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-I"
          onClick={() => paging((currentPage = p))}
        >
          {p + 1}
        </button>
      ))}
      {prev && (
        <button
          type="button"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-I"
          onClick={() => paging(currentPage - 1)}
        >
          Prev
        </button>
      )}
    </div>
  );
};
