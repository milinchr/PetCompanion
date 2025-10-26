import { useState } from "react";
import pawsImg from "../assets/paw-likes.png";
import { useAuth } from "../components/auth-context";
import { useNavigate } from "react-router-dom";
import { usePosts } from "./post-context";

interface PostProps {
  id: string;
  title: string;
  username: string;
  content: string;
  photo?: string;
  likes?: number;
  onSkip?: () => void;
}

const Post = ({
  id,
  title,
  username,
  content,
  photo,
  likes = 0,
  onSkip,
}: PostProps) => {
  const { user, updateUser } = useAuth();
  const { skipPost } = usePosts();

  const [likeCounter, setLikeCounter] = useState(likes);
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const isOwner = user?.username === username;
  const handleUsernameClick = () => {
    navigate(`/profile/${username}`);
  };

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
    skipPost(id, user.username);
  };

  return (
    <div
      className="card mb-3"
      style={{ width: "1000px", border: "1px solid #E0E0E0" }} // Same comment as earlier - move inline styles to CSS file or styled-components
    >
      <div className="row g-0">
        {photo && (
    <div
      style={{
        flex: "0 0 200px",     // ✅ фиксированная ширина, но высота — автоматическая
        overflow: "hidden",    // ✅ предотвращает вылезание фото
        borderRadius: "0.25rem 0 0 0.25rem",
      }}
    >
      <img
        src={photo}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",  // ✅ фото заполняет всё место
          display: "block",
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
