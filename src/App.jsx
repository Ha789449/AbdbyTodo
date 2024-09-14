import React, { useState } from 'react';
import Modal from 'react-modal';

// Define Footer component
const Footer = () => (
  <footer className="bg-black w-full flex justify-center items-center py-4">
    <p className="text-white text-4xl sm:text-xl font-bold">Footer</p>
  </footer>
);

const App = () => {
  // State variables
  const [todos, setTodos] = useState([]); // List of todos
  const [task, setTask] = useState(''); // New task input
  const [descriptions, setDescriptions] = useState(['']); // Descriptions for new task
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [editIndex, setEditIndex] = useState(null); // Index of todo being edited
  const [editTask, setEditTask] = useState(''); // Task input in edit mode
  const [editDescriptions, setEditDescriptions] = useState(['']); // Descriptions in edit mode

  // Add a new todo
  const handleAddTodo = () => {
    if (task && descriptions.every(desc => desc.trim() !== '')) {
      setTodos([...todos, { task, descriptions }]); // Add new todo to the list
      setTask(''); // Reset task input field
      setDescriptions(['']); // Reset descriptions input field
    } else {
      alert('Please fill in all description fields.'); // Show alert if any description is empty
    }
  };

  // Delete a todo with confirmation
  const handleDeleteTodo = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?'); // Show confirmation dialog
    if (confirmDelete) {
      const updatedTodos = todos.filter((_, i) => i !== index); // Remove todo by index
      setTodos(updatedTodos); // Update state with new todo list
    }
  };

  // Open the edit modal
  const openEditModal = (index) => {
    setEditIndex(index); // Set the index of the todo being edited
    setEditTask(todos[index].task); // Set the task of the todo being edited
    setEditDescriptions(todos[index].descriptions); // Set the descriptions of the todo being edited
    setIsModalOpen(true); // Open the modal
  };

  // Save the edited todo
  const handleSaveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = { task: editTask, descriptions: editDescriptions }; // Save edited todo
    setTodos(updatedTodos); // Update todo list
    closeModal(); // Close the modal
  };

  // Close the edit modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setEditIndex(null); // Reset edit index
    setEditTask(''); // Reset edit task input
    setEditDescriptions(['']); // Reset edit descriptions
  };

  // Add a new description input field
  const handleAddDescription = () => {
    setDescriptions([...descriptions, '']); // Add new description field
  };

  // Remove a description input field
  const handleRemoveDescription = (index) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index); // Remove description by index
    setDescriptions(updatedDescriptions); // Update descriptions state
  };

  // Handle description input change
  const handleDescriptionChange = (value, index) => {
    const updatedDescriptions = descriptions.map((desc, i) => (i === index ? value : desc)); // Update specific description
    setDescriptions(updatedDescriptions); // Update state
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="m-0 p-0 w-full flex flex-col items-center flex-grow">
        {/* Header */}
        <ul className="bg-black w-full flex justify-center items-center">
          <li className="h-[60px] text-white text-2xl font-bold flex justify-center items-center">Multi-App-Todo</li>
        </ul>

        {/* Todo Form */}
        <div className="bg-orange-500 flex justify-center min-h-[540px] items-center w-full py-10">
          <div className="w-[400px] bg-gray-200 rounded-lg p-6 shadow-lg">
            <h1 className="font-semibold mb-4 text-xl text-center">Add Todo</h1>
            <div className="bg-gray-800 w-full flex flex-col justify-center items-center p-4 space-y-4 rounded-lg">
              <div className="flex flex-col space-y-2 w-full">
                <p className="text-white">Task</p>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter the task"
                  className="rounded-lg w-full p-2"
                />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <p className="text-white">Descriptions</p>
                {descriptions.map((description, index) => (
                  <div key={index} className="flex flex-row items-center space-x-2 mb-2 w-full">
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => handleDescriptionChange(e.target.value, index)}
                      placeholder="Enter the description"
                      className="rounded-lg w-full p-2"
                    />
                    {descriptions.length > 1 && (
                      <button
                        className="bg-red-500 text-white rounded-lg py-1 px-3"
                        onClick={() => handleRemoveDescription(index)}
                      >
                        −
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="bg-green-500 text-white rounded-lg py-1 px-2"
                onClick={handleAddDescription}
              >
                +
              </button>
              <button
                onClick={handleAddTodo}
                className="mt-4 bg-orange-500 text-white rounded-lg py-2 px-4 w-full"
              >
                Add Todo
              </button>
            </div>
            {/* Display Todos */}
            {todos.length > 0 && (
              <div className="flex flex-col space-y-4 mt-6 w-full justify-center items-center">
                {todos.map((todo, index) => (
                  <div key={index} className="bg-gray-500 p-4 rounded-lg w-[350px]">
                    <h2 className="text-white text-lg font-semibold">{todo.task}</h2>
                    {todo.descriptions.map((desc, i) => (
                      <p key={i} className="text-white">{desc}</p>
                    ))}
                    <div className="mt-2 flex space-x-2 w-full">
                      <button
                        onClick={() => openEditModal(index)}
                        className="bg-blue-500 text-white rounded-lg py-1 px-3"
                      >
                        Edit Todo
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(index)}
                        className="bg-red-500 text-white rounded-lg py-1 px-3"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal for Editing */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Todo"
          className="flex justify-center items-center"
          ariaHideApp={false}
        >
          <div className="bg-gray-300 p-4 rounded-lg w-full shadow-lg">
            <h2 className="text-lg font-semibold">Edit Todo</h2>
            <div className="mt-2">
              <p>Task</p>
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className="rounded-lg w-full p-2 mb-4"
              />
              <p>Descriptions</p>
              {editDescriptions.map((desc, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => {
                      const updatedDescriptions = [...editDescriptions];
                      updatedDescriptions[index] = e.target.value;
                      setEditDescriptions(updatedDescriptions);
                    }}
                    className="rounded-lg w-full p-2"
                  />
                  {editDescriptions.length > 1 && (
                    <button
                      className="bg-red-500 text-white rounded-lg py-1 px-3 ml-2"
                      onClick={() => {
                        const updatedDescriptions = editDescriptions.filter((_, i) => i !== index);
                        setEditDescriptions(updatedDescriptions);
                      }}
                    >
                      −
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-end w-full">
                <button
                  className="bg-green-500 text-white rounded-lg py-1 px-4"
                  onClick={() => setEditDescriptions([...editDescriptions, ''])}
                >
                  + Add
                </button>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-blue-500 text-white rounded-lg py-2 px-4"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white rounded-lg py-2 px-4"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default App;
