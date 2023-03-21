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
        <Link href="/post/Post" className="user-names">
          {users.map((user, index) => {
            return (
              <>
                <p key={index}>{user.name}</p>
              </>
            );
          })}
        </Link>
      </div>
    </>
  );
}
