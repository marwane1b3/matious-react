import React from "react";
import { useRete } from "./rete";
/** passing the parent ref to rete hook  so it can create a new editor */
const Editor = ({ operation = "" }) => {
  const [setContainer] = useRete(operation);

  return <div ref={(ref) => ref && setContainer(ref)} />;
};

export default Editor;
