import PetPanel from "./pet-component";
import PostPanel from "./post-panel";
import { useAuth } from "../components/auth-context";

const MainPage = () => {
    const { user } = useAuth();

    return (
        <div className='main-page'>
            <div className="panels-container">
                <PetPanel/>
                <PostPanel/>
            </div>
        </div>
    );
}

export default MainPage;