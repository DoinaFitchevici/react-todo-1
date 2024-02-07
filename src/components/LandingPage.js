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
      <main className={styles.main}>
        <h2>Create AI List</h2>
        <p>Text generation models</p>
        <Link to="/generate-tasks" className={styles.ctaButton}>
          Generate Tasks
        </Link>
      </main>
      <main className={styles.main}>
        <h2>Create Chat Completion</h2>
        <p>
          Given a list of messages comprising a conversation, the model will
          return a response.
        </p>
        <Link to="/chat" className={styles.ctaButton}>
          Chat with AI
        </Link>
      </main>
      <footer className={styles.footer}>
        <p>Made with ❤️ by codethedream.org students</p>
        <p>
          Contact us at{" "}
          <a href="https://devarts.notion.site/devarts/61c6b79808ce476290c753165851b070?v=9d442848a814451fba7a2e1b99bebb9b">
            DevArts
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
