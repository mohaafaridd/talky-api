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

  public delete(value: string) {
    if (!this._root) return

    let found = false
    let parent: Node<T> | undefined = undefined
    let current: Node<T> | undefined = this._root
    let replacement: Node<T> | undefined = undefined
    let replacementParent: Node<T> | undefined = undefined

    // Finding
    while (!found && current) {
      if (value < current.value.name) {
        parent = current
        current = current?.left
      } else if (value > current.value.name) {
        parent = current
        current = current?.right
      } else {
        found = true
      }
    }

    if (!found || !current) throw new Error("Username wasn't found")

    let childCount = (current.left ? 1 : 0) + (current.right ? 1 : 0)

    if (current === this._root) {
      switch (childCount) {
        case 0:
          this._root = undefined
          break

        case 1:
          this._root = current.right || current.left
          break

        case 2:
          // TODO
          replacement = this._root.left
          while (replacement!.right) {
            replacementParent = replacement
            replacement = replacement?.right
          }

          if (replacementParent) {
            replacementParent.right = replacement!.left
            replacement!.right = this._root.right
            replacement!.left = this._root.left
          } else {
            replacement!.right = this._root.right
          }

          this._root = replacement

          break

        default:
          break
      }
    } else {
      switch (childCount) {
        case 0:
          if (current.value.name < parent?.value.name!) {
            parent!.left = undefined
          } else {
            parent!.right = undefined
          }
          break

        case 1:
          if (current.value.name < parent!.value.name) {
            parent!.left = current.left === null ? current.right : current.left
          } else {
            parent!.right = current.left === null ? current.right : current.left
          }
          break

        case 2:
          // Todo
          //reset pointers for new traversal
          replacement = current.left
          replacementParent = current

          //find the right-most node
          while (replacement!.right) {
            replacementParent = replacement
            replacement = replacement?.right
          }

          replacementParent!.right = replacement!.left

          //assign children to the replacement
          replacement!.right = current.right
          replacement!.left = current.left

          //place the replacement in the right spot
          if (current.value.name < parent!.value.name) {
            parent!.left = replacement
          } else {
            parent!.right = replacement
          }
          break
      }
    }

    // let childCount: number = 0
    // let replacement = undefined
    // let replacementParent = undefined
  }
}
