import React, { useEffect, useState } from "react";
import { useRepo } from "../models/Repo";
import { colors } from "./colors";
import styled from "@emotion/styled";
import { FolderIcon, FileIcon } from "./Icon";

type TreeNode = {
  path: string;
  type: string;
  url: string;
};

const Container = styled.div`
  border: 1px solid ${colors.border};
`;

const File = styled.a`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid ${colors.divider};

  svg {
    display: inline-block;
    margin: 0 8px;
  }

  a {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.link};
    text-decoration: none;

    &:hover {
      text-decoration: underline #333;
    }
  }
`;

export const RepoFiles = () => {
  const [files, setFiles] = useState<TreeNode[]>([]);
  const [ref, setRef] = useState<string>("master");
  const [path, setPath] = useState<string>("/");
  const repo = useRepo();

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo.full_name}/git/trees/${ref}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data && data.tree) {
          setFiles(data.tree as TreeNode[]);
        }
      });
  }, [repo.full_name, ref]);

  return (
    <Container>
      <div></div>
      {files.map(node => (
        <File>
          {node.type === "tree" ? <FolderIcon /> : <FileIcon />}
          <a
            key={node.path}
            href={node.url}
            onClick={e => {
              const split = node.url.split("trees/");
              setRef(split[split.length - 1]);
              e.preventDefault();
              return false;
            }}
          >
            {node.path}
          </a>
        </File>
      ))}
    </Container>
  );
};
