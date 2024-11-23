// App.jsx
// Main application component that integrates the pipeline UI, toolbar, and submit button.
// Purpose: Handles the user interface for pipeline creation and submission.
// Dependencies: React, axios, PipelineToolbar, PipelineUI, SubmitButton.


import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { useState } from "react";
import axios from "axios";

function App() {
  // State to manage the nodes and edges of the pipeline
  const [nodes, setNodes] = useState();
  const [edges, setEdges] = useState();

  // Function to handle submission of the pipeline data
  async function onClick() {
    console.log("Nodes = ", nodes);
    console.log("Edges = ", edges);

    // Send nodes and edges data to the backend for validation
    const res = await axios.post(
      "https://vectorshift-backend.ddns.net/",
      { nodes, edges }
    );
    console.log(res.data); // Debug: Output backend response

    // Alert box for responding on submit
    alert(
      res.data.is_dag === true
        ? `DAG exists with number of nodes=${res.data.num_nodes} and number of edges=${res.data.num_edges}`
        : `DAG does not exists, cycle detected with number of nodes=${res.data.num_nodes} and number of edges=${res.data.num_edges}`
    );
  }
  return (
    <div className="w-screen bg-gradient-to-b from-indigo-950 to-black">
      <PipelineToolbar />
      <PipelineUI setNodes={setNodes} setEdges={setEdges} />
      <SubmitButton onClick={onClick} />
    </div>
  );
}

export default App;
