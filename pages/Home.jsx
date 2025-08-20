import React, { useEffect } from "react";
import { useState } from "react";
import ToDoInput from "../components/ToDoInput";
import ToDoItems from "../components/ToDoItems";

const Home = () => {
  const loadToDos = () => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  };
  const [todo, setTodo] = useState(loadToDos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const updateToDo = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };
  const setDesc = (id, desc) => {
    setTodo((prevTodo) =>
      prevTodo.map((todo) => (todo.id === id ? { ...todo, desc: desc } : todo))
    );
  };

  const DeleteTask = (id) => {
    setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <>
      {/* Full viewport gradient background, minimalist */}
      <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-gray-50 via-blue-50 to-white">
        <div className="w-full max-w-xl px-2 py-8 flex flex-col items-center">
          <ToDoInput
            addItem={(newItem) => {
              setTodo((prevTodo) => [...prevTodo, newItem]);
            }}
          />
          <div className="w-full mt-8">
            <ToDoItems
              todo={todo}
              updateToDo={updateToDo}
              DeleteTask={DeleteTask}
              setDesc={setDesc}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
