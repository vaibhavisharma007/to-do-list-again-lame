import React from "react";
import { useState } from "react";
const ToDoItems = ({ todo, updateToDo,DeleteTask,setDesc }) => {
    const [editorId,setEditorId]=useState(null);
    const [description,setDesciption]=useState("");
  return (
    <div className="w-full flex flex-col gap-4">
      {todo.map((t) => (
        // Minimal todo card
        <div key={t.id} className="flex flex-col items-stretch bg-white border border-gray-200 shadow-sm py-3 px-4 rounded-lg text-md min-w-80 transition-all hover:shadow-md">
          <div className="flex justify-between items-center">
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => {
                updateToDo(t.id);
              }}
            >
              <span className="text-xl">{t.completed ? "✅" : "📅"}</span>
              <span className={`text-base font-medium ${t.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                {t.title}
              </span>
            </div>
            <button className="ml-4 text-xl hover:text-red-500 transition-colors" onClick={()=>DeleteTask(t.id)}>❌</button>
          </div>
          {/* Details button */}
          <button className="mt-2 self-start px-3 py-1 bg-gray-100 rounded text-sm font-medium hover:bg-gray-200 transition-all" onClick={()=>{setEditorId(t.id);setDesciption(t.desc || "")}}>Details</button>
          {/* Details modal */}
          {editorId === t.id && 
            // Modal with backdrop blur, disables background interaction
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Blurred background, no dark overlay */}
              <div className="absolute inset-0 backdrop-blur-md"></div>
              <div className="relative bg-white rounded-lg shadow-lg p-5 flex flex-col gap-4 w-[90vw] max-w-md z-10 border border-gray-200">
                <input
                  type="text"
                  value={description}
                  onChange={(e)=>(setDesciption(e.target.value))}
                  className="w-full min-h-[5rem] text-start border border-gray-300 bg-gray-50 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Add details..."
                />
                <div className="flex justify-end gap-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all" onClick={()=>{
                    setDesc(t.id,description);
                    setEditorId(null);
                  }}>Save</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition-all" onClick={()=>{setEditorId(null)}}>Close</button>
                </div>
              </div>
            </div>
          }
        </div>
      ))}
    </div>
  );
};



export default ToDoItems;
