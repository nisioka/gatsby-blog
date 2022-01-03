import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "../components/img"

import styled from "styled-components"

const Lists = ({ category, slug, tags }) => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { pagetype: { eq: "blog" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              id
              frontmatter {
                cate
                hero
                date(formatString: "YYYY.MM.DD")
                title
                tags
                pagetype
              }
            }
          }
        }
      }
    `
  )
  let posts = allMarkdownRemark.edges.filter(post => {
    if (post.node.fields.slug !== slug) {
      // カテゴリーの一致出力
      if (post.node.frontmatter.cate === category) return true
      // タグの一致出力。記事のタグの中に一致するものがあればtrueを返す。
      for (const tag of tags) {
        if (post.node.frontmatter.tags.includes(tag)) return true
      }
    }
  })

  if (!posts) return

  if (posts.length > 5) {
    function shuffle(list) {
      var i = list.length

      while (--i) {
        var j = Math.floor(Math.random() * (i + 1))
        if (i === j) continue
        var k = list[i]
        list[i] = list[j]
        list[j] = k
      }

      return list
    }

    shuffle(posts)
    posts = posts.slice(0, 6)
  }

  return (
    <Related>
      <h2>関連記事もあわせてお読みください</h2>
      <RelatedList>
        {posts.map((item, index) => {
          return (
            <article key={`relative${index}`}>
              <Link className="p-entryCard__img" to={item.node.fields.slug}>
                <Img
                  alt={item.node.frontmatter.title}
                  image={item.node.frontmatter.hero}
                ></Img>
                <time dateTime={item.node.frontmatter.date}>
                  {item.node.frontmatter.date}
                </time>
              </Link>
              <h3>
                <Link to={item.node.fields.slug}>
                  {item.node.frontmatter.title}
                </Link>
              </h3>
            </article>
          )
        })}
      </RelatedList>
    </Related>
  )
}
export default Lists

const Related = styled.div`
  max-width: 700px;
  margin: 0 auto;
  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 30px;
  }
`
const RelatedList = styled.div`
  article {
    margin-bottom: 30px;
  }
  a {
    color: var(--black);
    text-decoration: none;
    position: relative;

    &:hover {
      opacity: 0.3s;
    }

    time {
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      left: 0;
      top: 0;
      line-height: 1;
      padding: 5px 15px;
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
  h3 {
    font-size: 1.7rem;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;

    article {
      box-sizing: border-box;
      width: 33.33%;
      padding: 0 10px;
    }
  }
`
