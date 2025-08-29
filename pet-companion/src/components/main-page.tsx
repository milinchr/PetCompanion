import NavigationBar from "./navigation";
import PetPanel from "./pet-component";
import PostPanel from "./post-panel";

const MainPage = () => {
    return (
        <div className='main-page'>
            <div className="panels-container">
                <PetPanel name='Melisa' username='@milin_chr' type="cat" level={2} XP={15}></PetPanel>
                <PostPanel></PostPanel>
            </div>
        </div>
    );
}

export default MainPage;