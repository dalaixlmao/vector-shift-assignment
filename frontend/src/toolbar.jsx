import React from 'react';
import { useStore } from './store';

// Toolbar for adding new nodes
export const PipelineToolbar = () => {
  const { addNode } = useStore();

  const nodeTypes = [
    'search', 
    'translation', 
    'code-generation', 
    'data-visualization', 
    'ai-assistant'
  ];

  return (
    <div style={{ 
      display: 'flex', 
      marginBottom: '10px', 
      gap: '30px' 
    }} className='absolute w-screen h-screen top-5 fixed left-5'>
      {nodeTypes.map((type) => (
        <button 
          key={type} 
          onClick={() => addNode(type)}
          className='z-10 bg-gradient-to-r h-fit from-violet-900 to-blue-600 text-xs text-white font-semibold border-t-[1px] border-blue-500 hover:from-violet-950 hover:to-blue-600 transition-all px-3 py-2 rounded-full'
        >
          Add {type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Node
        </button>
      ))}
    </div>
  );
};
