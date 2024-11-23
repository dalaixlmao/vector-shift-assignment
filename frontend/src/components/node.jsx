// Node Component
// A generic and reusable component for rendering individual nodes in the flow.
// Props:
// - id: Unique identifier for the node.
// - type: Specifies the type of node (e.g., "input", "output", "text").
// - title: Title displayed on the node, typically describing its functionality.
// - handles: Array of connection handles for the node, passed to the NodeWrapper for rendering.
// - fields: Array of input fields to be rendered inside the node, where each field specifies:
//   - label: The label for the input field.
//   - type: The type of the input field (e.g., "text", "dropdown", "textarea").
//   - defaultValue: The default value for the input field.
//   - options: Available options for dropdown fields (if applicable).
//   - onChange: Handler function to capture input changes.
// Features:
// - Utilizes the NodeWrapper component to provide a consistent layout for all node types.
// - Dynamically renders input fields based on the `fields` prop, using the `Input` component for each field.
// - Ensures modularity and reusability by abstracting field rendering and layout logic.

import React from "react";
import NodeWrapper from "./node-wrapper";
import { Input } from "../ui";

export default function Node({ id, type, title, handles, fields }) {
  return (
    <NodeWrapper id={id} type={type} title={title} handles={handles}>
      <div className="flex gap-2 flex-col items-start w-full text-left">
        {fields.map(({ label, type, defaultValue, options, onChange }, idx) => (
          <Input
            key={idx}
            label={label}
            type={type}
            defaultValue={defaultValue}
            options={options}
            onChange={onChange}
          />
        ))}
      </div>
    </NodeWrapper>
  );
}
