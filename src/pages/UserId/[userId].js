import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UserId() {
  const router = useRouter();
  const userId = router.query.userId;

  const [currentUser, setCurrentUser] = useState(null);
  const [postInput, setPostInput] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const allPostsData = localStorage.getItem("posts");

    if (allPostsData) {
      setAllPosts(JSON.parse(allPostsData));
    }

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const currentUserData = JSON.parse(storedUsers).find((user) => {
        return user.id === parseInt(userId);
      });
      if (currentUserData) setCurrentUser(currentUserData);
    }
  }, [router.isReady]);

  useEffect(() => {
    const userPosts = allPosts.filter((post) => {
      return post.userId === parseInt(userId);
    });
    if (userPosts) {
      setUserPosts(userPosts);
    }
  }, [allPosts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postId =
      allPosts.length < 1 ? 0 : allPosts[allPosts.length - 1].id + 1;
    const newPost = {
      id: postId,
      post: postInput,
      userId: parseInt(userId),
    };

    const updatedAllPosts = [...allPosts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedAllPosts));
    setAllPosts(updatedAllPosts);
    setPostInput("");
  };

  const handleDelete = (post) => {
    const updatedAllPosts = allPosts.filter((e) => {
      return e !== post;
    });
    localStorage.setItem("posts", JSON.stringify(updatedAllPosts));
    setAllPosts(updatedAllPosts);
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
        {userPosts.map((post, index) => {
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
