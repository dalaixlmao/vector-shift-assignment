from typing import List, Dict
from collections import deque

def validate_dag(nodes: List[str], edges: List[List[str]]) -> Dict[str, str]:
    ind = {node: i for i, node in enumerate(nodes)}
    g = [[] for _ in range(len(nodes))]
    indeg = [0] * len(nodes)
    is_dag=True
    for edge in edges:
        g[ind[edge[0]]].append(ind[edge[1]])
        indeg[ind[edge[1]]] += 1

    topo = []
    q = deque()
    

    for i in range(len(nodes)):
        if indeg[i] == 0:
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
        is_dag=False
    return {"num_nodes":len(nodes), "num_edges":len(edges), "is_dag": is_dag}