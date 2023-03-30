import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UserId() {
  const router = useRouter();
  const userId = router.query.userId;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([]);

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
    // console.log(data);
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, postInput]);
    setPostInput("");
  };

  const handleDelete = (post) => {
    setPosts(
      posts.filter((e) => {
        return e !== post;
      })
    );
  };

  return (
    <div className=" user-post-container">
      <h1 className="user-name">{currentUser?.name}</h1>
      <form className="add-post" onSubmit={handleSubmit}>
        <input
          type="text"
          className="post-input"
          value={postInput}
          onChange={(e) => setPostInput(e.target.value)}
        />
        <input type="submit" className="submit-post" value="Create Post" />
      </form>
      <div className="post-container">
        {posts.map((post, index) => {
          return (
            <div className="posts" key={index}>
              <p className="p">{post}</p>
              <button onClick={() => handleDelete(post)} className="rmv-btn">
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserId;
