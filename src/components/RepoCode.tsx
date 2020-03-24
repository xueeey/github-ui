import React from "react";
import styled from "@emotion/styled";
import { RepoFiles } from "./RepoFiles";
import { colors } from "./colors";
import { RepoToolbar } from "./RepoToolbar";
import { useRepo } from "../models/Repo";

const Container = styled.div`
  width: 980px;
  margin: 0 auto;
`;

const Description = styled.div`
  margin: 16px 0;
`;

const Topics = styled.div`
  margin: 16px 0;

  > div {
    display: inline-block;
    padding: 4px 8px;
    background-color: ${colors.lightblue};
    color: ${colors.link};
    font-size: 12px;
    margin-right: 8px;
    border-radius: 3px;
    cursor: pointer;
  }
`;

export const RepoCode = () => {
  const repo = useRepo();

  return repo ? (
    <Container>
      <Description>{repo.description}</Description>
      <Topics>
        {repo.topics &&
          repo.topics.map(topic => <div key={topic}>{topic}</div>)}
      </Topics>
      <RepoToolbar />
      <RepoFiles />
    </Container>
  ) : null;
};
