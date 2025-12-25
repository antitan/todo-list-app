import { Header } from '../components/header/header'
import { TaskInput } from '../components/taskInput/taskInput'
import { TaskList } from '../components/taskList/taskList'
import { Footer } from '../components/footer/footer' 
import { useEffect, useState } from 'react';
import { fetchTodos, createTodo, removeTodo, updateTodoStatus } from '../services/todoService';


export const TaskContainer = () => {

    const [taskList, setTaskList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
 
    useEffect(() => 
    {
        const loadTodos = async () => 
        {
            try 
            {
                const todos = await fetchTodos();
                setTaskList(todos);
            } 
            catch (error) {
                console.error('Erreur lors du chargement des todos', error);
            } 
            finally {
                setIsLoading(false);
            }
        }; 
        loadTodos();
    }, []);

    const addNewTask = async (title) => 
    {
        if (!title.trim()) return;

        try 
        {
            const newTask = await createTodo({ title: title.trim() });
            setTaskList(prev => [...prev, newTask]);
        } 
        catch (error) {
            console.error('Erreur lors de la creation de la tache', error);
        }
    };

    const updateTaskStatus = async (id, completedValue) => 
    {
        try 
        {
            const updatedTask = await updateTodoStatus({ id, completed: completedValue });
            setTaskList(prev => prev.map(t => (t.id === id ? updatedTask : t)));
        } 
        catch (error) {
            console.error("Erreur lors de la mise à jour du statut", error);
        }
    };
 
    const deleteTask = async (id) => 
    { 
        try 
        {
            await removeTodo(id);
            const filteredTasks = taskList.filter((task) => task.id !== id);
            setTaskList(filteredTasks);
        } 
        catch (error) {
            console.error('Erreur lors de la suppression de la tache', error);
        }
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
            isLoading={isLoading}

        />
        <Footer completedTasks={completedTasks} />
    </main>;
};