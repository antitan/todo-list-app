import { Header } from '../components/header/header'
import { TaskInput } from '../components/taskInput/taskInput'
import { TaskList } from '../components/taskList/taskList'
import { Pagination } from '../components/pagination/pagination'
import { Footer } from '../components/footer/footer' 
import { useEffect, useState } from 'react';
import { fetchTodos, createTodo, removeTodo, updateTodoStatus } from '../services/todoService'; 


export const TaskContainer = () => {
 
    const [taskList, setTaskList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalTodos, setTotalTodos] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 5;
 
    useEffect(() => 
    {
        setIsLoading(true);
        const loadTodos = async () => 
        {
            try 
            { 
                const { todos, total } = await fetchTodos({ page: currentPage, pageSize: todosPerPage });
                setTaskList(todos);
                setTotalTodos(total);
            } 
            catch (error) {
                console.error('Erreur lors du chargement des todos', error);
            } 
            finally {
                setIsLoading(false);
            }
        }; 
        loadTodos(); 
    }, [currentPage, todosPerPage]);

     const addNewTask = async (title) => 
    {
        if (!title.trim()) return;

        try 
        {
            const newTask = await createTodo({ title: title.trim() });
            setTaskList(prev => [...prev, newTask]);
            setTotalTodos(prev => prev + 1);
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
            setTotalTodos(prev => Math.max(0, prev - 1));
            if (filteredTasks.length === 0 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            }
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
        <Pagination
            todosPerPage={todosPerPage}
            totalTodos={totalTodos}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
        <Footer completedTasks={completedTasks} />
    </main>;
};