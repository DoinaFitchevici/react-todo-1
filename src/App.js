import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TodoContainer from "./components/TodoContainer";
import TaskGeneration from "./components/TaskGeneration";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todolist" element={<TodoContainer />} />
        <Route path="/new" element={<h1>New Todo List</h1>} />
        <Route path="/generate-tasks" element={<TaskGeneration />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
