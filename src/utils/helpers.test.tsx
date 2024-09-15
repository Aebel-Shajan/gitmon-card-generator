import { GithubRepo, GithubUser } from "../types/global";
import {
  scoreFunction,
  preprocessString,
  calculateGitmonType,
  calculateGithubRepoScore,
  getDaysSince,
  calculateGithubUserScore,
} from "./helpers";
import { describe, it, expect } from "vitest";

describe("calculateGithubUserScore", () => {
  const exampleUser: GithubUser = {
    html_url: "",
    login: "",
    id: 0,
    name: null,
    company: null,
    blog: "",
    location: null,
    email: null,
    hireable: null,
    bio: "",
    twitter_username: null,
    public_repos: 0,
    followers: 0,
    following: 0,
    created_at: new Date().toString(),
    avatar_url: "",
  };
  const exampleRepo: GithubRepo = {
    name: "",
    description: "",
    html_url: "",
    homepage: null,
    size: 0,
    default_branch: "master",
    language: null,
    license: null,
    created_at: new Date().toString(),
    topics: [],
    stargazers_count: 0,
    watchers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
  };
  it("should return 0 for the example user", () => {
    expect(calculateGithubUserScore(exampleUser, [])).toEqual(0);
  });
  it("should return above 29 for a stylish user", () => {
    const stylishUser = { ...exampleUser };
    const repos: GithubRepo[] = [];
    stylishUser.name = "timothy";
    stylishUser.bio = "softwhere";
    stylishUser.company = "Lidl";
    stylishUser.twitter_username = "@tim";
    stylishUser.email = "tim@timail.com";
    stylishUser.blog = "tim.i";
    const score = calculateGithubUserScore(stylishUser, repos);
    expect(score).toBeGreaterThanOrEqual(29);
  });
  it("should return above 60 for a metric user", () => {
    const metricUser = { ...exampleUser };
    const repos: GithubRepo[] = [{ ...exampleRepo, stargazers_count: 1000 }];
    metricUser.followers = 10000;
    metricUser.following = 100;
    metricUser.public_repos = 30;
    metricUser.created_at = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    ).toString();
    const score = calculateGithubUserScore(metricUser, repos);
    console.log(score);
    expect(score).toBeGreaterThanOrEqual(60);
  });
});

describe("calculateGithubRepoScore", () => {
  const exampleRepo: GithubRepo = {
    name: "",
    description: "",
    html_url: "",
    homepage: null,
    size: 0,
    default_branch: "master",
    language: null,
    license: null,
    created_at: new Date().toString(),
    topics: [],
    stargazers_count: 0,
    watchers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
  };
  it("should return 0 for the example repo", () => {
    expect(calculateGithubRepoScore(exampleRepo)).toEqual(0);
  });
  it("should return above 28 for a stylish repo", () => {
    const stylishRepo = { ...exampleRepo };
    stylishRepo.description = "Description over 5 chars.";
    stylishRepo.topics = ["react", "vercel", "next"];
    stylishRepo.default_branch = "main";
    stylishRepo.language = "NotJavascript";
    stylishRepo.homepage = "https://github.com";
    stylishRepo.license = "MIT";
    expect(calculateGithubRepoScore(stylishRepo)).toBeGreaterThanOrEqual(28);
  });
  it("should return above 60 for a very metric repo", () => {
    const metricRepo = { ...exampleRepo };
    metricRepo.stargazers_count = 70;
    metricRepo.forks_count = 70;
    metricRepo.watchers_count = 70;
    metricRepo.created_at = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    ).toString();
    metricRepo.size = 1000;
    metricRepo.open_issues_count = 5;
    expect(calculateGithubRepoScore(metricRepo)).toBeGreaterThanOrEqual(60);
  });
});

describe("getDaysSince", () => {
  it("should return 0 for current date", () => {
    const now = new Date();
    expect(getDaysSince(now.toString())).toEqual(0);
  });
});

describe("scoreFunction", () => {
  it("should not take a long time to run", () => {
    const start = Date.now();
    for (let i = 0; i < 1000; i++) {
      scoreFunction(0, 123);
    }
    const end = Date.now();
    const executionTime = end - start;
    expect(executionTime).toBeLessThan(10);
  });
  it("should return 0 for input_value=0", () => {
    expect(scoreFunction(0, 123)).toEqual(0);
  });
  it("should return 90 at cutoff_point=input_value", () => {
    expect(scoreFunction(123, 123)).toEqual(90);
  });
  it("should throw a RangeError when cutoff_point < 0", () => {
    expect(() => scoreFunction(123, 0)).toThrow(RangeError);
  });
  it("should return below 90 if input_value<cutoff_point", () => {
    expect(scoreFunction(100, 123)).toBeLessThan(90);
  });
  it("should return above 90 if input_value >= cutoff_point", () => {
    expect(scoreFunction(1000, 123)).toBeGreaterThan(90);
  });
  it("should return 100 for input_value >> cuttoff_point", () => {
    expect(scoreFunction(100000, 123)).toEqual(100);
  });
});

describe("preprocessString", () => {
  it("should remove all spaces", () => {
    const input = "Hello World!";
    const expectedOutput = "helloworld!";
    expect(preprocessString(input)).toEqual(expectedOutput);
  });
  it("should remove all underscores", () => {
    const input = "Hello_World!";
    const expectedOutput = "helloworld!";
    expect(preprocessString(input)).toEqual(expectedOutput);
  });
  it("should remove all dashes", () => {
    const input = "Hello-World!";
    const expectedOutput = "helloworld!";
    expect(preprocessString(input)).toEqual(expectedOutput);
  });
});

describe("calculateGitmonType", () => {
  it("should calculate frontend type correctly", () => {
    const tags = ["javascript", "react", "vite"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "frontend";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate backend type correctly", () => {
    const tags = ["node", "express", "rest"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "backend";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate data type correctly", () => {
    const tags = ["python", "Apache Spark", "Tensorflow"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "data";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate mobile type correctly", () => {
    const tags = ["swift", "flutter", "android"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "mobile";
    expect(actualOutput).toEqual(expectedOutput);
  });
  it("should calculate cybersecurity type correctly", () => {
    const tags = ["penetration-testing", "bug-bounty", "exploits"];
    const actualOutput = calculateGitmonType(tags)[0].name;
    const expectedOutput = "cybersecurity";
    expect(actualOutput).toEqual(expectedOutput);
  });
});
