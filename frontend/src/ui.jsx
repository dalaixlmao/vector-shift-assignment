// ui.jsx
// Provides the main React Flow canvas for node and edge management.
// Purpose: Enables interactive graph editing and visualization, where nodes can be added, connected, and manipulated by the user.

import { useEffect } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import {
  SearchNode,
  TranslationNode,
  CodeGenerationNode,
  DataVisualizationNode,
  AIAssistantNode,
  LLMNode,
  InputNode,
  TextNode,
  OutputNode,
} from "./components/repo";
import "reactflow/dist/style.css";
import { ConnectionLineType, BackgroundVariant } from "reactflow";

// Defines the custom node types that will be used in the React Flow canvas
const nodeTypes = {
  input: InputNode, // Input node type
  llm: LLMNode, // LLM node type
  text: TextNode, // Text node type
  output: OutputNode, // Output node type
  search: SearchNode, // Search node type
  translation: TranslationNode, // Translation node type
  "code-generation": CodeGenerationNode, // Code generation node type
  "data-visualization": DataVisualizationNode, // Data visualization node type
  "ai-assistant": AIAssistantNode, // AI assistant node type
};

// PipelineUI Component
// Displays the interactive React Flow canvas with the nodes and edges.
// It connects the state with the main flow visualization, allowing the user to interact with nodes and edges.
// Props:
// - setNodes: A function to update the list of nodes in the parent component.
// - setEdges: A function to update the list of edges in the parent component.
export const PipelineUI = ({ setNodes, setEdges }) => {
  // Destructuring to get the state and actions from the global store
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  // Effect hook to update the parent component whenever nodes or edges change
  useEffect(() => {
    setNodes(nodes.map((node) => node.id)); // Updates the node ids in the parent
    setEdges(edges.map((edge) => [edge.source, edge.target])); // Updates the edge connections in the parent
  }, [nodes, edges, setNodes, setEdges]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange} 
        onConnect={onConnect} 
        nodeTypes={nodeTypes} 
        connectionLineType={ConnectionLineType.SmoothStep} 
      >
        <Controls /> {/* Displays zoom and pan controls on the canvas */}
        <Background color="#f4f4f4" variant={BackgroundVariant.Dots} /> {/* Adds a dotted background to the canvas */}
      </ReactFlow>
    </div>
  );
};

// Input Component
// A flexible component that renders different types of input fields (text, textarea, or dropdown).
// Props:
// - type: Specifies the type of input (e.g., text, dropdown, textarea).
// - options: Array of options for dropdowns (only applicable for "dropdown" type).
// - onChange: Function to handle changes in input values.
// - defaultValue: The default value for the input field.
// - label: The label to be displayed above the input field.
export function Input({ type, options, onChange, defaultValue, label }) {
  // Adjusts the size of the textarea based on its content
  const handleTextareaResize = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.width = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on scrollHeight
    const lines = textarea.value.split("\n");
    const longestLine = Math.max(...lines.map((line) => line.length));
    const charWidth = 7.5; // Approximate character width for resizing
    textarea.style.width = `${Math.max(200, longestLine * charWidth)}px`; // Adjust width based on longest line
  };

  if (type === "dropdown") {
    return (
      <div className="w-full">
        <label className="block w-full text-sm font-medium">{label}</label>
        <select
          value={defaultValue}
          onChange={onChange}
          className=" mt-2 py-1 bg-white/10 text-sm placeholder:text-white/30 w-full rounded-md"
        >
          {options.map((option, index) => (
            <option key={index} className="text-black">
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="min-h-12 min-w-12">
        <label className="block text-sm font-medium">{label}</label>
        <textarea
          placeholder={defaultValue}
          onChange={(e) => {
            onChange(e);
            handleTextareaResize(e); // Adjust the textarea size
          }}
          onInput={handleTextareaResize} // Resize textarea on input change
          className="mt-2 py-1 max-h-48 max-w-48 border border-transparent bg-white/10 px-2 text-sm placeholder:text-white/30 w-full rounded-md"
          rows={1}
          style={{
            resize: "none",
            overflow: "hidden",
            height: "auto",
            width: "200px",
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={defaultValue}
        onChange={onChange}
        className="mt-2 py-1 bg-white/10 px-2 text-sm placeholder:text-white/30 w-full rounded-md"
      />
    </div>
  );
}
