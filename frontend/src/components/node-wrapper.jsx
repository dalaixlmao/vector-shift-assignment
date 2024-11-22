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
      className={`text-white bg-violet-900 relative flex flex-col gap-2 pt-2 rounded-lg h-full`}
    >
      <div className="px-2 font-medium pb-1">
        {title || type}
      </div>
      <div className="text-sm py-2 font-light h-full rounded-lg px-4 pb-4 bg-violet-950">
        {renderHandles()}
        {children}
      </div>
    </div>
  );
}
