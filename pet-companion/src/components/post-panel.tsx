import Post from "./post";
import post1 from "../uploads/murka-sleepy.jpg";
import post2 from "../uploads/angry-cat.jpg";

const PostPanel = () => {
    const posts = [
        { id: "p1", title: "Murka", content: "Murka is sleepy again <3", photo: post1, likes: 0 },
        { id: "p2", title: "Angry Bella", content: "Meet Bella, the grumpy queen of the house. I caught her mid-scowl because she wasn’t in the mood for cuddles—sometimes her attitude is just too photogenic to resist!", photo: post2, likes: 0 },
        { id: "p3", title: "Murka", content: "Murka is sleepy again <3", photo: post1, likes: 0 },
        { id: "p4", title: "Angry Bella", content: "Meet Bella, the grumpy queen of the house. I caught her mid-scowl because she wasn’t in the mood for cuddles—sometimes her attitude is just too photogenic to resist!", photo: post2, likes: 0 },
    ];

    return (
        <div>
            <h1 style={{ textAlign: "left" }}>Posts</h1>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    photo={post.photo}
                    likes={post.likes}
                />
            ))}
        </div>
    );
};

export default PostPanel;