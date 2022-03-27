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
}

const graph = new Graph()

// TESTING

graph.addVertex("Tokyo")
graph.addVertex("Dallas")
graph.addVertex("Aspen")
graph.addVertex("HongKong")
graph.addVertex("Austin")
graph.addVertex("Portland")
graph.addEdge("Tokyo", "Dallas")
graph.addEdge("Tokyo", "Aspen")
graph.addEdge("Austin", "Aspen")

console.log(graph)

graph.removeEdge("Tokyo", "Aspen")
console.log(graph)

graph.removeVertex("Tokyo")
console.log(graph)