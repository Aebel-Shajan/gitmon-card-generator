export interface GithubUser {
  login: string;
  id: number;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  size: number;
  default_branch: string;
  language: string | null;
  license: string | null;
  created_at: string;
  topics: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
}
export interface Move {
  types: string[];
  name: string;
  moveScore: number;
}

export interface User {
  username: string;
  id: number;
  name: string;
  type: string;
  image: string;
  occupation: string;
  description: string;
  skills: string[];
  moves: move[];
  userScore: number;
}

export interface GitmonType {
  name: string;
  icon: React.ReactElement;
  color: string;
  keywords: string[];
}

export interface Mapper<T> {
  [key: string]: T;
}
