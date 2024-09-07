import { useState } from "react";
import UserCardFront from "../../components/UserCard/UserCardFront/UserCardFront";
import { User } from "../../types/global";

const HomePage = () => {
  const [username, setUsername] = useState<string>("");

  const user: User = {
    name: "Aebel",
    type: "data",
    image: "https://avatars.githubusercontent.com/u/67755450",
    occupation: "Data Engineer",
    description: "Software Enthusiast",
    skills: ["Apache Spark", "Python", "Keras"],
    moves: [
      {
        types: ["data", "frontend"],
        name: "Strong data",
      },
      {
        types: ["frontend", "backend"],
        name: "Connect Cards",
      },
      {
        types: ["ai", "data"],
        name: "Anti microbial peptide GCN",
      },
    ],
  };

  return (
    <div>
      <h1>Gitmon Card Generator</h1>
      <div>
        <label>Enter your github username here:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button>Generate</button>
      </div>

      <div>
        <UserCardFront user={user} onClick={() => {}} />
      </div>
    </div>
  );
};

export default HomePage;
