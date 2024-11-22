import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { useState } from "react";
import axios from "axios";

function App() {
  const [nodes, setNodes] = useState();
  const [edges, setEdges] = useState();
   async function onClick(){
    console.log("Nodes = ",nodes);
    console.log("Edges = ",edges);
    const res = await axios.post("http://127.0.0.1:8000/pipelines/parse", {nodes, edges});
    console.log(res.data);
  }
  return (
    <div className="w-screen bg-black">
      <PipelineToolbar />
      <PipelineUI setNodes={setNodes} setEdges={setEdges}/>
      <SubmitButton onClick={onClick}/>
    </div>
  );
}

export default App;
