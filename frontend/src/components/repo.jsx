import React, { useState, useEffect } from "react";
import { Position } from "reactflow";
import Node from "./node";

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
  const [sourceLanguage, setSourceLanguage] = useState(
    data?.sourceLanguage || "English"
  );
  const [targetLanguage, setTargetLanguage] = useState(
    data?.targetLanguage || "Spanish"
  );
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
  const [assistantType, setAssistantType] = useState(
    data?.assistantType || "General"
  );
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

export const InputNode = ({ id, data }) => {
  const [inputName, setInputName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <Node
      id={id}
      type="input"
      title="Input"
      handles={[{ type: "source", position: Position.Right, suffix: "value" }]}
      fields={[
        {
          label: "Name:",
          type: "text",
          defaultValue: inputName,
          onChange: (e) => setInputName(e.target.value),
        },
        {
          label: "Type:",
          type: "dropdown",
          defaultValue: inputType,
          options: ["Text", "File"],
          onChange: (e) => setInputType(e.target.value),
        },
      ]}
    />
  );
};

export const LLMNode = ({ id, data }) => {
  return (
    <Node
      id={id}
      type="llm"
      title="LLM"
      handles={[
        {
          type: "target",
          position: Position.Left,
          suffix: "system",
          style: { top: "33%" },
        },
        {
          type: "target",
          position: Position.Left,
          suffix: "prompt",
          style: { top: "66%" },
        },
        { type: "source", position: Position.Right, suffix: "response" },
      ]}
      fields={[
        {
          label: "Info:",
          type: "text",
          defaultValue: "This is an LLM.",
          readOnly: true,
        },
      ]}
    />
  );
};

export const OutputNode = ({ id, data }) => {
  const [outputName, setOutputName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <Node
      id={id}
      type="output"
      title="Output"
      handles={[{ type: "target", position: Position.Left, suffix: "value" }]}
      fields={[
        {
          label: "Name:",
          type: "text",
          defaultValue: outputName,
          onChange: (e) => setOutputName(e.target.value),
        },
        {
          label: "Type:",
          type: "dropdown",
          defaultValue: outputType,
          options: ["Text", "File"],
          onChange: (e) => setOutputType(e.target.value),
        },
      ]}
    />
  );
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data.text || "");
  const [handles, setHandles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 50 });
  const updateDimensions = (newText) => {
    const lines = newText.split("\n").length;
    const longestLine = Math.max(
      ...newText.split("\n").map((line) => line.length)
    );
    setDimensions({
      width: Math.max(200, longestLine * 8), 
      height: Math.max(50, lines * 20), 
    });
  };

  const extractVariables = (input) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
      variables.push(match[1]);
    }
    return variables;
  };

  useEffect(() => {
    const variables = extractVariables(text);
    const uniqueHandles = [...new Set(variables)]; 
    setHandles(uniqueHandles);
    updateDimensions(text);
  }, [text]);

  return (
    <Node
      id={id}
      type={"text"}
      title={"Text"}
      handles={handles.map((h, index) => {
        return { type: "target", position: Position.Left, suffix: "value" };
      })}
      fields={[
        {
          label: "Enter the text",
          type: "textarea",
          defaultValue: "Enter the text",
          onChange: (e) => {
            setText(e.target.value);
          },
        },
      ]}
    />
  );
};
