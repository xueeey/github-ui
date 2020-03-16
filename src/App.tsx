import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import { RepoLayout } from "./components/RepoLayout";
import { Repo } from "./types/all";
import { RepoCode } from "./components/RepoCode";
import { Header } from "./components/Header";

export const RepoContext = createContext<Repo | null>(null);

const currentRepo = window.location.pathname.slice(1);

function App() {
  const [repo, setRepo] = useState<Repo>();

  useEffect(() => {
    fetch(`https://api.github.com/repos/${currentRepo}`)
      .then(resp => resp.json())
      .then((data: Repo) => {
        console.log(data);
        setRepo(data);
      });
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
