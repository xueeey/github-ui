import React, { useEffect, useState, useRef } from "react";
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

const File = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid ${colors.divider};

  svg {
    display: inline-block;
    margin-right: 8px;
  }

  a {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.link};
    text-decoration: none;

    &:hover {
      text-decoration: underline ${colors.link};
    }
  }
`;

export const RepoFiles = () => {
  const repo = useRepo();
  const [files, setFiles] = useState<{ [key: string]: TreeNode[] }>({});
  const [ref, setRef] = useState<string>("master");
  const path = useRef<string[]>(["master"]);

  useEffect(() => {
    const treePromise = files[ref]
      ? Promise.resolve(files[ref])
      : fetch(`https://api.github.com/repos/${repo.full_name}/git/trees/${ref}`)
          .then(resp => resp.json() as Promise<{ tree: TreeNode[] }>)
          .then(data => data.tree);

    treePromise.then(tree => {
      if (tree) {
        setFiles(f => ({
          ...f,
          [ref]: tree
        }));
      }
    });
  }, [repo.full_name, ref]);

  return (
    <Container>
      {path.current.length > 1 ? (
        <File>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
          <a
            href="#"
            onClick={e => {
              path.current.pop();
              const nextRef = path.current[path.current.length - 1];
              setRef(nextRef as string);
              e.preventDefault();
            }}
          >
            ..
          </a>
        </File>
      ) : null}
      {files[ref] &&
        files[ref].map(node => (
          <File key={node.path}>
            {node.type === "tree" ? <FolderIcon /> : <FileIcon />}
            <a
              href={node.url}
              onClick={e => {
                const split = node.url.split("trees/");
                const nodeId = split[split.length - 1];
                setRef(nodeId);
                path.current.push(nodeId);
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
