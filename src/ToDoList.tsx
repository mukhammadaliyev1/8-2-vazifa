import React, { useState, useEffect } from 'react';

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [{ id: 1, text: "Hello world", completed: false }];
  });
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { id: todos.length + 1, text: input, completed: false }
    ]);
    setInput("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6 tracking-wide">To-Do App</h1>
        
        <ul className="space-y-3 mb-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md transform transition-all duration-300 ${
                todo.completed 
                  ? "bg-green-200 text-green-800 line-through hover:bg-green-300"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              <span
                onClick={() => handleToggle(todo.id)}
                className="cursor-pointer transition-transform transform hover:scale-105"
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none transform transition duration-300 hover:scale-110"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg active:scale-95 focus:outline-none"
          >
            Add
          </button>
        </div>

        <button
          onClick={clearAll}
          className="w-full bg-red-500 text-white py-3 rounded-lg transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95 focus:outline-none"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};
