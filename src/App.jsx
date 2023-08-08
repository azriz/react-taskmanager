import { useState, useEffect } from 'react';
import EditForm from './components/EditForm';
import Form from './components/Form';
import TaskList from './components/TaskList';

function App() {

  // Setting up states //

    const [tasks, setTasks] = useState([]);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [previousFocusEl, setPreviousFocusEl] = useState(null);
    const [status, setStatus] = useState("all");
    const [filteredTasks, setFilteredTasks] = useState([]);

  // UseEffect instances //

    // Single useEffect to get localstorage task state only once on first page load
    useEffect(() => {
      getLocalTasks();
    }, []);

    // Another useEffect to run these functions upon change of 'task' state and 'status' state only
    useEffect(() => {
      filterHandler();
      saveLocalTasks();
    }, [tasks, status]);

  // Functions //

    // Add a new task entry
    const addTask = (task) => {
      setTasks(prevState => [...prevState, task])
    }

    // Delete a task entry
    const deleteTask = (id) => {
      setTasks(prevState => prevState.filter(task => task.id !== id));
    }

    // Toggle a task's 'completed' status
    const toggleTask = (id) => {
      setTasks(prevState => prevState.map(task => ( task.id === id ? { ...task, checked: !task.checked } : task )));
    }

    // Update a task entry using the Edit Form
    const updateTask = (task) => {
      setTasks(prevState => prevState.map(newTask => ( newTask.id === task.id ? { ...newTask, name: task.name } : newTask )));
      closeEditMode();
    }

    // Enter Edit Mode to edit a task entry
    const enterEditMode = (task) => {
      setEditedTask(task);
      setIsEditing(true);
      setPreviousFocusEl(document.activeElement);
    }

    // Close Edit Mode when done
    const closeEditMode = () => {
      setIsEditing(false);
      previousFocusEl.focus();
    }

    // Handle the 3 possible status identifiers and update state based on chosen status
    const filterHandler = () => {
      switch(status) {
        case "completed":
          setFilteredTasks(tasks.filter(task => task.checked === true));
          break;
        case "incomplete":
          setFilteredTasks(tasks.filter(task => task.checked === false));
          break;
        default:
          setFilteredTasks(tasks);
          break;
      }
    }

    // Store tasks state in localstorage
    const saveLocalTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Retrieve tasks from localstorage and update state with these tasks
    const getLocalTasks = () => {
      if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", JSON.stringify([]));
      }
      else {
        let tasksLocal = JSON.parse(localStorage.getItem("tasks")); // Parsing as JSON since LocalStorage stores as a string
        if (tasksLocal.length === 0) {
          return null;
        }
        setTasks(tasksLocal);
      }
    } 

    return (
      <>
        <div className="container">
          <header>
            <h1>My tasks</h1>
          </header>
          {isEditing && (<EditForm
              editedTask={editedTask}
              updateTask={updateTask}
              closeEditMode={closeEditMode} 
            />)}
          <Form
            addTask={addTask} 
            setStatus={setStatus}
          />
          {tasks && (<TaskList
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              enterEditMode={enterEditMode}
              setStatus={setStatus}
              filteredTasks={filteredTasks}
            />)}
        </div>
      </>
    );

}

export default App
