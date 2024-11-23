// store.js
// Zustand store for managing React Flow's node and edge states globally.
// Purpose: Provides handlers for node and edge updates, connections, and additions.

import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

export const useStore = create((set, get) => ({
    nodes: [], // Array to store node data
    edges: [], // Array to store edge data

    // Handle updates to nodes
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    // Handle updates to edges
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    // Handle new edge connections
    onConnect: (params) => {
        set({
            edges: addEdge(
                {
                    ...params,
                    type: "smoothstep", // Smooth edge type
                    animated: true, // Animated edge
                    color: "#8b5cf6", // Purple edge color
                },
                get().edges
            ),
        });
    },

    // Add a new node of the specified type
    addNode: (type) => {
        const newNodeId = `${type}-${get().nodes.length + 1}`;
        const newNode = {
            id: newNodeId,
            type,
            position: {
                x: Math.random() * 500, // Random X position
                y: Math.random() * 500, // Random Y position
            },
            data: {}, // Empty data object
        };
        set((state) => ({
            nodes: [...state.nodes, newNode],
        }));
    },
}));
