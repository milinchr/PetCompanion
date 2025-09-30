import PetPanel from "./pet-component";
import PostPanel from "./post-panel";
import Add from './add';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/auth-context";

const MainPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate('/create-post');};



    return (
        <div className='main-page'>
            <div className="panels-container">
                <PetPanel/>
                <PostPanel/>
                <Add onClick={handleAddClick} />
            </div>
        </div>
    );
}

export default MainPage;