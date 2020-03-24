import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import { RepoLayout } from "./components/RepoLayout";
import { Repo } from "./models/Repo";
import { RepoCode } from "./components/RepoCode";
import { Header } from "./components/Header";

export const RepoContext = createContext<{
  repo: Repo | null;
  changeRepo: (nextRepoName: string) => void;
}>({
  repo: null,
  changeRepo: () => {
    console.log("default changeRepo function");
  }
});

function App({ initialRepo }: { initialRepo: string }) {
  const [repo, setRepo] = useState<Repo>();
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

  return (
    <div className="App">
      <Header />
      {repo ? (
        <RepoContext.Provider
          value={{
            repo,
            changeRepo: setCurrentRepo
          }}
        >
          <RepoLayout />
          <RepoCode />
        </RepoContext.Provider>
      ) : null}
    </div>
  );
}

export default App;
