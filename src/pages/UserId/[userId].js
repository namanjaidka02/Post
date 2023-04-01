import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UserId() {
  const router = useRouter();
  const userId = router.query.userId;
  // const [users, setUsers] = useState(() =>
  //   typeof window !== "undefined"
  //     ? localStorage.getItem("users")
  //       ? JSON.parse(localStorage.getItem("users"))
  //       : null
  //     : null
  // );
  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [userPost, setUserPost] = useState([]);

  // useEffect(() => {
  //   const storedUsers = localStorage.getItem("users");
  //   if (storedUsers) {
  //     setUsers(JSON.parse(storedUsers));
  //     console.log(users);
  //   }
  // }, []);

  useEffect(() => {
    console.log(users);
    console.log(userId);
    const data = users.find((user) => {
      return user.id === parseInt(userId);
    });
    if (data) setCurrentUser(data);
  }, [users]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("userPost");
    if (storedPosts) {
      setUserPost(JSON.parse(storedPosts));
    }

    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [router.isReady]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postId =
      userPost.length < 1 ? 0 : userPost[userPost.length - 1].id + 1;
    const newPost = {
      id: postId,
      post: postInput,
    };
    setUserPost([...userPost, newPost]);
    localStorage.setItem("userPost", JSON.stringify(userPost));

    setPosts([...posts, postInput]);
    setPostInput("");
  };

  const handleDelete = (post) => {
    setUserPost(
      userPost.filter((e) => {
        return e !== post;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("userPost", JSON.stringify(userPost));
  }, [userPost]);

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
        {userPost.map((post, index) => {
          return (
            <div className="posts" key={index}>
              <p className="p">{post.post}</p>
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
