import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TitleTasks from "./components/TitileTask";

import "./app.css";

function App() {
  const [inputName, setInputName] = useState("");
  // const [info, setInfo] = useState(INFOTASKS);
  const [filterParams, setFilterParams] = useState(null);
  const [error, setError] = useState(); // состояние ошибки
  const [TasksData, setTasksData] = useState([]); // получение и состояние данных

  //Get запрос
  const fetchData = async () => {
    try {
      const response = await fetch("https://easydev.club/api/v1/todos");
      const { data } = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      setTasksData(data);
    } catch (error) {
      setError({
        message: error.message || "Could not fetch data, please try again", //тут не выводится(разобраться)
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // POST

  const addTask = async () => {
    // if (!inputName.trim()) return;
    if (!inputName.trim() || inputName.length < 2 || inputName.length > 62)
      return alert("Ошибка: Имя должно содержать от 2 до 62 символов.");

    const newTask = {
      title: inputName,
      isDone: false,
    };

    try {
      const response = await fetch("https://easydev.club/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed add Task");
      }

      await fetchData();
      setInputName("");
    } catch (error) {
      console.error(error);
    }
  };

  const removeTask = async (id) => {
    try {
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasksData((prevTask) => prevTask.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи", error);
    }
  };

  const updateTask = async (id, updatedTitle, updatedDone) => {
    const updatedTask = { title: updatedTitle, isDone: updatedDone };

    try {
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: "PUT", // используем PATCH для частичного обновления
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      await fetchData();
    } catch (error) {
      console.error("ошибка при обновлении задачи", error);
    }
  };
  if (error) {
    return <h1>Ошибка обработки данных |{error.message}</h1>;
  }

  return (
    <div className="App">
      <div className="backgroundapp">
        <Header
          inputName={inputName}
          setInputName={setInputName}
          addTask={addTask}
        />
        <TitleTasks info={TasksData} setFilterParams={setFilterParams} />
        <Tasks
          info={TasksData}
          updateTask={updateTask}
          removeItem={removeTask}
          filterParams={filterParams}
        />
      </div>
    </div>
  );
}

export default App;
