import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TOC from "../components/table-of-content"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import RetatedList from "../components/retated-list"
import TagCloud from "../components/tag-cloud"
import BreadCrumbList from "../components/breadcrumb-list"
import rehypeReact from "rehype-react"
import LinkCard from "../components/blog-parts/link-card"

import styled from "styled-components"

import { siteMetadata } from "../../gatsby-config"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    card: LinkCard,
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const keyVisual = data.allFile.edges[0].node.childImageSharp
  const { cate, tags } = data.markdownRemark.frontmatter
  const cateName = siteMetadata.category.find(item => item.slug === cate).name

  const ogpImg = data.allFile.edges[0].node.publicURL

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        img={ogpImg}
        location={location}
        type="blog"
        date={post.frontmatter.date}
        modified={post.frontmatter.modifieddate}
      />
      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BreadCrumbList
          parent="blogs"
          location={location}
          title={post.frontmatter.title}
        />
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div className="keyvisual">
            <GatsbyImage
              image={getImage(keyVisual)}
              alt={post.frontmatter.title}
              key={post.frontmatter.title}
            />
          </div>
          <p className="date">
            更新日：
            <time dateTime={post.frontmatter.date}>
              {post.frontmatter.date}
            </time>
          </p>
        </header>
        {/* カテゴリー追加 */}
        <Dl>
          <dt>カテゴリ</dt>
          <dd>
            <Link to={`/blogs/${cate}/`}>{cateName}</Link>
          </dd>
        </Dl>
        <Dl>
          <dt>タグ</dt>
          {tags.map((tag, index) => {
            return (
              <dd key={`tag${index}`}>
                <Link to={`/blogs/tags/${tag}/`}>{tag}</Link>
              </dd>
            )
          })}
        </Dl>
        <TOC data={data.markdownRemark.tableOfContents} />
        <BlogEntry itemProp="articleBody">{renderAst(post.htmlAst)}</BlogEntry>
        <footer>
          <Bio />
        </footer>
      </Article>
      <BlogPostNav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </BlogPostNav>
      <RetatedList
        category={cate}
        slug={post.fields.slug}
        tags={tags}
      ></RetatedList>
      <TagCloud></TagCloud>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $hero: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        relativePath: { eq: $hero }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          publicURL
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 640
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        cate
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

const Article = styled.article`
  max-width: 750px;
  margin: 0 auto;

  .date {
    font-weight: 700;

    time {
      font-size: 1.4rem;
    }
  }
  .keyvisual {
    text-align: center;
  }
`
const BlogEntry = styled.section`
  margin: 15px 0 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`
const BlogPostNav = styled.nav`
  max-width: 750px;
  margin: 0 auto;

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
`
const Dl = styled.dl`
  display: flex;
  margin: 0;

  dt {
    width: 80px;
    font-weight: 700;
  }
  dd {
    font-size: 14px;
    margin-left: 0;
    padding-left: 0;

    a {
      text-decoration: none;
      border-radius: 3px;
      color: #fff;
      background: rgb(41, 46, 114);
      padding: 2px 5px;

      &:hover {
        opacity: 0.5;
      }
    }

    & + dd {
      margin-left: 15px;
      margin-bottom: 5px;
    }
  }
`
