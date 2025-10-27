import { useState } from "react";
import pawsImg from "../assets/paw-likes.png";
import { useAuth } from "../components/auth-context";
import { useNavigate } from "react-router-dom";
import { usePosts } from "./post-context";
import "../styles/post.css"

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

  const [likeCounter, setLikeCounter] = useState(() => {
    const storedLikes = JSON.parse(localStorage.getItem("postLikes") || "{}");
    return storedLikes[id] ?? likes;
  });
  const [liked, setLiked] = useState(() => {
    if (!user) return false;
    const likedPosts = JSON.parse(localStorage.getItem(`${user.username}-likes`) || "[]");
    return likedPosts.includes(id);
  });

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
    <div className="card post-card">
      <div className="row g-0">
        {photo && (
          <div className="post-photo-container">
            <img src={photo} alt={title} className="post-photo" />
          </div>
        )}

        <div
          className={
            photo ? "col-md-8 d-flex flex-column" : "col-12 d-flex flex-column"
          }
        >
          <div className="card-body post-body">
            <h4 className="card-title">{title}</h4>

            <p className="post-username" onClick={handleUsernameClick}>
              @{username}
            </p>

            <p className="card-text post-content">{content}</p>

            <div className="post-bottom">
              <div className="d-grid gap-2 d-md-block mb-2 post-buttons">
                <p className="card-text mb-0">
                  <small className="text-body-secondary">
                    Likes: {likeCounter}
                  </small>
                </p>

                <button
                  className="btn btn-like me-2"
                  type="button"
                  onClick={handleLike}
                  disabled={liked || isOwner}
                >
                  <img src={pawsImg} alt="paws" width={15} height={15} /> Like
                </button>

                <button
                  className="btn btn-skip"
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