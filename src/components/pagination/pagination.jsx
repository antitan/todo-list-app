import styles from "./Pagination.module.css";

export const Pagination = ({ todosPerPage, totalTodos, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const paginate = (pageNumber, event) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={(event) => paginate(number, event)}
              href="#"
              className={`${styles.link} ${currentPage === number ? styles.active : ""}`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};