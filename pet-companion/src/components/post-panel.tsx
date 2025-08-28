import TestPost from "./test-post";
import post1 from "../uploads/murka-sleepy.jpg";
import post2 from "../uploads/angry-cat.jpg";

const PostPanel = () => {
    return (
        <div>
            <h1 style={{textAlign : "left"}}>Posts</h1>
            <TestPost title="Murka" content="Murka is sleepy again <3" photo={post1} likes={0}/>
            <TestPost title="Angry Bella" content="Meet Bella, the grumpy queen of the house. I caught her mid-scowl because she wasn’t in the mood for cuddles—sometimes her attitude is just too photogenic to resist!" photo={post2} likes={0}/>
            <TestPost title="Murka" content="Murka is sleepy again <3" photo={post1} likes={0}/>
            <TestPost title="Angry Bella" content="Meet Bella, the grumpy queen of the house. I caught her mid-scowl because she wasn’t in the mood for cuddles—sometimes her attitude is just too photogenic to resist!" photo={post2} likes={0}/>
            <TestPost title="Murka" content="Murka is sleepy again <3" photo={post1} likes={0}/>
            <TestPost title="Angry Bella" content="Meet Bella, the grumpy queen of the house. I caught her mid-scowl because she wasn’t in the mood for cuddles—sometimes her attitude is just too photogenic to resist!" photo={post2} likes={0}/>
            
        </div>
    );
}

export default PostPanel;