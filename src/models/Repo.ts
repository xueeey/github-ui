import { useContext } from "react";
import { RepoContext } from "../App";
import { Repo } from "../types/all";

export const useRepo = (): Repo => {
  const repo = useContext(RepoContext);

  if (repo === null) {
    throw Error("repo should not be null");
  }

  return repo;
};
