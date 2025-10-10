import { useState } from "react";
import { useAuth } from "../components/auth-context";
import Post from "./post";

const PostPanel = () => {
  const { posts } = useAuth();
  // Remove if unused
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Posts</h1>
      {currentPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          title={post.title}
          content={post.content}
          photo={post.photo}
          likes={post.likes}
          petType={post.petType}
        />
      ))}

      {totalPages > 1 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            // Same comment about styles - consider moving to CSS or use styled-components
            style={{
              marginRight: 8,
              fontWeight: "bold",
              borderRadius: 8,
              backgroundColor: "#E55A50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              // Same comment about styles - consider moving to CSS or use styled-components
              style={{
                margin: "0 4px",
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
                borderRadius: 8,
                backgroundColor: "#ff6e6198",
                color: "white",
                padding: "6px 12px",
                border: "none",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            // Same comment about styles - consider moving to CSS or use styled-components
            style={{
              marginLeft: 8,
              fontWeight: "bold",
              borderRadius: 8,
              backgroundColor: "#E55A50",
              color: "white",
              padding: "6px 12px",
              border: "none",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPanel;
