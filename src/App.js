import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [tasks, setTasks] = useState([])
  const [taskId, setTaskId] = useState(1)
  const [completeTask, setCompleteTask] = useState([])

  const handleAddTask = event => {
    event.preventDefault()
    const name = event.target.name.value
    const description = event.target.description.value

    if (name === '' || description === '') {
      toast.error("Please Fillup the field")
    }
    else {
      const newTask = { id: taskId, name: name, description: description }
      setTaskId(taskId + 1)
      const newTasks = [...tasks, newTask]
      setTasks(newTasks)
      event.target.reset()
      toast.success("Task Added Successfully...!")
    }
  }


  const handleDeleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
    toast.success("Task Deleted Successfully...!")
  }

  const handleCompleteTask = id => {
    const task = tasks.find(task => task.id === id)
    const newCompleteTask = [...completeTask, task]
    setCompleteTask(newCompleteTask)
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
    toast.success("Task Completed Successfully...!")
  }


  return (
    <>
      <div className="to-do-app-wrapper min-h-screen py-20 bg-slate-200">
        <div className="flex justify-center items-center h-[75vh]">
          <div className="grid grid-cols-1 md:gird-cols-3 lg:grid-cols-3 gap-8 max-w-[991px] w-full">

            <div className="shadow-lg rounded-lg p-6 bg-green-400">
              <h2 className="text-center text-3xl font-bold mb-7 text-white">Add New Task</h2>
              <form onSubmit={handleAddTask}>
                <input type="text"
                  className="mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                  placeholder="Task Name"
                  name="name"
                />
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="5"
                  className="mb-3 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                  placeholder="Task Description"
                ></textarea>

                <input type="submit" value="ADD" className="px-7 py-2 bg-cyan-600 text-white border-none outline-none shadow-lg rounded cursor-pointer" />

              </form>
            </div>

            <div className="shadow-lg rounded-lg p-6 bg-indigo-400">
              <h2 className="text-center text-3xl font-bold mb-7 text-white">Tasks In Progress</h2>
              {
                tasks.map(task => <>
                  <div key={task.id} className="my-4 p-4 bg-gray-300 rounded-md flex items-center justify-between">
                    <div>
                      <span className='text-xs'>{task?.name}</span>
                      <p className='text-sm'>{task?.description}</p>
                    </div>
                    <div>
                      <button className='bg-red-500 p-1 mr-2 rounded text-white'
                        onClick={() => handleDeleteTask(task?.id)}
                      >x</button>
                      <button className='bg-green-500 p-1 rounded text-white'
                        onClick={() => handleCompleteTask(task?.id)}
                      >Complete</button>
                    </div>
                  </div>
                </>)
              }
            </div>

            <div className="shadow-lg rounded-lg p-6 bg-yellow-400">
              <h2 className="text-center text-3xl font-bold mb-7 text-white">Complete Tasks</h2>
              {
                completeTask.map(task => <>
                  <div key={task.id} className="my-4 p-4 bg-gray-300 rounded-md flex items-center justify-between">
                    <div>
                      <span className='text-xs'>{task?.name}</span>
                      <p className='text-sm'>{task?.description}</p>
                    </div>
                  </div>
                </>)
              }
            </div>

          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
