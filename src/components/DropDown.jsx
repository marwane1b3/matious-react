import React from "react";

function DropDown({ operation, handleChangedOperation }) {
  const translateSelectedOperationFunction = (opt) => {
    let word = "OPERATIONS";

    if (opt === "*") word = "MULTIPLICATION";
    if (opt === "+") word = "ADDITION";
    return word;
  };

  return (
    <div className="dropdown">
      <label className="dropbtn">
        {`${translateSelectedOperationFunction(operation)}`}
      </label>
      <select
        onChange={handleChangedOperation}
        id="options"
        name="options"
        className="dropdown-content"
      >
        <option value="+">+</option>
        <option value="*">*</option>
      </select>
    </div>
  );
}

export default DropDown;
