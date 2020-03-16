import React, { useContext } from "react";
import styled from "@emotion/styled";
import { RepoContext } from "../App";
import { RepoFiles } from "./RepoFiles";

const Container = styled.div`
  width: 980px;
  margin: 0 auto;
`;

const Description = styled.div`
  padding: 24px 0;
`;

export const RepoCode = () => {
  const repo = useContext(RepoContext);

  return repo ? (
    <Container>
      <Description>{repo.description}</Description>
      <RepoFiles></RepoFiles>
    </Container>
  ) : null;
};
