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
    const newUser = {
      name: name,
    };
    alert(`your name is ${name}`);

    localStorage.setItem("users", JSON.stringify(users));
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  const isDisabled = name.trim() === "" || email.trim() === "";
  return (
    <>
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
    </>
  );
}
