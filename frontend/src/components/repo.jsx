import React, { useState } from "react";
import { Position } from "reactflow";
import NodeWrapper from "./node-wrapper";
import Node from "./node";


// Specific Node Implementations
export const SearchNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || "");
  return (
    <Node
      id={id}
      type="search"
      title="Web Search"
      handles={[
        { type: "target", position: Position.Left, suffix: "query" },
        { type: "source", position: Position.Right, suffix: "results" },
      ]}
      fields={[
        {
          label: "Search Query:",
          type: "text",
          defaultValue: query,
          onChange: (e) => setQuery(e.target.value),
        },
      ]}
    />
  );
};

export const TranslationNode = ({ id, data }) => {
  const [sourceLanguage, setSourceLanguage] = useState(data?.sourceLanguage || "English");
  const [targetLanguage, setTargetLanguage] = useState(data?.targetLanguage || "Spanish");
  return (
    <Node
      id={id}
      type="translation"
      title="Language Translation"
      handles={[
        { type: "target", position: Position.Left, suffix: "input-text" },
        { type: "source", position: Position.Right, suffix: "translated-text" },
      ]}
      fields={[
        {
          label: "Primary Language",
          type: "dropdown",
          defaultValue: sourceLanguage,
          options: ["English", "Spanish", "French"],
          onChange: (e) => setSourceLanguage(e.target.value),
        },
        {
          label: "Translated Language",
          type: "dropdown",
          defaultValue: targetLanguage,
          options: ["Spanish", "English", "French"],
          onChange: (e) => setTargetLanguage(e.target.value),
        },
      ]}
    />
  );
};

export const CodeGenerationNode = ({ id, data }) => {
  const [language, setLanguage] = useState(data?.language || "Python");
  const [complexity, setComplexity] = useState(data?.complexity || "Basic");
  return (
    <Node
      id={id}
      type="code-generation"
      title="Code Generator"
      handles={[
        { type: "target", position: Position.Left, suffix: "prompt" },
        { type: "source", position: Position.Right, suffix: "generated-code" },
      ]}
      fields={[
        {
          label: "Languages:",
          type: "dropdown",
          defaultValue: language,
          options: ["Python", "JavaScript", "Rust"],
          onChange: (e) => setLanguage(e.target.value),
        },
        {
          label: "Level:",
          type: "dropdown",
          defaultValue: complexity,
          options: ["Basic", "Intermediate", "Advanced"],
          onChange: (e) => setComplexity(e.target.value),
        },
      ]}
    />
  );
};

export const DataVisualizationNode = ({ id, data }) => {
  const [chartType, setChartType] = useState(data?.chartType || "Bar");
  return (
    <Node
      id={id}
      type="data-visualization"
      title="Data Visualizer"
      handles={[
        { type: "target", position: Position.Left, suffix: "input-data" },
        { type: "source", position: Position.Right, suffix: "visualization" },
      ]}
      fields={[
        {
          label: "Chart Type:",
          type: "dropdown",
          defaultValue: chartType,
          options: ["Bar", "Line", "Pie"],
          onChange: (e) => setChartType(e.target.value),
        },
      ]}
    />
  );
};

export const AIAssistantNode = ({ id, data }) => {
  const [assistantType, setAssistantType] = useState(data?.assistantType || "General");
  return (
    <Node
      id={id}
      type="ai-assistant"
      title="AI Assistant"
      handles={[
        { type: "target", position: Position.Left, suffix: "system-prompt" },
        { type: "target", position: Position.Left, suffix: "user-prompt" },
        { type: "source", position: Position.Right, suffix: "response" },
      ]}
      fields={[
        {
          label: "Assistant Type",
          type: "dropdown",
          defaultValue: assistantType,
          options: ["General", "Coding", "Creative"],
          onChange: (e) => setAssistantType(e.target.value),
        },
      ]}
    />
  );
};

export default NodeWrapper;
