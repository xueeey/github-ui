import React, { useContext } from "react";
import styled from "@emotion/styled";
import { RepoContext } from "../App";
import { RepoFiles } from "./RepoFiles";
import { colors } from "./colors";

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
  }
`;

export const RepoCode = () => {
  const repo = useContext(RepoContext);

  return repo ? (
    <Container>
      <Description>{repo.description}</Description>
      <Topics>
        {repo.topics.map(topic => (
          <div key={topic}>{topic}</div>
        ))}
      </Topics>
      <RepoFiles></RepoFiles>
    </Container>
  ) : null;
};
