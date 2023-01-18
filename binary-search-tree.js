class Node {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor(root = null) {
		this.root = root;
	}

	/** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

	insert(val) {
		const newNode = new Node(val);
		if (this.root === null) {
			this.root = newNode;
			return this;
		}

		function insertHelper(node) {
			while (node) {
				if (val < node.val) {
					if (node.left === null) return (node.left = newNode);
					else node = node.left;
				}
				if (val > node.val) {
					if (node.right === null) return (node.right = newNode);
					else node = node.right;
				}
			}

			return this;
		}
		insertHelper(this.root);
		return this;
	}

	/** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

	insertRecursively(val) {
		const newNode = new Node(val);
		if (this.root === null) {
			this.root = newNode;
			return this;
		}
		function insertHelper(node) {
			if (val < node.val) {
				return node.left !== null ? insertHelper(node.left) : (node.left = newNode);
			}
			if (val > node.val) {
				return node.right !== null ? insertHelper(node.right) : (node.right = newNode);
			}
		}
		insertHelper(this.root);
		return this;
	}

	/** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

	find(val) {
		let current = this.root;
		let found = false;

		if (current.val === val) {
			return current;
		}

		while (current && !found) {
			if (val < current.val) {
				current = current.left;
			}
			if (val > current.val) {
				current = current.right;
			}
			else found = true;
		}

		return !found ? undefined : current;
	}

	/** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

	findRecursively(val, current = this.root) {
		if (this.root === null) return undefined;

		if (val < current.val) {
			return current.left === null ? undefined : this.findRecursively(val, current.left);
		}
		else if (val > current.val) {
			return current.right === null ? undefined : this.findRecursively(val, current.right);
		}
		return current;
	}

	/** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

	dfsPreOrder(current = this.root, stack = []) {
		stack.push(current.val);
		if (current.left) this.dfsPreOrder(current.left, stack);
		if (current.right) this.dfsPreOrder(current.right, stack);
		return stack;
	}

	/** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

	dfsInOrder(current = this.root, stack = []) {
		if (current.left) this.dfsInOrder(current.left, stack);
		stack.push(current.val);
		if (current.right) this.dfsInOrder(current.right, stack);
		return stack;
	}

	/** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

	dfsPostOrder(current = this.root, stack = []) {
		if (current.left) this.dfsPostOrder(current.left, stack);
		if (current.right) this.dfsPostOrder(current.right, stack);
		stack.push(current.val);
		return stack;
	}

	/** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

	bfs() {
		let node = this.root;
		let queue = [];
		let data = [];

		queue.push(node);

		while (queue.length) {
			node = queue.shift();
			data.push(node.val);
			if (node.left) {
				queue.push(node.left);
			}
			if (node.right) {
				queue.push(node.right);
			}
		}

		return data;
	}

	/** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

	remove(val, current = this.root) {
		let removedNode = undefined;

		// removes a node with no children
		while (current && !removedNode) {
			if (current.left !== null) {
				if (current.left.val === val) {
					console.log('val', val);
					removedNode = current.left;
					// if 2 children, replace removed node with node.right. replace node.left.left value to removedNode.left
					if (removedNode.left !== null && removedNode.right != null) {
						current.left = removedNode.right;
						current.left.left = removedNode.left;
					}
					else if (removedNode.left !== null) current.left = removedNode.left;
					else if (removedNode.right !== null) current.left = removedNode.right;
					else current.left = null;
					return current;
				}
			}
			if (current.right !== null) {
				if (current.right.val === val) {
					removedNode = current.right;

					// if 2 children, replace removed node with node.right. replace node.right.left value to removedNode.left
					if (removedNode.left !== null && removedNode.right != null) {
						current.right = removedNode.right;
						current.right.left = removedNode.left;
					}
					else if (current.right.left !== null)
						// if 1 child, replace removed node with child
						current.right = current.right.left;
					else if (current.right.right !== null) current.right = current.right.right;
					else
						// if no children
						current.right = null;
					return current;
				}
			}
			// traverse tree
			current = val < current.val ? current.left : current.right;
		}

		// function shiftChildren(nodeToRemove) {
		// 	let childLeft = null;
		// 	let childRight = null;
		// 	console.log('CLEAR CHILDREN', nodeToRemove);
		// 	// if (nodeToRemove.left === null && nodeToRemove.right === null) {
		// 	// 	return nodeToRemove;
		// 	// }
		// 	if (nodeToRemove.left !== null) {
		// 		// console.log('current-->', current, 'nodeLeft', nodeToRemove.left);
		// 		childLeft = nodeToRemove.left;
		// 	}
		// 	if (nodeToRemove.right !== null) {
		// 		// console.log('current-->', current, 'nodeRight', nodeToRemove.right);
		// 		childRight = nodeToRemove.right;
		// 	}
		// 	// else return null;
		// }
	}

	/** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

	isBalanced() {}

	/** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

	findSecondHighest() {}
}

module.exports = BinarySearchTree;
