import { useState } from "react";
import UserCardFront from "../../components/UserCard/UserCardFront/UserCardFront";
import { GithubRepo, Mapper, User } from "../../types/global";

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

async function getGithubUserData(username: string): Promise<User | undefined> {
  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
    );
    if (!userResponse.ok) {
      throw new Error(`Response status: ${userResponse.status}`);
    }
    if (!repoResponse.ok) {
      throw new Error(`Response status: ${repoResponse.status}`);
    }
    const userData = await userResponse.json();
    let repoData = (await repoResponse.json()) as GithubRepo[];
    repoData = sortGithubRepos(repoData);
    // Obtain moves
    const topThreeRepos = repoData.slice(0, Math.min(3, repoData.length));
    const repoMoves = topThreeRepos.map((repo: GithubRepo) => {
      return {
        types: ["normal", "frontend"],
        name: repo.name,
      };
    });
    // Obtain skills
    const languageMap: Mapper<number> = {};
    repoData.forEach((repo: GithubRepo) => {
      const languagesToAdd = [repo.language, ...repo.topics];
      languagesToAdd.forEach((language: string) => {
        if (!language) {
          return;
        }
        language = language.toLowerCase();
        if (!(language in languageMap)) {
          languageMap[language] = 0;
        }
        languageMap[language] += 1;
      });
    });
    console.log(languageMap);
    // Get the top 3 languages
    const topLanguages = Object.entries(languageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([language]) => language);

    // Obtain skills
    const skills = topLanguages.length > 0 ? topLanguages : ["Unknown"];
    return {
      name: userData.name + " #" + userData.id,
      type: "normal",
      image: userData.avatar_url,
      occupation: userData.company,
      description: userData.bio,
      skills: skills,
      moves: repoMoves,
    };
  } catch (error) {
    console.error(error);
  }
}

const HomePage = () => {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  async function buttonOnClick() {
    const userData = await getGithubUserData(username);
    if (userData === undefined) {
      alert("Enter a valid github username!");
      return;
    }
    setUser(userData);
  }

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
        <button onClick={buttonOnClick}>Generate</button>
      </div>

      <div>
        {user ? <UserCardFront user={user} onClick={() => {}} /> : null}
      </div>
    </div>
  );
};

export default HomePage;
