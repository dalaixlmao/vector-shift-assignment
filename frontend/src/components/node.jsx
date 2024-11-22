import React from "react";
import NodeWrapper from "./node-wrapper";
import { Input } from "../ui";
import { TextNode } from "../nodes/textNode"; // Import the TextNode

export default function Node({ id, type, title, handles, fields }) {
  // Render the TextNode if type is 'text'

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
