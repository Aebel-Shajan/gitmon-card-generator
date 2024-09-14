import IconMapping from "./IconMapping";
import TypeMapping from "./TypeMapping";
import { GithubRepo, GitmonType, Mapper, User } from "../types/global";

/**
 * Returns a weighted score out of 100 for a given github repo.
 *
 * This function scores a github repo based upon multiple parameters.
 * The criteria for the score is:
 * * Style (30%):
 *   * description (40%)
 *   * topics (30%)
 *   * no master (10%)
 *   * js not main language, homepage, language, license (5% each = 20% total)
 * * Metrics (70%):
 *    * Stars (50%)
 *    * Forks, watchers, age, size, open_issues (10% each = 50% total)
 * @param repo Input github repo
 * @returns Integer total score for github repo
 */
export function calculateGithubRepoScore(repo: GithubRepo) {
  const rating = {
    style: {
      // criteria : [criteria_score, weight]
      hasDescription: [
        100 * Number(repo.description ? repo.description.length > 5 : 0),
        0.4,
      ],
      topics_count: [scoreFunction(repo.topics.length, 3), 0.3],
      hasNoMaster: [100 * Number(repo.default_branch !== "master"), 0.1],
      noJs: [
        repo.language
          ? 100 * Number(repo.language.toLowerCase() !== "javascript")
          : 0,
        0.05,
      ],
      hasLanguage: [100 * Number(repo.language !== null), 0.05],
      hasHomepage: [100 * Number(repo.homepage !== null), 0.05],
      hasLicense: [100 * Number(repo.license !== null), 0.05],
    } as { [key: string]: [number, number] },
    metrics: {
      stargazers_count: [scoreFunction(repo.stargazers_count, 70), 0.5],
      forks_count: [scoreFunction(repo.forks_count, 70), 0.1],
      watchers_count: [scoreFunction(repo.watchers_count, 70), 0.1],
      days_count: [scoreFunction(getDaysSince(repo.created_at), 365), 0.1],
      open_issues_count: [scoreFunction(repo.open_issues_count, 5), 0.1],
      size_count: [scoreFunction(repo.size, 1000), 0.1],
    } as { [key: string]: [number, number] },
  };

  let style_score = 0;
  let metrics_score = 0;
  for (const criteria in rating.style) {
    const score = rating.style[criteria][0] * rating.style[criteria][1];
    console.log(score, criteria);
    style_score += score;
  }
  // console.log(`Total style_score: ${style_score}`)

  for (const criteria in rating.metrics) {
    const score = rating.metrics[criteria][0] * rating.metrics[criteria][1];
    console.log(score, criteria);
    metrics_score += score;
  }
  // console.log(`Total metrics_score: ${metrics_score}`)

  const total_score = Math.round(0.7 * metrics_score + 0.3 * style_score);
  // console.log(`Total score: ${total_score}`)

  return total_score;
}

/**
 * Returns number of days since a given date.
 *
 * @param date - Input date string, should have format YYYY-MM-DDThh:mm:ss
 * @return Number of days since given date in days.
 */
export function getDaysSince(date: string) {
  const now = new Date();
  const then = new Date(date);
  const millisecondsDiff = now.getTime() - then.getTime();
  const output = Math.round(millisecondsDiff / (24 * 60 * 60 * 60));
  return output;
}

/**
 * Returns a score out of a 100 for a given input_value and cutoff_point.
 *
 * Uses a mathematical function which starts at (0, 0) and converges at y=100.
 * The function reaches y=90 at x=cutoff_point.
 * The equation for this is :
 *     y(input_value) = 100 * (1 - exp(-k * input_value))
 * Where:
 *     k = -ln(0.1) / cutoff_point
 * , note that -ln(0.1) = 2.30258509299
 *
 * @param input_value - The value you want to generate a score out of 100 for.
 * @param cutoff_point - The point at which the score should return 90. (> 0)
 * @returns Integer score value which is a number between 0 and 100. (inclusive)
 *
 * @throws {RangeError} If the cutoff point is negative or 0.
 */
export function scoreFunction(input_value: number, cutoff_point: number) {
  if (cutoff_point <= 0) {
    throw new RangeError(
      `cutoff_point=${cutoff_point} should be greater than 0`,
    );
  }
  if (input_value === 0) return 0;
  const k = 2.30258509299 / cutoff_point;
  return Math.round(100 * (1 - Math.exp(-1 * k * input_value)));
}

export function preprocessString(string: string): string {
  return string
    .toLowerCase()
    .replace(" ", "")
    .replace("-", "")
    .replace("_", "");
}

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
    skillsToAdd.forEach((language: string | null) => {
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

export async function getGithubUserData(
  username: string,
): Promise<User | undefined> {
  try {
    // Fetch from github api, 60 per hour for unauthenticated 😢. (Authenticated is 5,000)
    // I want to use my github token but vite stores it in the source code during the build step 😭
    // Like bruh whats the point of making them env variables if vite is gonna expose them???
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=200`,
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

    // Obtain user type
    const repoTags: string[] = [];
    repoData.forEach((repo) => {
      if (repo.language) {
        repoTags.push(repo.language);
      }
      repoTags.push(...repo.topics);
    });
    const userType = calculateGitmonType(repoTags)[0].name;

    // Obtain top moves
    repoData = sortGithubRepos(repoData);
    const topThreeRepos = repoData.slice(0, Math.min(3, repoData.length));
    const repoMoves = topThreeRepos.map((repo: GithubRepo) => {
      const repoTags = [...repo.topics];
      if (repo.language) {
        repoTags.push(repo.language);
      }
      const repoTypes = calculateGitmonType(repoTags)
        .map((gitmonType) => gitmonType.name)
        .slice(0, 2);
      return {
        types: repoTypes,
        name: repo.name,
      };
    });

    // Obtain skills
    const topSkills = getTopSkills(repoData);

    // Combine the data into a user object
    return {
      id: userData.id,
      username: userData.login,
      name: userData.name,
      type: userType,
      image: userData.avatar_url,
      occupation: userData.company,
      description: userData.bio ? userData.bio : "No bio :(",
      skills: topSkills,
      moves: repoMoves,
      userScore: 0,
    };
  } catch (error) {
    console.error(error);
  }
}

export function calculateGitmonType(tags: string[]): GitmonType[] {
  // Preprocess all tags
  const normalizedTags = tags
    .filter((tag) => tag !== null)
    .map((tag) => preprocessString(tag));
  const typeScores: Mapper<number> = {};

  for (const [typeName, { keywords }] of Object.entries(TypeMapping)) {
    // Preprocess type keywords
    const normalizedKeywords = keywords.map((keyword) =>
      preprocessString(keyword),
    );
    // Find number of times each tags appear in types keyword list
    const matches = normalizedTags.filter((tag) =>
      normalizedKeywords.includes(tag),
    ).length;
    // Assign score to type
    typeScores[typeName] = matches;
  }

  // Find maximum score
  const maxMatches = Math.max(...Object.values(typeScores));
  if (maxMatches == 0) {
    return [getGitmonType("normal")];
  }

  // Obtain types which fit tags
  const bestTypes = Object.keys(typeScores).filter(
    (type) => typeScores[type] == maxMatches,
  );
  // Map to return full gitmon types
  return bestTypes.map((typeName) => getGitmonType(typeName));
}

export function getIconComponent(iconName: string): React.ReactElement {
  const IconComponent = IconMapping[preprocessString(iconName)];
  if (IconComponent) {
    return IconComponent;
  }
  return IconMapping["link"];
}

export function getGitmonType(typeName: string): GitmonType {
  const type = TypeMapping[preprocessString(typeName)];
  if (type) {
    return type;
  }
  return TypeMapping["normal"];
}
