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
  OutputNode
} from "./components/repo";
import "reactflow/dist/style.css";
import { ConnectionLineType, BackgroundVariant } from "reactflow";

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  text: TextNode,
  output: OutputNode,
  search: SearchNode,
  translation: TranslationNode,
  "code-generation": CodeGenerationNode,
  "data-visualization": DataVisualizationNode,
  "ai-assistant": AIAssistantNode,
};

export const PipelineUI = ({ setNodes, setEdges }) => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  useEffect(() => {
    setNodes(
      nodes.map((node) => node.id)
    );
    setEdges(
      edges.map((edge) => [edge.source, edge.target])
    );
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
        <Controls />
        <Background color="#f4f4f4" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

export function Input({ type, options, onChange, defaultValue, label }) {
  const handleTextareaResize = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.width = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    const lines = textarea.value.split("\n");
    const longestLine = Math.max(...lines.map((line) => line.length));
    const charWidth = 7.5; 
    textarea.style.width = `${Math.max(200, longestLine * charWidth)}px`;
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
            handleTextareaResize(e);
          }}
          onInput={handleTextareaResize}
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
