import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import { RepoLayout } from "./components/RepoLayout";
import { Repo } from "./models/Repo";
import { RepoCode } from "./components/RepoCode";
import { Header } from "./components/Header";

export const RepoContext = createContext<Repo | null>(null);

const currentRepo = window.location.pathname.slice(1);

function App() {
  const [repo, setRepo] = useState<Repo>();

  useEffect(() => {
    const headers = new Headers();
    headers.set("Accept", "application/vnd.github.mercy-preview+json");

    fetch(`https://api.github.com/repos/${currentRepo}`, {
      headers
    })
      .then(resp => resp.json() as Promise<Repo>)
      .then(repoData => setRepo(repoData));
  }, []);

  return (
    <div className="App">
      <Header />
      {repo ? (
        <RepoContext.Provider value={repo}>
          <RepoLayout />
          <RepoCode />
        </RepoContext.Provider>
      ) : null}
    </div>
  );
}

export default App;
