import { useState, useEffect } from "react";
import pawsImg from "../assets/paw-likes.png";
import { useAuth } from "../components/auth-context";

interface IPost {
    id: string;
    title: string;
    content: string;
    photo?: string;
    likes: number;
}

const Post = ({ id, title, content, photo, likes = 0 }: IPost) => {
    const { user, updateUser } = useAuth();
    const [likeCounter, setLikeCounter] = useState(likes);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user) {
            const likedPosts = JSON.parse(localStorage.getItem(`${user.username}-likes`) || "[]");
            if (likedPosts.includes(id)) setLiked(true);
        }
    }, [id, user]);

    const handleLike = () => {
        if (!user) return;
        const likedPosts = JSON.parse(localStorage.getItem(`${user.username}-likes`) || "[]");

        if (!likedPosts.includes(id)) {
            setLikeCounter(likeCounter + 1);
            setLiked(true);

            likedPosts.push(id);
            localStorage.setItem(`${user.username}-likes`, JSON.stringify(likedPosts));

            const newUserData = { ...user, xp: user.xp + 3 };
            updateUser(newUserData);
        }
    };

    return (
        <div className="card mb-3" style={{ width: "1000px", border: "1px solid #E0E0E0" }}>
            <div className="row g-0">
                {photo && (
                    <div style={{ width: 200, height: '100%' }}>
                        <img src={photo} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.25rem 0 0 0.25rem' }} />
                    </div>
                )}
                <div className={photo ? "col-md-8 d-flex flex-column" : "col-12 d-flex flex-column"}>
                    <div className="card-body d-flex flex-column" style={{ height: '100%', textAlign: 'left' }}>
                        <h4 className="card-title">{title}</h4>
                        <p className="card-text" style={{ fontSize: "16px" }}>{content}</p>
                        <div style={{ marginTop: 'auto' }}>
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
                                <button className="btn btn-secondary" id="btn-skip" type="button">
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
