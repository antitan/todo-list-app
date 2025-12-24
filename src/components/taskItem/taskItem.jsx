import styles from "./TaskItem.module.css";

export const TaskItem = ({ task, updateTaskStatus, deleteTask, completed }) => {

  return <li onClick={()=>updateTaskStatus(task.id, !completed)} 
            className={`${styles.container} ${task.completed?styles.success: styles.default}`}>
              <div className={styles.item}>
                <div className={`${styles.id} ${task.completed?styles.success: styles.idDefault}`}>
                  {task.id}
                </div>
                <div className={task.completed?styles.contentSuccess: styles.contentDefault}>
                  {task.title}          
                </div>
              </div>
          <button onClick={(event)=>{
                            event.stopPropagation(); 
                            deleteTask(task.id);}}
                           className="button-primary">X</button>
        </li>;
};
