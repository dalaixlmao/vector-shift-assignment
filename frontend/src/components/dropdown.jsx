import { useState } from "react";
import { DownArrow } from "../icons";

const buttons = ["Input", "LLM", "Output", "Text"];

export default function DropDown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="transition-all">
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="hover:bg-gray-100 transition-all px-3 py-2 rounded-lg border border-transparent hover:border hover:border-black/30 flex flex-row items-center"
      >
        <div>Select Action</div>
        <div className="ml-2">
          <DownArrow />
        </div>
      </button>
      {open && (
        <div className="flex flex-col items-start bg-black/10 px-3 py-2 transition-all rounded-xl w-fit">
          {buttons.map((b, index) => {
            return <button className="hover:bg-black/10 transition-all rounded-lg px-3 w-full">{b}</button>;
          })}
        </div>
      )}
    </div>
  );
}
