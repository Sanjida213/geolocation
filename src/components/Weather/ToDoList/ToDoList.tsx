import { useState } from "react";
import "./ToDoList.scss";
import { ToDoListData } from "../../../types/ToDoListData";

const ToDoList = () => {
  const [todos, setTodos] = useState<ToDoListData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo: ToDoListData = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="to-do-list">
      <h1 className="to-do-list__title">ToDo List</h1>
      <div className="to-do-list__input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="to-do-list__input"
        />
        <button onClick={handleAddTodo} className="to-do-list__button">Add Todo</button>
      </div>
      <ul className="to-do-list__list">
        {todos.map(todo => (
          <li key={todo.id} className="to-do-list__item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span className="to-do-list__text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)} className="to-do-list__delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
