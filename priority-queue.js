
class Node {
    constructor(val, priority){
        this.value = val
        this.priority = priority
    }
}


class PriorityQueue {
    constructor(){
        this.items = []
    }

    getParentIndex(idx) {
        return Math.floor((idx-1) / 2)
    }

    getChildrenIndexes(idx){
        return [2 * idx + 1, 2 * idx + 2]
    }

    enqueue(val, priority) {
        this.items.push(new Node(val, priority))
        if(this.items.length < 2) return this

        let idx = this.items.length - 1
        let current = this.items[idx]

        while(idx !== 0) {
            let parentIdx = this.getParentIndex(idx)
            let parent = this.items[parentIdx]

            if(current.priority > parent.priority) break

            this.items[idx] = parent
            this.items[parentIdx] = current
            idx = parentIdx
   
        }

        return this

    }

    dequeue(){
        const nowServing = this.items[0]
        this.items[0] = this.items[this.items.length - 1]
        this.items.pop()

        if (this.items.length === 0) return nowServing

        let idx = 0
        let current = this.items[idx]
        
        while(true){

            let swapIdx = null
            let [child1Idx, child2Idx] = this.getChildrenIndexes(idx)

            if(this.items.length > child1Idx){
                let child1 = this.items[child1Idx]

                if(current.priority > child1.priority){
                    swapIdx = child1Idx
                }
            }

            if(this.items.length > child2Idx){

                let child2 = this.items[child2Idx]

                if(
                    (current.priority > child2.priority && current.priority <= child1.priority) ||
                    (current.priority > child2.priority && child2.priority < child1.priority)
                ){
                    swapIdx = child2Idx
                }

            }

            if (swapIdx === null) break

            this.items[idx] = this.items[swapIdx]
            this.items[swapIdx] = current
            idx = swapIdx
        }

        return nowServing

    }
}

let queue = new PriorityQueue()

queue.enqueue('low fever', 4)
queue.enqueue('concussion', 2)
queue.enqueue('hungover', 5)
queue.enqueue('gunshot', 1)

console.log(queue);

queue.dequeue()
console.log(queue);
queue.dequeue()
console.log(queue);