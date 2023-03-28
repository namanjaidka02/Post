import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = users.length < 1 ? 0 : users[users.length - 1].id + 1;
    const newUser = {
      id: userId,
      name: name,
      email: email,
    };
    alert(`your name is ${name}`);
    const newUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
    setName("");
    setEmail("");
  };

  const isDisabled = name.trim() === "" || email.trim() === "";
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="name-input"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          className="email-input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="submit"
          disabled={isDisabled}
          className="submit-input"
          value="create user"
        />

        <h3>
          <Link href="/users/Users" className="user-btn">
            Users
          </Link>
        </h3>
      </form>
    </div>
  );
}
