import Rete from "rete";
import NumControl from "../components/NumControl";

export default class NumComponent extends Rete.Component {
  numSocket = null;
  constructor(numSocket) {
    super("Node");
    this.numSocket = numSocket;
  }

  builder(node) {
    var out1 = new Rete.Output("num", `Number`, this.numSocket);
    var ctrl = new NumControl(this.editor, "num", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
  }
}
