import { useEffect, useState } from "react";
import Post from "./post";
import "../styles/post-panel.css";
import { usePosts } from "./post-context";

const PostPanel = () => {
  const { posts, skippedPosts } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const skippedIds = skippedPosts.map((post) =>
    typeof post === "object" ? post.id : post
  );

  const userPosts = posts.filter((post) => !skippedIds.includes(post.id));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(userPosts.length / postsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPosts.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPosts, currentPage]);

  return (
    <div className="post-panel">
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
        />
      ))}

      {totalPages > 1 && (
  <nav>
    <ul className="pagination justify-content-center mt-4">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
          ◂
        </button>
      </li>

      {Array.from({ length: totalPages }, (_, i) => (
        <li
          key={i + 1}
          className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => goToPage(i + 1)}>
            {i + 1}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
          ▸
        </button>
      </li>
    </ul>
  </nav>
)}
    </div>
  );
};

export default PostPanel;