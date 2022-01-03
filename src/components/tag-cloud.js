import * as React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"

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
  console.log(allMarkdownRemark)
  return ""
}

export default TagCloud
