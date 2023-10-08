/** imports  */
import { useState, useEffect, useRef } from "react";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";

import NumComponent from "../classes/NumComponent";
import AddComponent from "../classes/AddComponent";
/** socket initialization  */

var numSocket = new Rete.Socket("Number value");
/** editor  creation function takes the container and the operation to further pass it  */

async function createEditor(container, operation) {
  /** class instance components that will be created for this editor with their params */

  var components = [
    new NumComponent(numSocket),
    new AddComponent(operation, numSocket),
  ];
  /** editor instantiation  */

  var editor = new Rete.NodeEditor("demo@0.1.0", container);
  /** editor middleware connections  */

  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);
  /** Engine  instantiation  */

  var engine = new Rete.Engine("demo@0.1.0");
  /** registering all components to both engine and editor */

  components.forEach((c) => {
    editor.register(c);
    engine.register(c);
  });
  /** creating different nodes based on the number of components either result Node or Number Node */

  var n1 = await components[0].createNode({ num: 2 });
  var n2 = await components[0].createNode({ num: 3 });
  var n3 = await components[0].createNode({ num: 4 });
  var add = await components[1].createNode();
  /** pixel specific positions */

  n1.position = [80, 200];
  n2.position = [80, 400];
  n3.position = [80, 600];
  add.position = [500, 240];
  /** adding the nodes to the new editor */

  editor.addNode(n1);
  editor.addNode(n2);
  editor.addNode(n3);
  editor.addNode(add);
  /** connecting the nodes with editor their inputs and outputs */

  editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
  editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));
  editor.connect(n3.outputs.get("num"), add.inputs.get("num3"));
  /** editor event listening */

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );
  /** resize new editor trigger new process and effect a zoomAt to not have a small editor  */

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);
  /** return our new editor instance */
  return editor;
}

/** hook call to create our editor based on new container ref */

export function useRete(operation = "") {
  /** state and refs  */

  const [container, setContainer] = useState(null);
  const editorRef = useRef();
  /** in the event of two editors requested  */
  const numberOfEditors = useRef(0);

  /** onMount and onUnmount effects  */

  useEffect(() => {
    if (container && numberOfEditors.current < 2) {
      createEditor(container, operation).then((value) => {
        console.log("created");
        editorRef.current = value;
        numberOfEditors.current++;
      });

      return () => {
        if (editorRef.current) {
          console.log("destroy");
          editorRef.current.destroy();
        }
      };
    }
  }, [container, operation]);

  /** return setContainer state mutation for parent component to add ref */
  return [setContainer];
}
