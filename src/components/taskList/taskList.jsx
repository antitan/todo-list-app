import styles from "./TaskList.module.css";
import { TaskItem } from '../taskItem/taskItem'

export const TaskList = ({ taskList, incompletedTasks, updateTaskStatus, deleteTask, isLoading }) => 
{
    if (isLoading) 
    {
        return <div className="box">
            <h2 className={styles.title}>
                Chargement des taches...
            </h2>
        </div>;
    }

    if (taskList && taskList.length > 0) 
    {
        return <div className="box">
            <h2 className={styles.title}>
                {incompletedTasks > 0 && (
                    <> Il reste {incompletedTasks} taches a faire</>
                )}
                {incompletedTasks == 0 && (
                    <> Toutes les taches sont terminées</>
                )}
            </h2>

            <ul className={styles.container}>
                {taskList.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        completed={task.completed}
                        updateTaskStatus={updateTaskStatus}
                        deleteTask={deleteTask}
                    />
                ))}
            </ul>
        </div>;
    }
}