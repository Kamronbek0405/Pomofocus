"use client";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { v4 as uuidv4 } from "uuid"; // For unique ids

export default function Home() {
  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(1500);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [bgColor, setBgColor] = useState("bg-red-400"); // New state for background color
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false);



  const timeOptions = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  };

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeLeft);

  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
  });

  const startButton = () => {
    start()
    setModal(true);
  };

  const pauseButton = () => {
    pause()
    setModal(false);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    const newTime = timeOptions[selectedMode];
    setTimeLeft(newTime);
    const newExpiry = new Date();
    newExpiry.setSeconds(newExpiry.getSeconds() + newTime);
    restart(newExpiry, false);

    // Set the background color based on the selected mode
    if (selectedMode === "pomodoro") {
      setBgColor("bg-red-400 transition-all duration-700");
    } else if (selectedMode === "shortBreak") {
      setBgColor("bg-green-400 transition-all duration-700");
    } else if (selectedMode === "longBreak") {
      setBgColor("bg-blue-400 transition-all duration-700");
    }
  };

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, { id: uuidv4(), text: taskText, completed: false }]);
    setTaskText("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskText(taskToEdit.text);
    setEditingTask(id);
  };

  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask ? { ...task, text: taskText } : task
      )
    );
    setTaskText("");
    setEditingTask(null);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };



const buttonModal = () => {
  setEditModal(true)

}





  return (
    <div
      className={`min-h-screen h-[120vh]  lg:h-[115vh]  overflow-hidden   flex flex-col items-center justify-center ${bgColor} text-white transition-all duration-500`}
    >
      <div className="flex flex-col items-center w-[360px] lg:w-[500px] lg:h-[320px] bg-white/20 p-4 rounded-2xl mt-20 justify-center gap-2 text-white">
        <div className="flex gap-4 ">
          <button
            onClick={() => handleModeChange("pomodoro")}
            className={`${mode === "pomodoro" ? "bg-white  lg:text-lg font-medium  bg-white/40 p-4 rounded-lg   text-white" : "text-lg"
              } p-2 rounded`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => handleModeChange("shortBreak")}
            className={`${mode === "shortBreak" ? "bg-white lg:text-lg font-medium text-white bg-white/40 p-4 rounded-lg " : "text-lg"
              } p-2 rounded`}
          >
            Short Break
          </button>
          <button
            onClick={() => handleModeChange("longBreak")}
            className={`${mode === "longBreak" ? "bg-white  lg:text-lg font-medium text-white bg-white/40 p-4 rounded-lg " : "text-lg"
              } p-2 rounded`}
          >
            Long Break
          </button>
        </div>

        <div className="my-8 font-medium text-7xl">
          <span>{String(minutes).padStart(2, "0")}:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>

        <div className="flex items-center gap-5 justify-center ">
          {!modal ? (
            <button
            
              className="bg-white  text-gray-500  px-12 py-4 rounded font-bold mb-4"
              onClick={startButton}
            >
              START
             
            </button>
          ) : (
            <button
              className="bg-white text-gray-500 px-12 py-4 rounded font-bold"
              onClick={pauseButton}
            >
              PAUSE
            </button>
          )}

        </div>

        {/* Tasks Section */}
      </div>
      <div className="mt-8">
        <div>
          <h2 className="lg:text-2xl lg:font-bold mt-2 ">Tasks</h2>
          <div className="bg-white  h-[1px] mt-2 w-[350px] lg:w-[500px] "></div>
        </div>

        {/* Task Input */}
        <div className="mb-4 mt-5 flex flex-col ">
          <input
            className="p-3 text-black border-none outline-none"
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="What are you working on?"
          />
          {editingTask ? (
            <button
              className=" bg-white/20 px-5 hover:text-white text-gray-300 hover:text-[18px] hover:font-medium rounded-xl py-5 mt-2  "
              onClick={updateTask}
            >
              Update
            </button>
          ) : (
            <button
              className=" border-dashed border-gray-200 border-2 mt-2 text-lg font-medium hover:text-white text-gray-300  bg-white/20 p-4  hover:border-white   px-5 py-5  rounded"
              onClick={addTask}
            >
              Add Task
            </button>
            
          )}
        </div>

        {/* Task List */}
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center  bg-white text-black justify-between p-2 ${task.completed ? "line-through" : ""
                }`}
            >
                <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
              <div>
              {!editModal ? (
                <div className="flex  ">
                  <img onClick={buttonModal} src="https://pomofocus.io/icons/vertical-ellipsis.png" alt="" width={16} height={16} />
                </div>
      ) : (
        <div className="flex items-center gap-2   ">
          <button
            className="   px-2 py-1 mt-4 rounded text-gray-600"
            onClick={() => setEditModal(false)} // editModalni yopish tugmasi
          >
            Cancel
          </button>
          <button
            className="   rounded mr-2 mt-4 text-gray-600"
            onClick={() => editTask(task.id)} // Taskni tahrirlash tugmasi
          >
            Edit
          </button>
          <button
            className="  px-2 py-1 rounded mr-2 mt-4 text-gray-600"
            onClick={() => deleteTask(task.id)} // Taskni o'chirish tugmasi
          >
            Delete
          </button>
        </div>
      )}

               
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
