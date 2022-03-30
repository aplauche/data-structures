class Graph {
    constructor(){
        this.list = {}
    }

    addVertex(name){
        if(this.list[name]) return "Error - Key exists"
        
        this.list[name] = []
        return this
    }

    addEdge(v1, v2){
        // directed graph would only add one way
        this.list[v1].push(v2)
        this.list[v2].push(v1)
    }

    removeEdge(v1, v2){
        this.list[v1] = this.list[v1].filter(v => v !== v2)
        this.list[v2] = this.list[v2].filter(v => v !== v1)
    }

    removeVertex(vertex){
        this.list[vertex].forEach(v => {
            this.removeEdge(vertex, v)
        })
        delete this.list[vertex]
    }

    dfsRecursive(vertex){
        
        const result = []
        const visited = {}
        const graphList = this.list // get around 'this' problem

        const dfs = (vertex) => {
            if(!vertex) return null
            visited[vertex] = true
            result.push(vertex)
            graphList[vertex].forEach(v => {
                if(!v in visited || visited[v] !== true){
                    return dfs(v)
                }
            })
        }

        dfs(vertex)

        return result

    }

    dfsIterative(start){
        const result = []
        const stack = []
        const visited = {}
        stack.push(start)
        visited[start] = true

        while(stack.length > 0){
            let vertex = stack.pop()
            result.push(vertex)
            this.list[vertex].forEach(v => {
                if(!visited[v]){
                    visited[v] = true
                    stack.push(v)
                }
            })

        }

        return result
    }

    bfs(start) {
        const result = []
        const queue = []
        const visited = {}
        let current

        visited[start] = true
        queue.push(start)

        while(queue.length){
            current = queue.shift()
            result.push(current)
            this.list[current].forEach(n => {
                if(!visited[n]){
                    visited[n] = true
                    queue.push(n)
                }
            })
        }

        return result

    }
}

const graph = new Graph()

// TESTING

// graph.addVertex("Tokyo")
// graph.addVertex("Dallas")
// graph.addVertex("Aspen")
// graph.addVertex("HongKong")
// graph.addVertex("Austin")
// graph.addVertex("Portland")
// graph.addEdge("Tokyo", "Dallas")
// graph.addEdge("Tokyo", "Aspen")
// graph.addEdge("Austin", "Aspen")

// console.log(graph)

// graph.removeEdge("Tokyo", "Aspen")
// console.log(graph)

// graph.removeVertex("Tokyo")
// console.log(graph)

// DFS TESTS

graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("B", "D")
graph.addEdge("C", "E")
graph.addEdge("D", "E")
graph.addEdge("D", "F")
graph.addEdge("E", "F")

console.log(graph);

console.log(graph.bfs("A"))

// console.log(graph.dfsIterative("A"))

// console.log(graph.dfsRecursive("A"))


