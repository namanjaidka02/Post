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

  // useEffect(() => {
  //   const storedUsers = localStorage.getItem("users");
  //   if (storedUsers) {
  //     setUsers(JSON.parse(storedUsers));
  //     console.log(users);
  //   }
  // }, [router.isReady]);
  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [postInput, setPostInput] = useState("");
  const [allPosts, setAllPosts] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("userPost")
        ? JSON.parse(localStorage.getItem("userPost"))
        : []
      : []
  );
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    if (allPosts.length) {
      const userPost = allPosts.filter((post) => {
        // console.log(typeof post.userId, typeof userId);
        // console.log(post.userId === parseInt(userId));
        return post.userId === parseInt(userId);
      });
      console.log(userPost);
      if (userPost) {
        setUserPost(userPost);
      }
    }

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [router.isReady]);

  useEffect(() => {
    const data = users.find((user) => {
      return user.id === parseInt(userId);
    });
    if (data) setCurrentUser(data);
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postId =
      userPost.length < 1 ? 0 : userPost[userPost.length - 1].id + 1;
    const newPost = {
      id: postId,
      post: postInput,
      userId: parseInt(userId),
    };

    setUserPost([...userPost, newPost]);
    localStorage.setItem("userPost", JSON.stringify(userPost));

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
    console.log(allPosts);
    localStorage.setItem("userPost", JSON.stringify(userPost));
  }, [allPosts]);

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
