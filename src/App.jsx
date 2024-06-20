import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import UserList from "./components/UserList";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleUserSelect = (selectedUsername) => {
    setUsername(selectedUsername);
    localStorage.setItem("username", selectedUsername);
  };

  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("username");
  };
  //console.log(username, "<<<<< app.jsx");
  return (
    <>
      <Header username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/"></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route
          path="/articles/:article_id"
          element={<ArticleDetail username={username} />}
        />
        <Route
          path="/login"
          element={<UserList onSelectUser={handleUserSelect} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
