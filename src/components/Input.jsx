import React from "react";

const Input = ({ id, label, value, handleChange, ...props }) => {
  // This function is used to format the input value to add commas on the numbers
  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value) {
      const formattedValue = (
        Number(value.replace(/\D/g, "")) || ""
      ).toLocaleString();
      handleChange(formattedValue);
    } else {
      // handleChange("");
    }
    return null;
  };

  return (
    <div className="flex flex-col items-start w-full mt-4">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <div className="w-full relative">
        <span
          className="absolute left-2 font-semibold pb-0.5 text-gray-500"
          style={{ top: "0.8rem" }}
        >
          $
        </span>
        <input
          className={`border-x border-y rounded-md pl-6 pr-3 py-2 w-full mt-1 ${
            !!value ? "border-green-600" : "border-black"
          }`}
          value={value}
          onChange={handleInputChange}
          id={id}
        />
      </div>
    </div>
  );
};

export default Input;
