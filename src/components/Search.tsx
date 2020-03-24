import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Repo } from "../models/Repo";
import { RepoContext } from "../App";

const SearchInput = styled.input`
  border-radius: 3px;
  background-color: hsla(0, 0%, 100%, 0.125);
  color: #fff;
  padding: 4px 8px;
  width: 280px;
  height: 28px;
  box-sizing: border-box;
  font-size: 14px;
  border: none;

  &.focused {
    background-color: #fff;
    color: #333;
    width: 340px;
  }
`;

const Shortcut = styled.span`
  position: absolute;
  top: 4px;
  right: 8px;
  color: #808080;
  font-size: 12px;
  font-weight: 400;
  display: inline-block;
  border: 1px solid #808080;
  border-radius: 3px;
  padding: 1px 6px;
`;

const Container = styled.div`
  position: relative;
`;

const SearchResults = styled.div`
  position: absolute;
  z-index: 2;
  background-color: #fff;
  font-size: 14px;
  width: 340px;
  border: 1px solid #eee;

  > ul {
    margin: 0;
    padding-left: 0;

    > li {
      list-style: none;
      padding: 4px 8px;

      :hover {
        background-color: #f6f8fa;
      }
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #333;
      text-decoration: none;

      span + span {
        color: #aaa;
      }
    }
  }

  .hint {
    padding: 8px;
  }
`;

const searchGithub = (query: string) => {
  return fetch("https://api.github.com/search/repositories?q=" + query).then(
    resp => {
      return resp.json();
    }
  );
};

export const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Repo[]>([]);
  const [timeoutId, setTimeoutId] = useState(0);
  const { changeRepo } = useContext(RepoContext);

  return (
    <Container>
      <SearchInput
        placeholder="Search or jump to..."
        onFocus={() => {
          setIsFocused(true);
        }}
        className={isFocused ? "focused" : ""}
        onBlur={() => {
          setTimeout(() => {
            setIsFocused(false);
          }, 250);
        }}
        onInput={e => {
          const inputEl = e.target as HTMLInputElement;
          const id = window.setTimeout(() => {
            setTimeoutId(0);
            searchGithub(inputEl.value).then(data => {
              const resp = data as any;
              if (resp) {
                setResults(resp.items);
              }
            });
          }, 250);

          if (timeoutId !== 0) {
            console.log("debouncing and cancelling timeout");
            clearTimeout(timeoutId);
          }

          setTimeoutId(id);
        }}
      ></SearchInput>
      {!isFocused ? <Shortcut>/</Shortcut> : null}
      {isFocused ? (
        <SearchResults>
          {results.length ? (
            <ul>
              {results.slice(0, 10).map(repo => (
                <li key={repo.full_name}>
                  <a
                    href={`/${repo.full_name}`}
                    onClick={e => {
                      changeRepo(repo.full_name);
                      window.history.pushState(
                        {},
                        `Repo: ${repo.full_name}`,
                        `/${repo.full_name}`
                      );
                      e.preventDefault();
                      return false;
                    }}
                  >
                    <span>{repo.full_name}</span>
                    <span>{repo.stargazers_count} ⭐️</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="hint">Start typing to search</div>
          )}
        </SearchResults>
      ) : null}
    </Container>
  );
};
