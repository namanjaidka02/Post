import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UserId() {
  const router = useRouter();
  const userId = router.query.userId;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [post, updatePost] = useState("");
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    console.log(userId, users);
    const data = users.find((user) => {
      return user.id === parseInt(userId);
    });
    if (data) setCurrentUser(data);
    console.log(data);
  }, [users]);

  const handleSubmit = () => {};

  return (
    <div className="post-container">
      <h1 className="user-name">{currentUser?.name}</h1>
      <input
        type="text"
        className="post-input"
        value={post}
        onChange={(e) => updatePost(e.target.value)}
      />
      <input
        type="submit"
        onSubmit={handleSubmit}
        className="submit-post"
        value="Create Post"
      />
    </div>
  );
}

export default UserId;
