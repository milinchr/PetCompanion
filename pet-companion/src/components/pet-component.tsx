import { useEffect } from "react";
import { useAuth } from "../components/auth-context";
import { useNavigate } from "react-router-dom";

import cat from "../images/pets/cat.png";
import dog from "../images/pets/dog.png";
import hamster from "../images/pets/hamster.png";
import parrot from "../images/pets/parrot.png";
import rabbit from "../images/pets/rabbit.png";

// I would suggest making fitst type more strict

/* type PetType = "cat" | "dog" | "hamster" | "parrot" | "rabbit";

interface PetInfo {
  name: string;
  image: string;
}

const pets: Record<PetType, PetInfo> = {
  cat: { name: "Cat", image: cat },
  dog: { name: "Dog", image: dog },
  hamster: { name: "Hamster", image: hamster },
  parrot: { name: "Parrot", image: parrot },
  rabbit: { name: "Rabbit", image: rabbit },
}; */
const pets: Record<string, { name: string; image: string }> = {
  cat: { name: "Cat", image: cat },
  dog: { name: "Dog", image: dog },
  hamster: { name: "Hamster", image: hamster },
  parrot: { name: "Parrot", image: parrot },
  rabbit: { name: "Rabbit", image: rabbit },
};

const PetPanel = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // You can add a check like this to avoid all the null checks later
  // if (!user) {
  //   return <p>Please login</p>;
  // }

  const level = user?.level ?? 0;
  const xp = user?.xp ?? 0;

  // You can navigate to profile directly without defining a separate function
  // If you add the previous check, you can avoid the null check here
  const handleClick = () => {
    if (user) navigate(`/profile/${user.username}`);
  };

  useEffect(() => {
    if (!user) return; // Same here, if you add the previous check, you can avoid this
    // This quite repeats the logic in create-post.tsx
    // Can you separate it to a function and call it from both places?
    if (xp >= 20) {
      const newXP = xp - 20;
      const newLevel = level + 1;
      const updatedUser = { ...user, level: newLevel, xp: newXP };
      updateUser(updatedUser);
    }
  }, [xp, level, user, updateUser]);

  if (!user) return <p>Please login</p>;

  const getProgressWidth = (xp: number) => `${(xp / 20) * 100}%`;

  const pet = pets[user.petType] ?? pets["cat"]; // Why using cat as default?

  return (
    // Please use consistent className conventions across the project
    <div className="PetPanel">
      <h1>{user.petName}</h1>
      <p onClick={handleClick} style={{ cursor: "pointer" }}>
        {user.username}
      </p>
      <img src={pet.image} width={500} height={500} alt={pet.name} />
      <p>
        Level: {user.level} (XP: {user.xp})
      </p>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: getProgressWidth(user.xp) }}
        ></div>
      </div>
    </div>
  );
};

export default PetPanel;
