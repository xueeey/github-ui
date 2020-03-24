import { useContext } from "react";
import { RepoContext } from "../App";

export type Repo = {
  id: string;
  full_name: string;
  stargazers_count: number;
  html_url: string;
  forks_count: number;
  watchers_count: number;
  description: string;
  name: string;
  topics?: string[];
};

export const useRepo = (): Repo => {
  const { repo } = useContext(RepoContext);

  if (repo === null) {
    throw Error("repo should not be null");
  }

  return repo;
};
