
class Node {
    constructor(val){
        this.value = val
        this.left = null
        this.right = null
        this.freq = 1
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null
    }

    insert(val) {
        let newNode = new Node(val)
    
        if(!this.root){
            this.root = newNode
            return this
        } 

        let current = this.root
        let found = false

        while(!found){
            if(val < current.value){
                if(!current.left) {
                    current.left = newNode
                    found = true
                } else {
                    current = current.left
                }
            } else if(val > current.value){
                if(!current.right) {
                    current.right = newNode
                    found = true
                } else {
                    current = current.right
                }
            } else {
                current.freq += 1
                found = true
            }
        }

        return this
    }

    search(val) {
        if(!this.root) return false

        let current = this.root
        let found = false

        while(true){
            if(val < current.value){
                if(!current.left) {
                    found = false
                    return found
                } else {
                    current = current.left
                }
            } else if(val > current.value){
                if(!current.right) {
                    found = false
                    return found
                } else {
                    current = current.right
                }
            } else {
                found = true
                return current
            }
        }
    }

    dfsPreOrder(){
        let output = []
        let current = this.root

        const helper = (node) => {
            output.push(node.value)
            if(node.left) helper(node.left)
            if(node.right) helper(node.right)
        }

        helper(current)

        return output
    }

    dfsPostOrder(){
        let output = []
        let current = this.root

        const helper = (node) => {
            if(node.left) helper(node.left)
            if(node.right) helper(node.right)
            output.push(node.value)
        }

        helper(current)

        return output
    }

    dfsInOrder(){
        let output = []
        let current = this.root

        const helper = (node) => {
            if(node.left) helper(node.left)
            output.push(node.value)
            if(node.right) helper(node.right)
        }

        helper(current)

        return output
    }

    bfs(){
        let queue = []
        let output = []
        let dequeuedItem = null
    
        if(!this.root) return false
    
        queue.push(this.root)
    
        while(queue.length > 0){
            dequeuedItem = queue.shift()
            output.push(dequeuedItem.value)
            if(dequeuedItem.left) queue.push(dequeuedItem.left)
            if(dequeuedItem.right) queue.push(dequeuedItem.right)
        }
    
        return output
    }
    
}

var tree = new BinarySearchTree()


// TESTING

tree.insert(10)
tree.insert(6)
tree.insert(15)
tree.insert(8)
tree.insert(3)
tree.insert(20)





console.log(tree.bfs())
console.log(tree.dfsPreOrder())
console.log(tree.dfsPostOrder())
console.log(tree.dfsInOrder())