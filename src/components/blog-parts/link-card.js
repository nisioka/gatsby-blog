import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Thunmbnail from "./thumbnail"

import styled from "styled-components"

const LinkCard = data => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              id
              frontmatter {
                description
                hero
                date(formatString: "YYYY.MM.DD")
                title
              }
            }
          }
        }
      }
    `
  )
  let article = allMarkdownRemark.edges.filter(
    item => item.node.fields.slug === data.slug
  )
  if (article.length !== 0) {
    article = article[0].node
    const description =
      article.frontmatter.description.length > 60
        ? article.frontmatter.description.substr(0, 60) + "..."
        : article.frontmatter.description
    return (
      <Card href={article.fields.slug} className="article-link">
        <div className="wrapper">
          <div className="img">
            <Thunmbnail
              alt={article.frontmatter.title}
              src={article.frontmatter.hero}
            ></Thunmbnail>
          </div>
          <div className="main">
            <p className="title">{article.frontmatter.title}</p>
            <p className="description">{description}</p>
            <time dateTime={article.frontmatter.date.replace(/\./g, "-")}>
              {article.frontmatter.date}
            </time>
            <span className="seemore">続きを読む</span>
          </div>
        </div>
      </Card>
    )
  } else {
    return ""
  }
}
export default LinkCard

const Card = styled.a`
  display: block;
  padding: 10px;
  border: 1px solid #ddd;
  text-decoration: none;
  color: #333;
  margin-bottom: 20px;

  .wrapper {
    display: flex;

    .img {
      width: 100px;
    }

    .main {
      width: calc(100% - 100px);
      padding-left: 20px;
      position: relative;
      padding-bottom: 20px;

      .seemore {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        &::after {
          padding-left: 6px;
          content: ">";
        }
      }

      .title {
        margin: 0 0 5px;
        font-weight: bold;
      }
      .description {
        font-size: 14px;
        margin: 0 0 5px;
      }
      time {
        font-size: 14px;
      }
    }
  }
  @media screen and (min-width: 768px) {
    padding: 20px;
    transition: 0.3s;
    &:hover {
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    }
    .wrapper {
      .main {
        width: calc(100% - 200px);

        .title {
          font-size: 18px;
        }
      }
      .img {
        width: 200px;
      }
    }
  }
`
