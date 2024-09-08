export interface GithubRepo {
  name: string;
  url: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
}
export interface Move {
  types: string[];
  name: string;
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
