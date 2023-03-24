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
    <>
      <h2>Users</h2>

      <div className="user-names-container">
        {users.map((user, index) => {
          return (
            <>
              {" "}
              <Link href="/post/userId" className="user-names">
                <p key={index}>{user.name}</p>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}
