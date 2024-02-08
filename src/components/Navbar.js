import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import style from "./TodoListItem.module.css";
import logo from "../todo.svg";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Todo Logo" className={styles.logo} />
      <div className={styles.navLinks}>
        <Link to="/" className={`${style.button} ${styles.buttonWithMargin}`}>
          Home
        </Link>
        {/* Add more navigation links here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;
