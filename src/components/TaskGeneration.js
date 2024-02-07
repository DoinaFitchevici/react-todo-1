import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./TodoListItem.module.css";

const TaskGeneration = () => {
  // State to store the generated tasks
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Function to generate tasks using the OpenAI API
  const generateTasks = async () => {
    // Prompt to send to the OpenAI API
    const prompt =
      "Generate 5 creative and engaging tasks for a todo list application.";

    // Set the OpenAI API endpoint and headers
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
    const apiHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    // Set the request body
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    };

    // Make the request to the OpenAI API
    const response = await axios.post(apiEndpoint, requestBody, {
      headers: apiHeaders,
    });

    // Extract tasks from the API response
    const tasks = response.data.choices[0].message.content.split("\n");

    // Update the state with the generated tasks
    setGeneratedTasks(tasks);
  };

  // Render a button to trigger task generation and display the generated tasks
  return (
    <div>
      <div className={styles.positionRelative}>
        <Link to="/" className={`${styles.button} ${styles.buttonWithMargin}`}>
          Home
        </Link>
      </div>
      <button onClick={generateTasks} className={styles.button}>
        Generate Tasks
      </button>
    </div>
  );
};

export default TaskGeneration;
