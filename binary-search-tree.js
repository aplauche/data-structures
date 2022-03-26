
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
}

var tree = new BinarySearchTree()
tree.insert(10)
tree.insert(5)
tree.insert(7)
tree.insert(2)
tree.insert(13)
tree.insert(13)
tree.insert(13)
console.log(tree.root)
console.log(tree.search(12))
console.log(tree.search(7))
