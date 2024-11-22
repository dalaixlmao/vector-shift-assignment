import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (params) => {
    set({
      edges: addEdge(
        {
          ...params,
          type: "smoothstep",
          animated: true,
          color: "#8b5cf6",
        },
        get().edges
      ),
    });
  },

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
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },
}));
