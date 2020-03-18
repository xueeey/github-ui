import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { colors } from "./colors";
import { useRepo } from "../models/Repo";

const Toolbar = styled.div`
  margin-bottom: 12px;
`;

const Caret = styled.span`
  margin-left: 4px;
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: "";
  border-top-style: solid;
  border-top-width: 4px;
  border-right: 4px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
`;

const Dropdown = styled.div`
  position: absolute;
  max-height: 420px;
  width: 300px;
  background-color: #fff;
  z-index: 1;
  border: 1px solid ${colors.border};
  top: 34px;

  .branch-filter {
    padding: 8px;

    > input {
      width: 100%;
      border: 1px solid ${colors.border};
      box-sizing: border-box;
      border-radius: 3px;
      box-shadow: none;
      padding: 8px;
      font-size: 13px;
    }
  }
`;

const BranchSelector = styled.div`
  position: relative;

  > button {
    padding: 6px 10px;
    border-radius: 3px;
    border: 1px solid ${colors.border};
    font-size: 12px;
    background-color: ${colors.button};
    cursor: pointer;

    > span {
      display: inline-block;
      max-width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
`;

const BranchResults = styled.div`
  overflow: scroll;
  height: 320px;

  > div {
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 8px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      background-color: ${colors.divider};
    }
  }
`;

type Ref = {
  ref: string;
  name: string;
};

export const RepoToolbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("master");
  const [branches, setBranches] = useState<Ref[]>([]);
  const repo = useRepo();

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${repo.full_name}/git/matching-refs/heads/`
    )
      .then(resp => resp.json() as Promise<{ ref: string }[]>)
      .then(data => {
        setBranches(
          data.map(({ ref }) => {
            return {
              ref,
              name: ref.split("refs/heads/")[1]
            };
          })
        );
      });
  }, []);

  return (
    <Toolbar>
      <BranchSelector>
        <button
          onClick={e => {
            setIsActive(i => !i);
            e.preventDefault();
          }}
        >
          <span>
            Branch: <strong>{currentBranch}</strong>
          </span>
          <Caret />
        </button>
        {isActive ? (
          <Dropdown onBlur={() => setTimeout(() => setIsActive(false), 100)}>
            <div className="branch-filter">
              <input type="text" placeholder="Filter branches" autoFocus />
            </div>
            <BranchResults>
              {branches.map(b => (
                <div
                  title={b.name}
                  onClick={e => {
                    setCurrentBranch(b.name);
                    setIsActive(false);
                  }}
                >
                  {b.name}
                </div>
              ))}
            </BranchResults>
          </Dropdown>
        ) : null}
      </BranchSelector>
    </Toolbar>
  );
};
