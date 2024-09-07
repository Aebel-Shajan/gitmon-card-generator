import { useState } from "react";

const HomePage = () => {
  const [username, setUsername] = useState<string>("");

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
    </div>
  );
};

export default HomePage;
