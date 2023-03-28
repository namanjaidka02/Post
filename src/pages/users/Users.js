import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  return (
    <div className="users-container">
      <div className="h2">
        <h2>Users</h2>
      </div>

      <div className="user-names-container">
        {users.map((user, index) => {
          return (
            <div key={index}>
              {" "}
              <Link href={`/UserId/${user.id}`} className="user-names">
                <li>{user.name}</li>
                <p>{user.email}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
