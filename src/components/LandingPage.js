import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <main className={styles.main}>
        <h2>Keep Your Tasks Organized</h2>
        <p>Manage your daily tasks efficiently.</p>
        <Link to="/todolist" className={styles.ctaButton}>
          Go to Todo List
        </Link>
      </main>
      <footer className={styles.footer}>
        <p>Made with ❤️ by codethedream.org students</p>
        <p>Contact us at info@todolistapp.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
