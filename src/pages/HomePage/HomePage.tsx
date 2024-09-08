import { useState } from "react";
import UserCardFront from "../../components/UserCard/UserCardFront/UserCardFront";
import BlankCard from "../../components/UserCard/BlankCard/BlankCard";
import { GithubRepo, Mapper, User } from "../../types/global";
import "./HomePage.css";

function sortGithubRepos(githubRepos: GithubRepo[]): GithubRepo[] {
  return githubRepos.sort((a: GithubRepo, b: GithubRepo) => {
    const starDiff = b.stargazers_count - a.stargazers_count;
    const sizeDiff = b.size - a.size;
    // Sort by stars first
    if (starDiff != 0) {
      return starDiff;
    }
    // Then by size
    return sizeDiff;
  });
}

function getTopSkills(githubRepos: GithubRepo[], amount: number = 3) {
  // Count
  const skillMap: Mapper<number> = {};
  githubRepos.forEach((repo: GithubRepo) => {
    const skillsToAdd = [repo.language, ...repo.topics];
    skillsToAdd.forEach((language: string) => {
      if (!language) {
        return;
      }
      language = language.toLowerCase();
      if (!(language in skillMap)) {
        skillMap[language] = 0;
      }
      skillMap[language] += 1;
    });
  });

  // Get the top languages
  const topLanguages = Object.entries(skillMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, amount)
    .map(([language]) => language);

  // Obtain skills
  const skills = topLanguages.length > 0 ? topLanguages : ["Unknown"];
  return skills;
}

async function getGithubUserData(username: string): Promise<User | undefined> {
  try {
    // Fetch from github api, 60 per hour for unauthenticated 😢. (Authenticated is 5,000)
    // I want to use my github token but vite stores it in the source code during the build step 😭
    // Like bruh whats the point of making them env variables if vite is gonna expose them???
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
    );

    // Handle errors
    if (!userResponse.ok) {
      throw new Error(`Response status: ${userResponse.status}`);
    }
    if (!repoResponse.ok) {
      throw new Error(`Response status: ${repoResponse.status}`);
    }

    // Convert to json
    const userData = await userResponse.json();
    let repoData = (await repoResponse.json()) as GithubRepo[];

    // Obtain top moves
    repoData = sortGithubRepos(repoData);
    const topThreeRepos = repoData.slice(0, Math.min(3, repoData.length));
    const repoMoves = topThreeRepos.map((repo: GithubRepo) => {
      return {
        types: ["normal", "frontend"],
        name: repo.name,
      };
    });

    // Obtain skills
    const topSkills = getTopSkills(repoData);

    // Combine the data into a user object
    return {
      name: userData.name + " #" + userData.id,
      type: "normal",
      image: userData.avatar_url,
      occupation: userData.company,
      description: userData.bio ? userData.bio : "No bio :(",
      skills: topSkills,
      moves: repoMoves,
    };
  } catch (error) {
    console.error(error);
  }
}

const HomePage = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  async function buttonOnClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userData = await getGithubUserData(username);
    if (userData === undefined) {
      alert("Enter a valid github username!");
      return;
    }
    setUser(userData);
  }

  return (
    <div id="home-page-container">
      <h1 id="title">Gitmon Card Generator</h1>
      <form onSubmit={buttonOnClick} id="generate-form">
        <label>Enter your github username here:</label>
        <div id="form-input">
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input type="submit" value="Generate" id="generate-button" />
        </div>
      </form>

      <div>
        {user ? (
          <UserCardFront user={user} onClick={() => {}} />
        ) : (
          <BlankCard />
        )}
      </div>
    </div>
  );
};

export default HomePage;
