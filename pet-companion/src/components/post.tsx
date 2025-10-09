import React from "react";
import { useState, useEffect } from "react";
import pawsImg from "../assets/paw-likes.png";
import { useAuth } from "../components/auth-context";


interface IPost {
  id: string;
  title: string;
  content: string;
  photo?: string;
  likes?: number;
  
}

const Post = ({ id, title, content, photo, likes = 0 }: IPost) => {
  const { user, updateUser } = useAuth();
  const [likeCounter, setLikeCounter] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("postLikes") || "{}");
    if (storedLikes[id]) {
      setLikeCounter(storedLikes[id]);
    }

    if (user) {
      const likedPosts = JSON.parse(localStorage.getItem(`${user.username}-likes`) || "[]");
      if (likedPosts.includes(id)) setLiked(true);
      const skippedPosts = JSON.parse(localStorage.getItem(`${user.username}-skipped`) || "[]");
      if (skippedPosts.includes(id)) setVisible(false);
    }
  }, [id, user]);

  const handleLike = () => {
    if (!user) return;

    const likedPosts = JSON.parse(localStorage.getItem(`${user.username}-likes`) || "[]");

    if (!likedPosts.includes(id)) {
      const newLikeCount = likeCounter + 1;
      setLikeCounter(newLikeCount);
      setLiked(true);

      likedPosts.push(id);
      localStorage.setItem(`${user.username}-likes`, JSON.stringify(likedPosts));

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
    const skippedPosts = JSON.parse(localStorage.getItem(`${user.username}-skipped`) || "[]");
    if (!skippedPosts.includes(id)) {
      skippedPosts.push(id);
      localStorage.setItem(`${user.username}-skipped`, JSON.stringify(skippedPosts));
    }
  };

    

    if (!visible) return null;

  return (
    <div className="card mb-3" style={{ width: "1000px", border: "1px solid #E0E0E0" }}>
      <div className="row g-0">
        {photo && (
          <div style={{ width: 200, height: "100%" }}>
            <img
              src={photo}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.25rem 0 0 0.25rem",
              }}
            />
          </div>
        )}
        <div className={photo ? "col-md-8 d-flex flex-column" : "col-12 d-flex flex-column"}>
          <div className="card-body d-flex flex-column" style={{ height: "100%", textAlign: "left" }}>
            <h4 className="card-title">{title}</h4>
            <p className="card-text" style={{ fontSize: "16px" }}>{content}</p>

            <div style={{ marginTop: "auto" }}>
              <div className="d-grid gap-2 d-md-block mb-2">
                <p className="card-text mb-0">
                  <small className="text-body-secondary">Likes: {likeCounter}</small>
                </p>

                <button
                  className="btn btn-primary me-2"
                  id="btn-like"
                  type="button"
                  onClick={handleLike}
                  disabled={liked}
                >
                  <img src={pawsImg} alt="paws" width={15} height={15} /> Like
                </button>

                <button className="btn btn-secondary" id="btn-skip" type="button" onClick={handleSkip}>
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
