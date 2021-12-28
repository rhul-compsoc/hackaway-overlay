import { NodeCG } from "../../nodecg/types/server";
import { spotify } from "./spotify";

const main = (nodecg: NodeCG) => {
  spotify(nodecg);
};

export default main;
