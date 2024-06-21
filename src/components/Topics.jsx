import { fetchTopics } from "../api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
export default function Topics() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetchTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  return (
    <div className="topics-container">
      <h1>Topics</h1>
      {topics.length === 0 ? (
        <Loading />
      ) : (
        <ul className="topics-list">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link to={`/${topic.slug}`}>{topic.slug}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
