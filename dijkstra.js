class SimplePQ {
    constructor(){
        this.values =[]
    }

    enqueue(val, priority){
        this.values.push({val, priority})
        this.sortQueue()
    }

    dequeue(){
        return this.values.shift()
    }

    sortQueue(){
        this.values.sort((a,b) => a.priority - b.priority)
    }
}

class WeightedGraph {
    constructor(){
        this.list = {}
    }

    addVertex(name){
        if(this.list[name]) return "Error - Key exists"
        
        this.list[name] = []
        return this
    }

    addEdge(v1, v2, weight){
        // directed graph would only add one way
        this.list[v1].push({"node": v2, weight})
        this.list[v2].push({"node": v1, weight})
    }

    removeEdge(v1, v2){
        this.list[v1] = this.list[v1].filter(v => v.node !== v2)
        this.list[v2] = this.list[v2].filter(v => v.node !== v1)
    }

    removeVertex(vertex){
        this.list[vertex].forEach(v => {
            this.removeEdge(vertex, v.node)
        })
        delete this.list[vertex]
    }

    shortestPath(start, end){
        const q = new SimplePQ()
        const previousNodeMap = {}
        const distancesFromStart = {}
        const shortestPath = []
        let currentNode

        for (let vertex in this.list){
            let dist = Infinity
            if(vertex === start) dist = 0
            distancesFromStart[vertex] = dist
            q.enqueue(vertex, dist)

            previousNodeMap[vertex] = null
        }

        console.log(q);
        console.log(previousNodeMap);
        console.log(distancesFromStart);


        while(q.values.length > 0){
            currentNode = q.dequeue()
            if(currentNode === end) return

            if(currentNode || distancesFromStart[currentNode] !== Infinity){ // WTF does this do??
                const currentNodeName = currentNode.val
                // console.log(this.list[currentNode])
                for(let neighborNode of this.list[currentNodeName]){
                    // calc new distance to neighbor
                    console.log(neighborNode)
                    let possibleShortest = distancesFromStart[currentNodeName] + neighborNode.weight
                    if(possibleShortest < distancesFromStart[neighborNode.node]){
                        distancesFromStart[neighborNode.node] = possibleShortest
                        previousNodeMap[neighborNode.node] = currentNodeName
                    }
                }
            } // end WTF
        }
        console.log(distancesFromStart);
        console.log(previousNodeMap);
    }
}

const graph = new WeightedGraph()

// TESTING

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);


graph.shortestPath("A", "E");

// ["A", "C", "D", "F", "E"]

