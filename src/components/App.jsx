/** imports  */
import React, { useState } from "react";
import Editor from "./Editor";
import DropDown from "./DropDown";
const App = () => {
  /** state */
  const [visible, setVisible] = useState(true);
  const [operation, setOperation] = useState("");
  /** rendering correct editor function  */

  const handleRenderEditorFunction = () => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 250);
  };
  /** changing operations based on selection dropdown  function  */

  const handleChangedOperation = (e) => {
    setOperation(e.target.value);
    handleRenderEditorFunction();
  };

  /** destroy build function */
  const destroyAndBuildFunction = () => {
    setVisible((prev) => !prev);
  };

  /** jsx */
  return (
    <div className="App">
      <div className="header-app-styles">
        <button className="dropbtn" onClick={destroyAndBuildFunction}>
          {visible ? "Destroy" : "Build"}
        </button>
        <DropDown
          operation={operation}
          handleChangedOperation={handleChangedOperation}
        />
      </div>
      {visible && <Editor operation={operation} />}
    </div>
  );
};

export default App;
