// Ce composant est utilisé pour afficher le champ de saisie de tâche.

import { useState } from "react";
import styles from "./TaskInput.module.css";

export const TaskInput = ({ addNewTask }) => {

    const [taskTitle, setTaskTitle] = useState("")

    const handleinputChangeEvent = (e) => {
        setTaskTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) {
            return;
        }
        addNewTask(taskTitle);
        setTaskTitle("");
    }

    return (<div className={`box ${styles.element}`}>
        <h2 className={styles.title}>Ajouter nouvelle tache</h2> 
            <form className={styles.container} onSubmit={handleSubmit}>
                <input type="text"
                    className={styles.input}
                    placeholder="Tache"  
                    onChange={handleinputChangeEvent}
                    value={taskTitle}/>

                    <button className="button-primary" type="submit">
                        Ajouter
                    </button>
            </form>
    </div>);
};