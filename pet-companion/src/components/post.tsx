// Remove unused import import React from "react";
import { useState, useEffect } from "react";
import pawsImg from "../assets/paw-likes.png";
import { useAuth } from "../components/auth-context";
import { useNavigate } from "react-router-dom";

// Usually in TS interfaces are not named with I prefix
// https://ts.dev/style/#naming-style
/* Do not mark interfaces specially (IMyInterface or MyFooInterface) unless it's idiomatic in its environment.
 When introducing an interface for a class, give it a name that expresses why the interface exists
in the first place (e.g. class TodoItem and interface TodoItemStorage
if the interface expresses the format used for storage/serialization in JSON).*/
interface IPost {
  id: string;
  title: string;
  username: string;
  content: string;
  photo?: string;
  likes?: number;
  petType: string;
}

interface IPost {
  // Rename to PostProps since this defines component props, not data structure
  id: string;
  title: string;
  username: string;
  content: string;
  photo?: string;
  likes?: number;
  petType: string; // This prop is never used in the component - remove if not needed
}

const Post = ({
  id,
  title,
  username,
  content,
  photo,
  likes = 0,
  petType, // Remove if not needed
}: IPost) => {
  const { user, updateUser } = useAuth();

  const [likeCounter, setLikeCounter] = useState(likes);
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const isOwner = user?.username === username;
  const handleUsernameClick = () => {
    navigate(`/profile/${username}`);
  };
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("postLikes") || "{}");
    if (storedLikes[id]) {
      setLikeCounter(storedLikes[id]);
    }

    if (user) {
      const likedPosts = JSON.parse(
        localStorage.getItem(`${user.username}-likes`) || "[]"
      );
      if (likedPosts.includes(id)) setLiked(true);
      const skippedPosts = JSON.parse(
        localStorage.getItem(`${user.username}-skipped`) || "[]"
      );
      if (skippedPosts.includes(id)) setVisible(false);
    }
  }, [id, user]);

  const handleLike = () => {
    if (!user || isOwner) return;

    const likedPosts = JSON.parse(
      localStorage.getItem(`${user.username}-likes`) || "[]"
    );

    if (!likedPosts.includes(id)) {
      const newLikeCount = likeCounter + 1;
      setLikeCounter(newLikeCount);
      setLiked(true);

      likedPosts.push(id);
      localStorage.setItem(
        `${user.username}-likes`,
        JSON.stringify(likedPosts)
      );

      const storedLikes = JSON.parse(localStorage.getItem("postLikes") || "{}");
      storedLikes[id] = newLikeCount;
      localStorage.setItem("postLikes", JSON.stringify(storedLikes));

      const newUserData = { ...user, xp: user.xp + 3 };
      updateUser(newUserData);
    }
  };

  const handleSkip = () => {
    if (!user) return;
    setVisible(false);
    const skippedPosts = JSON.parse(
      // ERROR HANDLING: JSON.parse can throw error
      localStorage.getItem(`${user.username}-skipped`) || "[]"
    );
    if (!skippedPosts.includes(id)) {
      skippedPosts.push(id);
      localStorage.setItem(
        `${user.username}-skipped`,
        JSON.stringify(skippedPosts)
      );
    }
  };

  if (!visible) return null;

  return (
    <div
      className="card mb-3"
      style={{ width: "1000px", border: "1px solid #E0E0E0" }} // Same comment as earlier - move inline styles to CSS file or styled-components
    >
      <div className="row g-0">
        {photo && (
          <div style={{ width: 200, height: "100%" }}>
            {/*  Move to CSS */}
            <img
              src={photo}
              alt={title}
              style={{
                // Move to CSS
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.25rem 0 0 0.25rem",
              }}
            />
          </div>
        )}
        <div
          className={
            photo ? "col-md-8 d-flex flex-column" : "col-12 d-flex flex-column" // These styles are better moved to a separate const instead of magic strings
          }
        >
          <div
            className="card-body d-flex flex-column"
            style={{ height: "100%", textAlign: "left" }} // Move to CSS
          >
            <h4 className="card-title">{title}</h4>
            <p
              style={{
                // Move to CSS
                fontSize: "13px",
                cursor: "pointer",
                display: "inline-block",
              }}
              onClick={handleUsernameClick}
            >
              @{username}
            </p>
            <p className="card-text" style={{ fontSize: "16px" }}>
              {content}
            </p>

            <div style={{ marginTop: "auto" }}>
              {/* Move to CSS */}
              <div className="d-grid gap-2 d-md-block mb-2">
                <p className="card-text mb-0">
                  <small className="text-body-secondary">
                    Likes: {likeCounter}
                  </small>
                </p>

                <button
                  className="btn btn-primary me-2"
                  id="btn-like" //  ID should be unique but this repeats for each post - use id={`btn-like-${id}`}
                  type="button"
                  onClick={handleLike}
                  disabled={liked || isOwner}
                >
                  <img src={pawsImg} alt="paws" width={15} height={15} /> Like
                </button>

                <button
                  className="btn btn-secondary"
                  id="btn-skip" // Same ID uniqueness problem - use id={`btn-skip-${id}`}
                  type="button"
                  onClick={handleSkip}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
