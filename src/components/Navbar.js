import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import style from "./TodoListItem.module.css";
import SvgLogo from "./SvgLogo";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <SvgLogo height="50px" width="50px" />
      <div className={styles.navLinks}>
        <Link
          to="/home"
          className={`${style.button} ${styles.buttonWithMargin}`}
        >
          Home
        </Link>
        {/* Add more navigation links here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;
