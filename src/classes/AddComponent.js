import { MyNode } from "../components/MyNode";
import NumControl from "../components/NumControl";
import Rete from "rete";

export default class AddComponent extends Rete.Component {
  operation = "";
  numSocket = null;
  constructor(operation, numSocket) {
    /** result node title   */
    if (operation === "*") {
      super("MULTIPLICATION");
    } else {
      super("ADDITION");
    }
    this.data.component = MyNode; // optional
    this.operation = operation;
    this.numSocket = numSocket;
  }

  builder(node) {
    var inp1 = new Rete.Input("num1", "Number1", this.numSocket);
    var inp2 = new Rete.Input("num2", "Number2", this.numSocket);
    var inp3 = new Rete.Input("num3", "Number3", this.numSocket);
    var out = new Rete.Output("num", "Result", this.numSocket);

    inp1.addControl(new NumControl(this.editor, "num1", node));
    inp2.addControl(new NumControl(this.editor, "num2", node));
    inp3.addControl(new NumControl(this.editor, "num3", node));

    return node
      .addInput(inp1)
      .addInput(inp2)
      .addInput(inp3)
      .addControl(new NumControl(this.editor, "preview", node, true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
    var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
    var n3 = inputs["num3"].length ? inputs["num3"][0] : node.data.num3;
    let sum = null;
    /** sum based on operation */
    if (this.operation === "*") {
      sum = n1 * n2 * n3;
    } else {
      sum = n1 + n2 + n3;
    }

    this.editor.nodes
      .find((n) => n.id === node.id)
      .controls.get("preview")
      .setValue(sum);
    outputs["num"] = sum;
  }
}
