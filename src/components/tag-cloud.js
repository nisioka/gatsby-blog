import * as React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"

import styled from "styled-components"

const TagCloud = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { pagetype: { eq: "blog" } } }
        ) {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
  )
  let tags = allMarkdownRemark.edges.reduce((tags, edge) => {
    const edgeTags = edge.node.frontmatter.tags
    if (edgeTags) {
      edgeTags.map(item => {
        if (tags.find(i => i.name === item)) {
          tags.filter(i => {
            if (i.name === item) {
              i.cnt += 1
            }
          })
        } else {
          tags = [...tags, { name: item, cnt: 1 }]
        }
      })
    }
    return tags
  }, [])

  if (!tags) {
    return <p>現在タグはありません。</p>
  }
  return (
    <TagCloudList>
      {tags.map(tag => {
        let size
        if (tag.cnt > 10) {
          size = "lg"
        } else if (tag.cnt < 4) {
          size = "sm"
        }
        return (
          <li key={tag} className={size}>
            <Link to={`/blogs/tags/${tag.name}/`}>
              {tag.name}({tag.cnt})
            </Link>
          </li>
        )
      })}
    </TagCloudList>
  )
}

export default TagCloud

const TagCloudList = styled.ul`
  list-style: none;
  background: #eee;
  padding: 10px 20px;
  max-width: 700px;
  margin: 0 auto;

  li {
    display: inline-block;
    padding: 5px 10px;
  }

  .sm {
    font-size: 1.2rem;
  }

  .lg {
    font-size: 1.8rem;
  }

  a {
    line-height: 1;
    color: rgb(41, 46, 114);
    display: block;
    text-decoration: none;
    border-bottom: dashed 1px rgb(41, 46, 114);

    &:hover {
      color: #bb1100;
      border-bottom-color: #bb1100;
    }
  }
`
