import React, { useState } from "react";
import { useStore } from "./store";
import { DownArrow } from "./icons";

export const PipelineToolbar = () => {
  const { addNode } = useStore();
  const [open, setOpen] = useState(false);

  const nodeTypes = [
    "input",
    "llm",
    "text",
    "output",
    "search",
    "translation",
    "code-generation",
    "data-visualization",
    "ai-assistant",
  ];

  return (
    <div className="absolute top-5 left-5 z-10 flex gap-4">
      <div
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
        className="cursor-pointer hover:text-violet-500 hover:border border border-transparent hover:backdrop-blur px-3 py-2 transition-all rounded-xl text-white flex flex-row items-center"
      >
        Select node type{" "}
        <div className={"ml-2"}>
          <div
            className={(open ? "rotate-180" : "rotate-0") + " transition-all"}
          >
            <DownArrow />
          </div>
        </div>
      </div>
      {open && (
        <div
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
          className="w-full bg-gradient-to-t from-indigo-950 py-3 to-black flex flex-col backdrop-blur-sm items-start rounded-xl text-white px-2 py-1 absolute top-10 left-10 bg-white/10 border border-t-blue-500/50 border-b-[1px] border-b-white/30 border-x-violet-500/50"
        >
          {nodeTypes.map((type) => (
            <button
              key={type}
              onClick={() => addNode(type)}
              className="hover:bg-white/10 rounded-lg w-full text-left px-3 py-2 transition-all duration-100 text-xs font-light hover:backdrop-blur"
            >
              Add{" "}
              {type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
              Node
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
