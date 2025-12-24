 
import styles from "./Footer.module.css";


export const Footer = ({completedTasks}) => {
  if(completedTasks && completedTasks > 0)
  {
      return (
      <footer>
        <code className={styles.footer}>
        {completedTasks} taches terminées
        </code>
      </footer>
      );
  }  
  else return <></>;
};
