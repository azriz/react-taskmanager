import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'; // Installed UUIDV4 for random ID generation
import { PlusIcon } from '@heroicons/react/24/solid';

const Form = ({ addTask, setStatus }) => {

  // Setting up states //

    const [task, setTask] = useState("");

    // Handling the form submission to add a new task entry
    const handleFormSubmit = (e) => {
      e.preventDefault();
      addTask({
        id: `reminder-${uuidv4()}`, // Auto generate IDs using UUIDV4 with custom prefix (could also be '"reminder-"+uuidv4()';)
        name: task,
        checked: false,
        timestamp: Date.now()
      });
      setTask("");
    }

   // Functions //

    // Set 'status' state to chosen status item
    const statusHandler = (e) => {
      setStatus(e.target.value);
    }

    return (
      <div>
        <form
        className="todo"
        onSubmit={handleFormSubmit}>
          <div className="wrapper">
            <input
              type="text"
              id="task"
              className="input"
              value={task}
              onInput={(e) => setTask(e.target.value)}
              required
              autoFocus
              maxLength={80}
              placeholder="Enter task"
              />
            <label
              htmlFor="task"
              className="label"
              >Enter Task</label>
          </div>
          <button
            className="btn"
            aria-label="Add task"
            type="submit"
            >
            <PlusIcon/>
          </button>
        </form>
        <div className="select">
          <p>Filter:</p>
            <select name="tasks" className="filter-tasks" onChange={statusHandler}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
            </select>
        </div>
      </div>
    );

}
 
export default Form;