import PetPanel from "./pet-component";
import PostPanel from "./post-panel";
import Add from "./add";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth-context";

const MainPage = () => {
  // Remove if not needed
  const { user } = useAuth();
  const navigate = useNavigate();

  // You can navigate directly without an intermediate function if not needed elsewhere
  // Like this <Add onClick={() => navigate("/create-post")} />
  const handleAddClick = () => {
    navigate("/create-post");
  };

  return (
    <div className="main-page">
      <div className="panels-container">
        <PetPanel />
        <PostPanel />
        <Add onClick={handleAddClick} />
      </div>
    </div>
  );
};

export default MainPage;
