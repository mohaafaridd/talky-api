interface HasProps {
  name: string
  room?: string
}

class Node<T> {
  public left: Node<T> | undefined = undefined
  public right: Node<T> | undefined = undefined
  constructor(public value: T) {}
}

export class BinarySearchTree<T extends HasProps> {
  private _root: Node<T> | undefined = undefined

  public insert(entity: T) {
    const newNode = new Node(entity)

    if (!this._root) {
      this._root = newNode
      return this
    }

    let current = this._root

    while (true) {
      if (entity.name === current.value.name) return undefined

      if (entity.name < current.value.name) {
        if (!current.left) {
          current.left = newNode
          return this
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          return this
        }
        current = current.right
      }
    }
  }

  public find(value: string): T | null {
    if (!this._root) return null

    let current: Node<T> | undefined = this._root

    while (current) {
      if (current.value.name === value) return current.value
      else if (current.value.name > value) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }

  public dfsInOrder(room?: string) {
    if (!this._root) return []

    const result: T[] = []

    const traverse = (node: Node<T>) => {
      if (node.left) traverse(node.left)
      if (room) {
        if (node.value.room === room) result.push(node.value)
      } else {
        result.push(node.value)
      }
      if (node.right) traverse(node.right)
    }

    traverse(this._root!)

    return result
  }
}
