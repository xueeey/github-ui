import React, { useEffect, useState, createContext, useMemo } from "react";
import "./App.css";
import { RepoLayout } from "./components/RepoLayout";
import { Repo } from "./models/Repo";
import { RepoCode } from "./components/RepoCode";
import { Header } from "./components/Header";

type TRepoContext = {
  repo: Repo | null;
  changeRepo: (nextRepoName: string) => void;
};

export const RepoContext = createContext<TRepoContext>({
  repo: null,
  changeRepo: () => {
    console.log("default changeRepo function");
  }
});

function App({ initialRepo }: { initialRepo: string }) {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [currentRepo, setCurrentRepo] = useState<string>(initialRepo);

  useEffect(() => {
    const headers = new Headers();
    headers.set("Accept", "application/vnd.github.mercy-preview+json");

    fetch(`https://api.github.com/repos/${currentRepo}`, {
      headers
    })
      .then(resp => resp.json() as Promise<Repo>)
      .then(repoData => setRepo(repoData));
  }, [currentRepo]);

  const repoContextValue = useMemo<TRepoContext>(
    () => ({
      repo,
      changeRepo: setCurrentRepo
    }),
    [repo]
  );

  return (
    <div className="App">
      {repo ? (
        <RepoContext.Provider value={repoContextValue}>
          <Header />
          <RepoLayout />
          <RepoCode />
        </RepoContext.Provider>
      ) : null}
    </div>
  );
}

export default App;
