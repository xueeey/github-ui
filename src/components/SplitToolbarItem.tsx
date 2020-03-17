import React from "react";
import styled from "@emotion/styled";

interface Props {
  label: string;
  value: number | string;
}

const Container = styled.div`
  > div {
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid #ccc;
    font-size: 12px;
    font-weight: 600;

    &:first-child {
      background-color: #f2f5f7;
      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
    }
  }

  > div + div {
    margin-left: -1px;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
`;

export const SplitToolbarItem = ({ label, value }: Props) => (
  <Container>
    <div>{label}</div>
    <div>{value}</div>
  </Container>
);
