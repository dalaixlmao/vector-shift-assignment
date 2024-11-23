# VectorShift - Frontend Technical Assessment
- **Frontend Deployed Link**: https://vector-shift-assignment-mu.vercel.app/
- **Backend Deployed Link**: https://vectorshift-backend.ddns.net

## Overview

This repository contains the solution to VectorShift's Frontend Technical Assessment. The project is a React and FastAPI-based application that allows users to design and validate pipelines. Users can create nodes and edges to construct a pipeline, which is then validated for its structure and properties. The application provides a visual interface for designing pipelines and communicates with a backend to verify the pipeline's validity.

## Features

### Frontend
- **Node Abstraction**: Reusable abstraction for creating new node types with minimal code duplication.
- **Node Types**: Includes various nodes such as `Input`, `LLM`, `Output`, `Text`, `Search`, `Translation`, `Code-Generation`, `Data-Visualization`, and `AI-Assistant`.
- **Dynamic Styling**: A responsive and visually appealing UI styled using TailwindCSS.
- **Text Node Logic**: 
  - Resizable nodes based on user input.
  - Dynamic creation of handles for variables defined in the text field using `{{ variable }}` syntax.
- **Pipeline UI**: Drag-and-drop interface for creating and linking nodes to form a pipeline.
- **Alert System**: Displays backend validation results (number of nodes, number of edges, and DAG validity).

### Backend
- **Validation Logic**: Validates the pipeline to ensure:
  - The pipeline forms a Directed Acyclic Graph (DAG).
  - Calculates the number of nodes and edges.
- **Integration**: Communicates with the frontend to process pipeline data via an API.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **React Flow**: For visualizing the nodes and edges.
- **TailwindCSS**: For styling the application.
- **Zustand**: For state management.
- **Axios**: For making HTTP requests.

### Backend
- **FastAPI**: For creating the backend API.
- **Python**: For implementing validation logic.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)

### Steps

#### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   
## Usage
1. Open the frontend in your browser at http://localhost:3000.
2. Drag and drop nodes to construct a pipeline.
3. Connect nodes with edges.
4. Click the "Submit" button to validate the pipeline.
5. View the results in an alert, displaying:
   - Number of nodes.
   - Number of edges.
   - Whether the pipeline forms a DAG.

## File Structure
```bash
root
├── backend
│   ├── main.py              # FastAPI backend
│   └── lib/dagValidator.py  # DAG validation logic
├── frontend
│   ├── src
│   │   ├── App.jsx          # Main application
│   │   ├── store.js         # State management using Zustand
│   │   ├── ui.jsx           # ReactFlow-based pipeline UI
│   │   ├── toolbar.jsx      # Toolbar for adding nodes
│   │   ├── submit.jsx       # Submit button component
│   │   ├── draggableNode.jsx # Dragging functionality for nodes
│   │   ├── components/      # Reusable React components
│   │   ├── nodes/           # Logic for different node types
│   └── public/              # Static assets
```

## API Reference
### POST /pipelines/parse

#### Request Body:
  ```json
  {
    "nodes": ["node1", "node2", "node3"],
    "edges": [["node1", "node2"], ["node2", "node3"]]
  }
  ```

#### Response:
  ```json
  {
    "num_nodes": 3,
    "num_edges": 2,
    "is_dag": true
  }
  ```





