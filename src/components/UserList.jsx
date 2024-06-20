import React, { useState, useEffect } from "react";
import { getUser } from "../api";
import Loading from "./Loading";

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then((usersData) => {
        //console.log(usersData);
        setUsers(usersData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, []);

  const handleLogin = (user) => {
    setSelectedUser(user);
    console.log(`User ${user.username} logged in.`);
    onSelectUser(user.username);
  };

  return (
    <div>
      <h2>User Login</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              <button onClick={() => handleLogin(user)}>{user.username}</button>
            </li>
          ))}
        </ul>
      )}
      {selectedUser ? <p>Logged in as: {selectedUser.username}</p> : null}
    </div>
  );
}
