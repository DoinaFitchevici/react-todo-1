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
        <h2>Create List with AI</h2>
        <p>Spark Ideas with text generation models</p>
        <Link to="/generate-tasks" className={styles.ctaButton}>
          Generate Tasks
        </Link>
      </main>
      <main className={styles.main}>
        <h2>AI-Powered Chat Assistant</h2>
        <p>
          Engage with our AI-Powered Chat Assistant, designed to understand your
          queries and provide responses using advanced text generation models.
          This feature allows you to interact in a conversational manner,
          getting assistance, generating task lists, and finding information
          within the application. Whether you need help organizing your tasks,
          looking for suggestions, or just want to explore AI capabilities, our
          chat assistant is here to enhance your productivity and make your
          experience more interactive. Simply type your message and let our AI
          do the rest, offering you insights and support in real-time.
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
