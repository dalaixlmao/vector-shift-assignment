// PipelineToolbar Component
// This component provides a toolbar that allows users to add various types of nodes to the flow workspace.
// Props: None
// Features:
// - Displays a dropdown menu containing a list of available node types.
// - Dynamically generates buttons for each node type, allowing users to add the selected node to the workspace.
// - The dropdown menu appears on hover and uses animations for a smooth user experience.
// - Integrates with the global store (via `useStore`) to handle adding nodes.
// - Styling dynamically adjusts based on user interactions (hover and open states).

import React, { useState } from "react";
import { useStore } from "./store";
import { DownArrow } from "./icons";

export const PipelineToolbar = () => {
  const { addNode } = useStore(); // Access the `addNode` function from the global store
  const [open, setOpen] = useState(false); // State to manage whether the dropdown menu is open

  // List of node types available for addition
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

  // Render the toolbar with hoverable dropdown
  return (
    <div className="absolute top-5 left-5 z-10 flex gap-4">
      {/* Dropdown trigger area */}
      <div
        onMouseEnter={() => {
          setOpen(true); // Open the dropdown on hover
        }}
        onMouseLeave={() => {
          setOpen(false); // Close the dropdown on mouse leave
        }}
        className={
          "text-sm font-semibold cursor-pointer " + 
          (open ? "text-violet-400 " : "text-white") + 
          " hover:border border border-transparent px-3 py-2 transition-all rounded-xl flex flex-row items-center"
        }
      >
        {/* Dropdown label and icon */}
        Select node type
        <div className={"ml-2"}>
          <div className={(open ? "rotate-180" : "rotate-0") + " transition-all"}>
            <DownArrow /> {/* Down arrow icon with rotation */}
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      {open && (
        <div
          onMouseEnter={() => {
            setOpen(true); // Keep dropdown open when hovered
          }}
          onMouseLeave={() => {
            setOpen(false); // Close dropdown when mouse leaves
          }}
          className="w-full bg-gradient-to-t from-indigo-950 py-3 to-black flex flex-col backdrop-blur-sm items-start rounded-xl text-white px-2 py-1 absolute top-8 left-10 bg-white/10 border border-t-blue-500/50 border-b-[1px] border-b-white/30 border-x-violet-500/50"
        >
          {/* Render a button for each node type */}
          {nodeTypes.map((type) => (
            <button
              key={type} // Unique key for each node type
              onClick={() => addNode(type)} // Call the `addNode` function with the selected type
              className="text-violet-200 font-semibold hover:bg-white/10 rounded-lg w-full text-left px-3 py-2 transition-all duration-100 text-xs font-light hover:backdrop-blur"
            >
              {/* Display the node type with formatted text */}
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
