import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, ConnectionLineType } from 'reactflow';

// Initial nodes configuration
const initialNodes = [
  {
    id: 'search-1',
    type: 'search',
    position: { x: 100, y: 100 },
    data: { query: 'AI research trends' },
  },
  {
    id: 'translation-1',
    type: 'translation',
    position: { x: 400, y: 100 },
    data: { sourceLanguage: 'English', targetLanguage: 'Spanish' },
  },
  {
    id: 'code-gen-1',
    type: 'code-generation',
    position: { x: 700, y: 100 },
    data: { language: 'Python', complexity: 'Intermediate' },
  },
  {
    id: 'data-viz-1',
    type: 'data-visualization',
    position: { x: 100, y: 300 },
    data: { chartType: 'Bar' },
  },
  {
    id: 'ai-assistant-1',
    type: 'ai-assistant',
    position: { x: 400, y: 300 },
    data: { assistantType: 'Creative' },
  },
];

// Initial edges configuration
const initialEdges = [
  {
    id: 'search-to-translation',
    source: 'search-1',
    sourceHandle: 'search-1-results',
    target: 'translation-1',
    targetHandle: 'translation-1-input-text',
    type: ConnectionLineType.Straight,
  },
  {
    id: 'translation-to-code-gen',
    source: 'translation-1',
    sourceHandle: 'translation-1-translated-text',
    target: 'code-gen-1',
    targetHandle: 'code-gen-1-prompt',
    type: ConnectionLineType.Straight,
  },
];

export const useStore = create((set, get) => ({
  // Nodes and edges state
  nodes: initialNodes,
  edges: initialEdges,

  // Update nodes
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Update edges
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // Add new edge
  onConnect: (params) => {
    set({
      edges: addEdge(
        { 
          ...params, 
          type: ConnectionLineType.Straight 
        },
        get().edges
      ),
    });
  },

  // Add a new node
  addNode: (type) => {
    const newNodeId = `${type}-${get().nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type,
      position: { 
        x: Math.random() * 500, 
        y: Math.random() * 500 
      },
      data: {},
    };
    set({
      nodes: [...get().nodes, newNode],
    });
  },
}));
