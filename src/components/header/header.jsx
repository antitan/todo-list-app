// Ce composant est utilisé pour afficher l'en-tête de l'application.
import styles from "./Header.module.css";
import reactLogo from '../../assets/react.svg'

export const Header = () => {
  return <div className={styles.container}>
    <div className={styles.titleContainer}>
      <img src={reactLogo} width={50} height={50} />
      <div>
        <h1>Liste des taches</h1>
        <div className="color-gray">
          <code>Gérez vos taches</code>
        </div>
      </div>
    </div>
    <code className="color-primary">
    
    </code>
  </div>;
};

 