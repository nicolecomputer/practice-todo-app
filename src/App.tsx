import React from 'react'
import './App.css'

type TodoItem = {
  title: string
  id: number
}

type TodoItemProps = {
  todo: TodoItem
  onDelete: () => void
}
function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <li>
      <span>{todo.title}</span>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}

//
type AddTodoItemProps = {
  onAddItem: (title: string) => void
}
function AddTodoItem({ onAddItem }: AddTodoItemProps) {
  const [itemValue, setItemValue] = React.useState<string>("")
  return (
    <div>
      <input type="text" placeholder="Add your task"
        value={itemValue}
        onChange={(event) => {
          setItemValue(event.target.value)
        }} />
      <div>
        <button onClick={() => {
          onAddItem(itemValue)
        }}>Submit</button>
      </div>
    </div>
  )
}

// Utility function
function addTodoItem(todos: TodoItem[], title: string, currentId: number): TodoItem[] {
  currentId++
  return [
    ...todos,
    {
      title: title,
      id: currentId
    }
  ]
}

function removeTodoItem(todos: TodoItem[], id: number): TodoItem[] {
  return todos.filter(todo => todo.id != id)
}


export default function App() {
  const [items, setItems] = React.useState([
    { title: 'water the plants', id: 1 },
    { title: 'wash the dishes', id: 2 },
    { title: 'walk the dog', id: 3 }
  ])
  const [currentId, setCurrentId] = React.useState(100)
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoItem onAddItem={(title) => {
        setItems(addTodoItem(items, title, currentId))
        setCurrentId(currentId + 1)
      }} />
      <ul>
        {items.map(item =>
          <TodoItem todo={item} onDelete={() => {
            setItems(removeTodoItem(items, item.id))
          }} />
        )}

      </ul>
    </div>
  );
}
