import React from "react";
import styled from "@emotion/styled";
import { SplitToolbarItem } from "./SplitToolbarItem";
import { useRepo } from "../models/Repo";
import { colors } from "./colors";

const Toolbar = styled.div`
  display: flex;

  > div {
    margin: 0 5px;
  }
`;

const RepoName = styled.div`
  font-size: 20px;

  a {
    color: ${colors.link};
    text-decoration: none;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

const Container = styled.div`
  border-bottom: 1px solid ${colors.border};

  > div {
    width: 980px;
    margin: 0 auto;
  }
`;

const RepoNav = styled.div`
  font-size: 14px;
  margin-top: 24px;

  ul {
    margin: 0 0 -1px 0;
    padding-left: 0;
  }

  li {
    list-style: none;
    display: inline-block;
    padding: 8px 16px;

    &:first-child {
      border: 1px solid ${colors.border};
      border-bottom-color: #fff;
      border-top: 3px solid orange;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
  }
`;

export const RepoLayout = () => {
  const repo = useRepo();

  return (
    <Container>
      <div>
        <Overview>
          <RepoName>
            <a href={repo.html_url}>{repo.full_name}</a>
          </RepoName>
          <Toolbar>
            <SplitToolbarItem label="Watch" value={repo.watchers_count} />
            <SplitToolbarItem label="Star" value={repo.stargazers_count} />
            <SplitToolbarItem label="Fork" value={repo.forks_count} />
          </Toolbar>
        </Overview>
        <RepoNav>
          <ul>
            <li>Code</li>
            <li>Issues</li>
            <li>Pull requests</li>
            <li>Actions</li>
            <li>Projects</li>
            <li>Wiki</li>
            <li>Insights</li>
          </ul>
        </RepoNav>
      </div>
    </Container>
  );
};
