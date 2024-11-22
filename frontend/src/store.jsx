import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  ConnectionLineType,
} from "reactflow";

// Initial nodes configuration
const initialNodes = [];

// Initial edges configuration

export const useStore = create((set, get) => ({
  // Nodes and edges state
  nodes: [],
  edges: [],

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
          type: "smoothstep",
          animated: true,
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
        y: Math.random() * 500,
      },
      data: {},
    };
    set({
      nodes: [...get().nodes, newNode],
    });
  },
}));
