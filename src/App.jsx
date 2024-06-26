import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import UserList from "./components/UserList";
import Topics from "./components/Topics";
import NotFound from "./components/NotFound";
import TopicList from "./components/TopicList";
import Starting from "./components/Starting";

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

  return (
    <>
      <Header username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Starting />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route
          path="/articles/:article_id"
          element={<ArticleDetail username={username} />}
        />
        <Route
          path="/login"
          element={<UserList onSelectUser={handleUserSelect} />}
        ></Route>
        <Route path="/coding" element={<TopicList topic="coding" />}></Route>
        <Route
          path="/football"
          element={<TopicList topic="football" />}
        ></Route>
        <Route path="/cooking" element={<TopicList topic="cooking" />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
