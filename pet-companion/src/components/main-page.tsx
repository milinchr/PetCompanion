import PetPanel from "./pet-component";
import PostPanel from "./post-panel";
import { useAuth } from "../components/auth-context";

const MainPage = () => {
    const { user } = useAuth();

    return (
        <div className='main-page'>
            <div className="panels-container">
                <PetPanel
                    name={user?.petName || 'Pet'}
                    username={user?.username || '@user'}
                    type="cat"
                    level={user?.level ?? 0}
                    XP={user?.xp ?? 0}
                />
                <PostPanel />
            </div>
        </div>
    );
}

export default MainPage;