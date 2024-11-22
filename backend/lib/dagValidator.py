from typing import List, Dict
from collections import deque

def validate_dag(nodes: List[str], edges: List[List[str]]) -> Dict[str, str]:
    ind = {node: i for i, node in enumerate(nodes)}
    g = [[] for _ in range(len(nodes))]
    indeg = [0] * len(nodes)

    for edge in edges:
        g[ind[edge[0]]].append(ind[edge[1]])
        indeg[ind[edge[1]]] += 1

    topo = []

    for i in range(len(nodes)):
        if indeg[i] == 0:
            q = deque()
            q.append(i)
            topo.append(i)
            while q:
                node = q.popleft()
                for child in g[node]:
                    indeg[child] -= 1
                    if indeg[child] == 0:
                        topo.append(child)
                        q.append(child)

    if len(topo) != len(nodes):
        return {"message": "Directed Acyclic Graph does not exist, cycle detected"}
    else:
        return {"message": "Directed Acyclic Graph exists"}
