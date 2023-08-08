import TaskItem from '../components/TaskItem';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, filteredTasks, deleteTask, toggleTask, enterEditMode }) => {

  return (
    <ul className={styles.tasks}>
      {
        filteredTasks.sort((a, b) => b.timestamp - a.timestamp).map(task => ( // Sort task items by reverse chronological order, map through them, and display them
          <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
          />
        ))
      }
    </ul>
  );
  
}
 
export default TaskList;