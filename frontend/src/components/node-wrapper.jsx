// NodeWrapper Component
// A reusable wrapper component for nodes in the React Flow workspace.
// Purpose: Provides a consistent layout and structure for nodes, including handles, title, and custom child content.
// Props:
// - id: Unique identifier for the node.
// - type: Type of the node (e.g., "input", "output", etc.).
// - title: Title displayed on the node. Defaults to `type` if not provided.
// - config: Optional configuration object for additional node properties.
// - handles: Array of connection handles for the node, specifying their type, position, and style.
// - children: Custom child elements or components to be rendered inside the node.
// - onDataChange: Callback function for handling data changes (not directly used in this wrapper).
// Features:
// - Dynamically renders input and output handles based on the `handles` prop.
// - Provides a structured layout with a title and a content area for custom components.
// - Handles are positioned dynamically based on their index and configuration.

import { Handle } from "reactflow";


const generateHandleId = (nodeId, handleType, suffix) =>
  `${nodeId}-${handleType}-${suffix}`;

export default function NodeWrapper({
  id,
  type,
  title,
  config = {},
  handles = [],
  children,
  onDataChange,
}) {

  const renderHandles = () => {
    return handles.map((handle, index) => (
      <Handle
        key={`${handle.type}-${handle.position}-${index}`}
        type={handle.type}
        position={handle.position}
        id={handle.id || generateHandleId(id, handle.type, handle.suffix)}
        style={{
          top: handle.top || `${(index + 1) * (100 / (handles.length + 1))}%`,
        }}
        className={`absolute ${handle.style}`}
      />
    ));
  };
  return (
    <div
      className={`text-white border-x-[1.5px] border-violet-500 border-b border-b-white/10 bg-violet-900 relative flex flex-col gap-2 pt-2 rounded-xl h-full`}
    >
      <div className="px-2 font-medium">
        {title || type}
      </div>
      <div className="text-sm py-2 font-light h-full rounded-xl px-4 pb-4 bg-violet-950">
        {renderHandles()}
        {children}
      </div>
    </div>
  );
}
