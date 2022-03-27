class MaxBinaryHeap {
    constructor(){
        // Normally zeroed out to start
        this.values = [41,39,33,18,27,12]
    }

    getParentIndex(idx) {
        return Math.floor((idx-1) / 2)
    }

    getChildrenIndexes(idx){
        return [2 * idx + 1, 2 * idx + 2]
    }

    insert(val) {
        this.values.push(val)
        if(this.values.length < 2) return this
        let currentIdx = this.values.length - 1

        while(currentIdx > 0){
            let parentIndex = this.getParentIndex(currentIdx)

            let parentVal = this.values[parentIndex]

            if(val <= parentVal) break

            this.values[parentIndex] = val
            this.values[currentIdx] = parentVal

            currentIdx = parentIndex
        }
        return this
    }

    extractMax(){
        let removedValue = this.values[0]
        this.values[0] = this.values[this.values.length -1]
        this.values.pop()
        if(this.values.length > 0) {
            this.sinkDown()
        }
        return removedValue
    }

    sinkDown(){
        let currentIdx = 0
        let value = this.values[0]

        while(true){
            let [child1, child2] = this.getChildrenIndexes(currentIdx)
            if(this.values[child1] > value && this.values[child2] > value){
                let swapIdx = this.values[child1] > this.values[child2] ? child1 : child2
                this.values[currentIdx] = this.values[swapIdx]
                this.values[swapIdx] = value
                currentIdx = swapIdx
            } else if (this.values[child1] > value && !this.values[child2] > value) {
                this.values[currentIdx] = this.values[child1]
                this.values[child1] = value
                currentIdx = child1
            } else if (!this.values[child1] > value && this.values[child2] > value) {
                this.values[currentIdx] = this.values[child2]
                this.values[child2] = value
                currentIdx = child2
            } else {
                return 
            }

        }

    }
}

let heap = new MaxBinaryHeap()

// TESTING

console.log(heap.insert(55))
// console.log(heap.insert(100))
// console.log(heap.insert(24))
console.log(heap.extractMax())
console.log(heap)
console.log(heap.extractMax())
console.log(heap)