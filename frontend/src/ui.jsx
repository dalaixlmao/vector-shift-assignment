import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { ConnectionLineType, BackgroundVariant } from "reactflow";
import "reactflow/dist/style.css";
import {
  SearchNode,
  TranslationNode,
  CodeGenerationNode,
  DataVisualizationNode,
  AIAssistantNode,
} from "./components/repo";

// Define custom node types
const nodeTypes = {
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
      nodes.map((n) => {
        return n.id;
      })
    );
    setEdges(
      edges.map((e) => {
        return [e.source, e.target];
      })
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
        connectionLineType={ConnectionLineType.Straight}
      >
        <Controls />
        <Background color="#f4f4f4" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

export function Input({ type, options, onChange, defaultValue, label }) {
  console.log(options);
  if (type == "dropdown") {
    return (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        <select
          value={defaultValue}
          onChange={onChange}
          className="mt-2 py-1 bg-white/10 text-sm placeholder:text-white/30 w-full rounded-md"
        >
          {options.map((o, index) => {
            return (
              <option key={index} className="text-black">
                {o}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else if (type == "text") {
    return (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        <input
          placeholder={defaultValue}
          onChange={onChange}
          type="text"
          className="mt-2 py-1 bg-white/10 px-2 text-sm placeholder:text-white/30 w-full rounded-md"
        />
      </div>
    );
  } else if (type == "file") {
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        placeholder={defaultValue}
        onChange={onChange}
        type="text"
        className="mt-2 py-1 bg-white/10 px-2 text-sm placeholder:text-white/30 w-full rounded-md"
      />
    </div>;
  } else {
    return (
      <div className="rounded-full px-3 py-2 bg-red-700/50 backdrop-blur text-white">
        Recheck input type
      </div>
    );
  }
}
