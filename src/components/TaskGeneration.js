import { useState } from "react";
import axios from "axios";
import styles from "./TodoListItem.module.css";
import ReactMarkdown from "react-markdown";

const TaskGeneration = () => {
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const generateTasks = async () => {
    const prompt =
      "Generate 5 creative and engaging tasks for a todo list application.";
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
    const apiHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };

    try {
      const response = await axios.post(apiEndpoint, requestBody, {
        headers: apiHeaders,
      });
      const tasks = response.data.choices[0].message.content.split("\n");
      setGeneratedTasks(tasks);
    } catch (error) {
      console.error("Error generating tasks: ", error);
    }
  };

  return (
    <div>
      <button onClick={generateTasks} className={styles.button}>
        Generate Tasks
      </button>
      <div className={styles.container}>
        {generatedTasks.map((task, index) => (
          // Assuming you want to treat each task as markdown content
          <ReactMarkdown
            key={index}
            children={task}
            className={styles.taskItem}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskGeneration;
