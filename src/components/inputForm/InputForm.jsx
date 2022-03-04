import React from "react";

function InputForm({ type, name, input, titleB, titleS, buyer, seller }) {

  return (
    <div>
      <label
        id={input}
        className="text-sm font-medium leading-none text-gray-800"
      >
        {type === "buyer" ? titleB : titleS}
      </label>
      <input
        aria-labelledby="email"
        type={input}
        placeholder={
          type === "buyer" ? buyer : seller
        }
        className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
      />
    </div>
  );
}

export default InputForm;
