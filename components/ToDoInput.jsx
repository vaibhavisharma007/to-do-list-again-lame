import React, { useState } from "react";

const ToDoInput = ({ addItem }) => {
  const [title, setTitle] = useState("");
  const handleAdd = () => {
    if (!title.trim()) return alert("enter the task");
    const newId = Date.now();
    addItem({ id: newId, title, completed: false, desc: "" });
    setTitle("");
  };
  const handleKey = (e) => {
    if (e.key === "Enter") handleAdd();
  };
  return (
    // Card-like input area with gradient and rounded corners
    <div className="flex flex-col md:flex-row justify-center items-center bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full max-w-xl mx-auto">
      <input
        type="text"
        value={title}
        placeholder="Enter your task..."
        onKeyDown={handleKey}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="text-center text-base md:text-lg border border-gray-300 rounded-lg p-3 w-full md:w-2/3 mb-3 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
      />
      <input
        type="button"
        value="Add To Do"
        onClick={handleAdd}
        className="text-base border border-blue-500 rounded-lg cursor-pointer text-white bg-blue-500 mx-0 md:mx-4 p-3 w-full md:w-auto mt-2 md:mt-0 shadow hover:bg-blue-600 transition-all"
      />
    </div>
  );
};

export default ToDoInput;
