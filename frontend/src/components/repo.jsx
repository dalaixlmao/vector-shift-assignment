// repo.jsx
// This file contains reusable node components for different functionalities within the React Flow workspace.
// Purpose: Defines node-specific UI and logic, including properties, connections, and fields for each type of node.
// Dependencies: React, React Flow's Position, Node component, and various utility functions/constants.

import React, { useState, useEffect } from "react";
import { Position } from "reactflow";
import Node from "./node";

// Reusable constants for connection positions
const positions = {
  left: Position.Left, // Left side connection
  right: Position.Right, // Right side connection
};

// Dropdown options for various field configurations
const dropdownOptions = {
  languages: ["Python", "JavaScript", "Rust"], // Language options for code generation
  levels: ["Basic", "Intermediate", "Advanced"], // Difficulty levels
  chartTypes: ["Bar", "Line", "Pie"], // Chart types for data visualization
  inputTypes: ["Text", "File"], // Input types
  assistantTypes: ["General", "Coding", "Creative"], // AI Assistant types
  translationLanguages: ["English", "Spanish", "French"], // Supported translation languages
};

// Utility function to create a field definition for nodes
const createField = (label, type, defaultValue, options, onChange, readOnly = false) => ({
  label,          // Label for the field
  type,           // Type of input (text, dropdown, textarea)
  defaultValue,   // Default value for the field
  options,        // Dropdown options (if applicable)
  onChange,       // Handler for value change
  readOnly,       // Whether the field is read-only
});


// SearchNode Component
// Represents a node for performing web search operations.
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node, including the search query.
// Features:
// - Allows users to input a search query.
// - Provides a left-side input handle for connecting a data source.
// - Provides a right-side output handle for connecting to the results of the search.
// - Fields:
//   - "Search Query" (text input): Accepts a string query to perform a web search.
export const SearchNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || ""); // Search query state

  return (
    <Node
      id={id}
      type="search"
      title="Web Search" // Title displayed on the node
      handles={[
        { type: "target", position: positions.left, suffix: "query" }, // Input handle for the query
        { type: "source", position: positions.right, suffix: "results" }, // Output handle for the results
      ]}
      fields={[
        createField("Search Query:", "text", query, null, (e) => setQuery(e.target.value)), // Query input field
      ]}
    />
  );
};


// TranslationNode Component
// Represents a node for translating text between languages.
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node, including source and target languages.
// Features:
// - Allows users to specify a source and target language for translation.
// - Provides a left-side input handle for receiving text to translate.
// - Provides a right-side output handle for the translated text.
// - Fields:
//   - "Primary Language" (dropdown): Select the source language.
//   - "Translated Language" (dropdown): Select the target language.
export const TranslationNode = ({ id, data }) => {
  const [sourceLanguage, setSourceLanguage] = useState(data?.sourceLanguage || "English"); // Source language state
  const [targetLanguage, setTargetLanguage] = useState(data?.targetLanguage || "Spanish"); // Target language state

  return (
    <Node
      id={id}
      type="translation"
      title="Language Translation" // Title displayed on the node
      handles={[
        { type: "target", position: positions.left, suffix: "input-text" }, // Input handle for text
        { type: "source", position: positions.right, suffix: "translated-text" }, // Output handle for translated text
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
// Represents a node for generating code based on user input.
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node, including language and complexity level.
// Features:
// - Allows users to select a programming language and a difficulty level for code generation.
// - Provides a left-side input handle for receiving a code generation prompt.
// - Provides a right-side output handle for the generated code.
// - Fields:
//   - "Languages" (dropdown): Select the programming language for code generation.
//   - "Level" (dropdown): Select the complexity level for the generated code.
export const CodeGenerationNode = ({ id, data }) => {
  const [language, setLanguage] = useState(data?.language || "Python"); // Programming language state
  const [complexity, setComplexity] = useState(data?.complexity || "Basic"); // Complexity level state

  return (
    <Node
      id={id}
      type="code-generation"
      title="Code Generator" // Title displayed on the node
      handles={[
        { type: "target", position: positions.left, suffix: "prompt" }, // Input handle for prompt
        { type: "source", position: positions.right, suffix: "generated-code" }, // Output handle for code
      ]}
      fields={[
        createField("Languages:", "dropdown", language, dropdownOptions.languages, (e) => setLanguage(e.target.value)),
        createField("Level:", "dropdown", complexity, dropdownOptions.levels, (e) => setComplexity(e.target.value)),
      ]}
    />
  );
};

// DataVisualizationNode Component
// Represents a node for visualizing data using charts.
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node, including the chart type.
// Features:
// - Allows users to select the type of chart for data visualization.
// - Provides a left-side input handle for receiving data to visualize.
// - Provides a right-side output handle for the generated chart.
// - Fields:
//   - "Chart Type" (dropdown): Select the type of chart (e.g., Bar, Line, Pie).
export const DataVisualizationNode = ({ id, data }) => {
  const [chartType, setChartType] = useState(data?.chartType || "Bar"); // Chart type state

  return (
    <Node
      id={id}
      type="data-visualization"
      title="Data Visualizer" // Title displayed on the node
      handles={[
        { type: "target", position: positions.left, suffix: "input-data" }, // Input handle for data
        { type: "source", position: positions.right, suffix: "visualization" }, // Output handle for visualization
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

// LLMNode Component
// Represents a node for a Large Language Model (LLM).
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node (if any).
// Features:
// - Provides left-side input handles for system and user prompts.
// - Provides a right-side output handle for the LLM response.
// - Fields:
//   - "Info" (read-only): Displays static information about the LLM.
export const LLMNode = ({ id, data }) => {
  return (
    <Node
      id={id}
      type="llm"
      title="LLM" // Title displayed on the node
      handles={[
        { type: "target", position: Position.Left, suffix: "system" }, // Input handle for system input
        { type: "target", position: Position.Left, suffix: "prompt" }, // Input handle for user prompt
        { type: "source", position: Position.Right, suffix: "response" }, // Output handle for LLM response
      ]}
      fields={[
        { label: "Info:", type: "text", defaultValue: "This is an LLM.", readOnly: true }, // Static information field
      ]}
    />
  );
};

// AIAssistantNode Component
// Represents a node for configuring an AI Assistant.
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node, including the assistant type.
// Features:
// - Allows users to select the type of AI Assistant (e.g., General, Coding, Creative).
// - Provides left-side input handles for system and user prompts.
// - Provides a right-side output handle for the assistant's response.
// - Fields:
//   - "Assistant Type" (dropdown): Select the type of AI Assistant.
export const AIAssistantNode = ({ id, data }) => {
  const [assistantType, setAssistantType] = useState(data?.assistantType || "General"); // Assistant type state

  return (
    <Node
      id={id}
      type="ai-assistant"
      title="AI Assistant" // Title displayed on the node
      handles={[
        { type: "target", position: Position.Left, suffix: "system-prompt" }, // Input handle for system prompt
        { type: "target", position: Position.Left, suffix: "user-prompt" }, // Input handle for user prompt
        { type: "source", position: Position.Right, suffix: "response" }, // Output handle for assistant response
      ]}
      fields={[
        {
          label: "Assistant Type",
          type: "dropdown",
          defaultValue: assistantType,
          options: dropdownOptions.assistantTypes,
          onChange: (e) => setAssistantType(e.target.value),
        },
      ]}
    />
  );
};

// InputOutputNode Component
// A reusable node component for both input and output functionalities in the flow.
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node, including name and type.
// - type: Specifies whether the node is an "input" or "output" node.
// - title: Title displayed on the node (e.g., "Input" or "Output").
// - handles: Array of connection handles for the node (e.g., source or target).
// - defaultName: Default prefix for the node's name (e.g., "customInput-" or "customOutput-").
// - defaultType: Default data type for the node (e.g., "Text").
// Features:
// - Provides a field for the node's name, allowing users to customize it.
// - Provides a dropdown to select the data type (e.g., "Text", "File").
// - Handles are dynamically rendered based on the `handles` prop.
const InputOutputNode = ({ id, data, type, title, handles, defaultName, defaultType }) => {
  const [name, setName] = useState(data?.name || id.replace(defaultName, "name_")); // State for the node's name
  const [inputType, setInputType] = useState(data?.type || defaultType); // State for the node's type

  return (
    <Node
      id={id}
      type={type} // Specifies the type of node (input or output)
      title={title} // Title displayed on the node
      handles={handles} // Connection handles for the node
      fields={[
        // Field for entering or modifying the node's name
        createField("Name:", "text", name, null, (e) => setName(e.target.value)),
        // Dropdown field for selecting the node's type
        createField("Type:", "dropdown", inputType, dropdownOptions.inputTypes, (e) => setInputType(e.target.value)),
      ]}
    />
  );
};


// InputNode Component
// Represents an input node that acts as a starting point in the flow, providing data to other nodes.
// Props:
// - props: Additional properties passed to the node.
// Features:
// - Default name and type set as "customInput-" and "Text", respectively.
// - Output handle on the right side to connect with other nodes.
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

// OutputNode Component
// Represents an output node that collects data from other nodes and typically marks the end of the flow.
// Props:
// - props: Additional properties passed to the node.
// Features:
// - Default name and type set as "customOutput-" and "Text", respectively.
// - Input handle on the left side to receive connections from other nodes.
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
// Represents a node that handles and displays dynamic text, potentially with variables.
// Props:
// - id: Unique identifier for the node.
// - data: Initial data for the node, including text content.
// Features:
// - Parses and extracts variables enclosed in `{{ }}` from the text.
// - Dynamically updates input handles based on detected variables.
// - Allows the user to modify the text content via a textarea field.
// - Includes a static output handle on the right side.
export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || ""); // State for text content
  const [handles, setHandles] = useState([]); // State for dynamically generated input handles

  // Updates the handles and dimensions based on the detected variables in the text
  const updateHandlesAndDimensions = (newText) => {
    const variables = [...new Set(newText.match(/{{\s*([\w$]+)\s*}}/g)?.map((v) => v.slice(2, -2)) || [])]; // Extract variables
    const dynamicHandles = variables.map((varName) => ({
      type: "target",
      position: positions.left,
      id: `${id}-${varName}`, // Unique ID for each input handle
      suffix: varName,
    })); // Create handles for each variable on the left side

    // Add a static output handle
    const staticOutputHandle = {
      type: "source",
      position: positions.right,
      id: `${id}-output`, // Unique ID for the source handle
      suffix: "output",
    };

    setHandles([...dynamicHandles, staticOutputHandle]); // Combine dynamic and static handles
  };

  // Recalculate handles whenever the text changes
  useEffect(() => {
    updateHandlesAndDimensions(text);
  }, [text]);

  // Render the node with dynamic and static handles and a textarea for input
  return (
    <Node
      id={id}
      type="text" // Specifies the node type as text
      title="Text" // Title displayed on the node
      handles={handles} // Handles for dynamic variables (left) and static output (right)
      fields={[
        createField("Enter the text", "textarea", text, null, (e) => setText(e.target.value)), // Text input field
      ]}
    />
  );
};
