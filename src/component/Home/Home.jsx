import { useState, useEffect, useContext } from "react";
import { AiFillCheckCircle, AiOutlineWarning, AiFillCloseCircle, AiOutlineMail, AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import io from "socket.io-client";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const socket = io(`${import.meta.env.VITE_api}`);

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const fetchTasks = async (userEmail = user.email) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_api}/tasks`, {
        params: { email: userEmail },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire("Error", "Failed to fetch tasks", "error");
    }
  };

  useEffect(() => {
    fetchTasks();

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      Swal.fire("Success", "Task updated in real-time", "success");
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("To-Do");
    setIsEditing(false);
    setEditTaskId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const taskData = {
      email: user?.email,
      title,
      description,
      category,
      timestamp,
    };
  
    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_api}/tasks/${editTaskId}`, taskData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.post(`${import.meta.env.VITE_api}/tasks`, taskData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Task saved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
  
      setIsModalOpen(false);
      resetForm();
      fetchTasks();
    } catch (error) {
      console.error("Error saving/updating task:", error);
      Swal.fire("Error", "Failed to save/update task", "error");
    }
  };
  
  const handleDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) return;
  
    const movedTask = tasks.find((task) => task._id === result.draggableId);
    if (!movedTask) return;
  
    const { _id, ...updateData } = { ...movedTask, category: destination.droppableId };
  
    try {
      await axios.put(`${import.meta.env.VITE_api}/tasks/${_id}`, updateData);
      socket.emit("taskUpdated", updateData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task category updated",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task category:", error);
      Swal.fire("Error", "Failed to update task category", "error");
    }
  };
  

  return (
    <div className="mt-40 mb-10">
      <div className="max-w-7xl mx-auto h-screen">
        <div className="flex items-center justify-center mb-8">
          <button
            type="button"
            className="cursor-pointer w-[50%] h-10 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#00EFC5] hover:bg-[#3086B3] active:bg-[#00EFC5]"
            onClick={() => setIsModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
              <path d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z" />
            </svg>
          </button>
        </div>


        {isModalOpen && (
          <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
              <div className="flex items-center">
                <h3 className="text-blue-600 text-xl font-bold flex-1">{isEditing ? "Edit Task" : "Add New Task"}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500" viewBox="0 0 320.591 320.591" onClick={() => { setIsModalOpen(false); resetForm(); }}>
                  <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                  <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                </svg>
              </div>

              <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Title (required, max 50 characters)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="50"
                    required
                    placeholder="Enter task title"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Description (optional, max 200 characters)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength="200"
                    placeholder="Write a description"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Timestamp</label>
                  <p className="text-gray-500">{timestamp}</p>
                </div>

                <div className="flex justify-end gap-4 !mt-8">
                  <button
                    type="button"
                    onClick={() => { setIsModalOpen(false); resetForm(); }}
                    className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
                  >
                    {isEditing ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-md:max-w-md mx-auto">
            {['To-Do', 'In Progress', 'Done'].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="p-5">
                      <div className="text-center text-2xl font-bold text-gray-800">{status}</div>
                      <div className="font-[sans-serif] space-y-6 mx-auto w-max mt-4">
                        {tasks.filter(task => task.category === status).map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided) => (
                              <div
                                className="shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] text-black flex w-max max-w-sm rounded-md overflow-hidden relative"
                                role="alert"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className={`flex items-center justify-center ${status === 'To-Do' ? 'bg-blue-500' : status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                  {status === 'To-Do' && <AiOutlineMail className="w-5 shrink-0 text-white" />}
                                  {status === 'In Progress' && <AiOutlineWarning className="w-5 shrink-0 text-white" />}
                                  {status === 'Done' && <AiFillCheckCircle className="w-5 shrink-0 text-white" />}
                                </div>
                                <div className="py-2 mx-4">
                                  <p className="text-sm font-semibold">{task.title}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                                  <p className="text-xs text-gray-500 mt-2">{task.timestamp}</p>
                                </div>
                                <div className="flex items-center gap-2 absolute top-2 right-2">
                                  <AiFillEdit className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => handleEdit(task)} />
                                  <AiFillDelete className="w-5 h-5 text-red-600 cursor-pointer" onClick={() => handleDelete(task._id)} />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
