import {Header} from '../components/header/header'
import {TaskInput} from '../components/taskInput/taskInput'
import { TaskList} from '../components/taskList/taskList'
import { Footer} from '../components/footer/footer'
import { useState } from 'react';



export const TaskContainer = () => {

const [taskList,setTaskList] = useState([])

const addNewTask=(title) =>
{
  const newTask = {
    id : taskList.length? taskList[taskList.length -1].id +1 : 1,
    title:title,
    completed : false
  };
  setTaskList([...taskList,newTask])
}

const updateTaskStatus = (id, completedValue)=>   
{
  const updatedTasks = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, completed: completedValue };
    }
    return task;
  });
  setTaskList(updatedTasks);
}

const deleteTask = (id) =>
{
  console.log("deleteTask id :", id); 
  const filteredTasks = taskList.filter((task) => task.id !== id);
  setTaskList (filteredTasks);
}

//ca c'est degeux je trouve mais bon...
const completedTasks = taskList.filter(t => t.completed).length;
const incompletedTasks = taskList.length - completedTasks;
 

  return <main>
     <Header />
     <TaskInput addNewTask={addNewTask} />
     <TaskList taskList={taskList} 
               incompletedTasks={incompletedTasks}   
               updateTaskStatus={updateTaskStatus} 
               deleteTask={deleteTask} 
                
                 />
     <Footer  completedTasks={completedTasks} />
  </main>;
};
