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
  name: string;
  type: string;
  image: string;
  occupation: string;
  description: string;
  skills: string[];
  moves: move[];
}

export interface TypeStyle {
  icon: React.ReactElement;
  color: string;
}

export interface Mapper<T> {
  [key: string]: T;
}
