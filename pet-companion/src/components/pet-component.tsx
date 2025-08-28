import cat from "../images/pets/cat.png";

interface IPet{
    name : string;
    username : string;
    type : string;
    level : number;
    XP : number;
}

const PetPanel = ({ name, username, type, level, XP } : IPet) => {
    if(XP === 20) {
        XP = 0;
        level += 1;
    }
    return (<div className="PetPanel" style={{backgroundImage: "../assets/paws-bg.png"}}>
        <h1>{name}</h1>
        <p>{username}</p>
        {type === "cat" && <img src={cat} width={500} height={500} alt="Cat" />}
        <p>Level: {level}(XP: {XP})</p>
        <div className="progress">
            {XP === 0 && <div className="progress-bar" style={{ width: "0%" }}></div>}
            {XP === 5 && <div className="progress-bar" style={{ width: "25%" }}></div>}
            {XP === 10 && <div className="progress-bar" style={{ width: "50%" }}></div>}
            {XP === 15 && <div className="progress-bar" style={{ width: "75%" }}></div>}
        </div>
    </div>);
};

export default PetPanel;