import { useState } from "react";
import axios from "axios";
import styles from "./TodoListItem.module.css";

const Chat = () => {
  // State to store the chat message
  const [message, setMessage] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;

  // State to store the response message
  const [response, setResponse] = useState("");

  // Function to send a chat message to the OpenAI API
  const sendMessage = async () => {
    // Set the OpenAI API endpoint and headers
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
    const apiHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    // Set the request body
    const requestBody = {
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    };

    // Make the request to the OpenAI API
    const response = await axios.post(apiEndpoint, requestBody, {
      headers: apiHeaders,
    });

    // Extract the response message
    const responseMessage = response.data.choices[0].message.content;

    // Update the response state with the new message
    setResponse(responseMessage);
  };

  // Render a text input and a button to send a message, and display the response message
  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage} className={styles.button}>
        Send
      </button>
      <p>{response}</p>
    </div>
  );
};

export default Chat;
