# Graph Report - js-demo  (2026-10-07)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 23 nodes · 25 edges · 3 communities
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `68ea10ce`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- index.js
- user.js

## God Nodes (most connected - your core abstractions)
1. `add()` - 3 edges
2. `createUser()` - 3 edges
3. `formatMsg()` - 2 edges
4. `scripts` - 2 edges
5. `keywords` - 1 edges
6. `main` - 1 edges
7. `test` - 1 edges
8. `{ createUser }` - 1 edges
9. `{ formatMsg }` - 1 edges
10. `messageAlice` - 1 edges

## Surprising Connections (you probably didn't know these)
- `createUser()` --calls--> `add()`  [EXTRACTED]
  src/user.js → src/math.js

## Import Cycles
- None detected.

## Communities (3 total, 0 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.22
Nodes (8): description, keywords, main, name, scripts, test, type, version

### Community 1 - "index.js"
Cohesion: 0.25
Nodes (7): formatMsg(), { createUser }, { formatMsg }, messageAlice, messageBob, userAlice, userBob

### Community 2 - "user.js"
Cohesion: 0.60
Nodes (3): add(), { add }, createUser()

## Knowledge Gaps
- **14 isolated node(s):** `description`, `keywords`, `main`, `name`, `test` (+9 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 14 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createUser()` connect `user.js` to `index.js`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `description`, `keywords`, `main` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._