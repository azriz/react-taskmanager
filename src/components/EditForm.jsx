import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {

  // Setting up states //

    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

  // UseEffect instances //

    // Upon closeEditMode as the dependency, close the Edit modal if the Escape key is pressed, then remove EventListener
    useEffect(()=> {
      const closeModalIfEscaped = (e) => {
        e.key === "Escape" && closeEditMode();
      }

      window.addEventListener('keydown', closeModalIfEscaped)

      return () => {
        window.removeEventListener('keydown', closeModalIfEscaped)
      }
    }, [closeEditMode])

  // Functions //
  
    // Handle form submission to edit a task, and update task name with new task name
    const handleEditFormSubmit = (e) => {
      e.preventDefault();
      updateTask({...editedTask, name: updatedTaskName});
    }

    return (
      <div role="dialog" aria-labelledby="editTask" onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}>
        <form
        className="todo"
        onSubmit={handleEditFormSubmit}>
          <div className="wrapper">
            <input
              type="text"
              id="task"
              className="input"
              value={updatedTaskName}
              onInput={(e) => setUpdatedTaskName(e.target.value)}
              required
              autoFocus
              maxLength={80}
              placeholder="Update task"
              />
            <label
              htmlFor="task"
              className="label"
              >Enter New Task Name</label>
          </div>
          <button
            className="btn"
            aria-label="Update task"
            type="submit"
            >
            <CheckIcon strokeWidth={2} width={24} height={24} />
          </button>
        </form>
      </div>
    );

}
 
export default EditForm;