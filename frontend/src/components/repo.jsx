import React, { useState, useEffect } from "react";
import { Position } from "reactflow";
import Node from "./node";

// Reusable constants
const positions = {
  left: Position.Left,
  right: Position.Right,
};

const dropdownOptions = {
  languages: ["Python", "JavaScript", "Rust"],
  levels: ["Basic", "Intermediate", "Advanced"],
  chartTypes: ["Bar", "Line", "Pie"],
  inputTypes: ["Text", "File"],
  assistantTypes: ["General", "Coding", "Creative"],
  translationLanguages: ["English", "Spanish", "French"],
};

// Reusable field creation utility
const createField = (label, type, defaultValue, options, onChange, readOnly = false) => ({
  label,
  type,
  defaultValue,
  options,
  onChange,
  readOnly,
});

// SearchNode Component
export const SearchNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || "");

  return (
    <Node
      id={id}
      type="search"
      title="Web Search"
      handles={[
        { type: "target", position: positions.left, suffix: "query" },
        { type: "source", position: positions.right, suffix: "results" },
      ]}
      fields={[
        createField("Search Query:", "text", query, null, (e) => setQuery(e.target.value)),
      ]}
    />
  );
};

// TranslationNode Component
export const TranslationNode = ({ id, data }) => {
  const [sourceLanguage, setSourceLanguage] = useState(data?.sourceLanguage || "English");
  const [targetLanguage, setTargetLanguage] = useState(data?.targetLanguage || "Spanish");

  return (
    <Node
      id={id}
      type="translation"
      title="Language Translation"
      handles={[
        { type: "target", position: positions.left, suffix: "input-text" },
        { type: "source", position: positions.right, suffix: "translated-text" },
      ]}
      fields={[
        createField(
          "Primary Language",
          "dropdown",
          sourceLanguage,
          dropdownOptions.translationLanguages,
          (e) => setSourceLanguage(e.target.value)
        ),
        createField(
          "Translated Language",
          "dropdown",
          targetLanguage,
          dropdownOptions.translationLanguages,
          (e) => setTargetLanguage(e.target.value)
        ),
      ]}
    />
  );
};

// CodeGenerationNode Component
export const CodeGenerationNode = ({ id, data }) => {
  const [language, setLanguage] = useState(data?.language || "Python");
  const [complexity, setComplexity] = useState(data?.complexity || "Basic");

  return (
    <Node
      id={id}
      type="code-generation"
      title="Code Generator"
      handles={[
        { type: "target", position: positions.left, suffix: "prompt" },
        { type: "source", position: positions.right, suffix: "generated-code" },
      ]}
      fields={[
        createField("Languages:", "dropdown", language, dropdownOptions.languages, (e) => setLanguage(e.target.value)),
        createField("Level:", "dropdown", complexity, dropdownOptions.levels, (e) => setComplexity(e.target.value)),
      ]}
    />
  );
};

// DataVisualizationNode Component
export const DataVisualizationNode = ({ id, data }) => {
  const [chartType, setChartType] = useState(data?.chartType || "Bar");

  return (
    <Node
      id={id}
      type="data-visualization"
      title="Data Visualizer"
      handles={[
        { type: "target", position: positions.left, suffix: "input-data" },
        { type: "source", position: positions.right, suffix: "visualization" },
      ]}
      fields={[
        createField(
          "Chart Type:",
          "dropdown",
          chartType,
          dropdownOptions.chartTypes,
          (e) => setChartType(e.target.value)
        ),
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
        { type: "target", position: Position.Left, suffix: "system" },
        { type: "target", position: Position.Left, suffix: "prompt" },
        { type: "source", position: Position.Right, suffix: "response" },
      ]}
      fields={[
        { label: "Info:", type: "text", defaultValue: "This is an LLM.", readOnly: true },
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




// Reusable Input/Output Node Components
const InputOutputNode = ({ id, data, type, title, handles, defaultName, defaultType }) => {
  const [name, setName] = useState(data?.name || id.replace(defaultName, "name_"));
  const [inputType, setInputType] = useState(data?.type || defaultType);

  return (
    <Node
      id={id}
      type={type}
      title={title}
      handles={handles}
      fields={[
        createField("Name:", "text", name, null, (e) => setName(e.target.value)),
        createField("Type:", "dropdown", inputType, dropdownOptions.inputTypes, (e) => setInputType(e.target.value)),
      ]}
    />
  );
};

export const InputNode = (props) => (
  <InputOutputNode
    {...props}
    type="input"
    title="Input"
    handles={[{ type: "source", position: positions.right, suffix: "value" }]}
    defaultName="customInput-"
    defaultType="Text"
  />
);

export const OutputNode = (props) => (
  <InputOutputNode
    {...props}
    type="output"
    title="Output"
    handles={[{ type: "target", position: positions.left, suffix: "value" }]}
    defaultName="customOutput-"
    defaultType="Text"
  />
);

// TextNode Component
export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [handles, setHandles] = useState([]);

  const updateHandlesAndDimensions = (newText) => {
    const variables = [...new Set(newText.match(/{{\s*([\w$]+)\s*}}/g)?.map((v) => v.slice(2, -2)) || [])];
    setHandles(variables.map((varName) => ({ type: "target", position: positions.left, suffix: varName })));
  };

  useEffect(() => {
    updateHandlesAndDimensions(text);
  }, [text]);

  return (
    <Node
      id={id}
      type="text"
      title="Text"
      handles={handles}
      fields={[
        createField("Enter the text", "textarea", text, null, (e) => setText(e.target.value)),
      ]}
    />
  );
};
