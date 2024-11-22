// submit.js

export const SubmitButton = ({onClick}) => {
    return (
      <div className="absolute bottom-10 w-screen left-0 flex flex-col items-center fixed">
          <button
          onClick={onClick}
          className="bg-gradient-to-r text-xl   from-violet-900 to-blue-600 text-white font-semibold border-t-[1px] border-blue-500 hover:from-violet-950 hover:to-blue-600 transition-all px-3 py-2 rounded-full"
        >
        Submit
        </button>
      </div>
        
    );
  };
  