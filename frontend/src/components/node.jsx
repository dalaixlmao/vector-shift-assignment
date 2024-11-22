import NodeWrapper from "./node-wrapper";
import { Input } from "../ui";

export default function Node({ id, type, title, handles, fields }) {
  return (
    <NodeWrapper id={id} type={type} title={title} handles={handles}>
      <div className="flex gap-2">
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
