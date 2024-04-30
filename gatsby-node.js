const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const blogList = path.resolve(`./src/templates/blog-list.js`)

  const cateList = path.resolve(`./src/templates/cate-list.js`)

  const tagList = path.resolve(`./src/templates/tag-list.js`)

  const pagePost = path.resolve(`./src/templates/page-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              hero
              pagetype
              cate
              tags
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    const blogPosts = posts.filter(post => post.frontmatter.pagetype === "blog")

    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id
      const nextPostId =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          hero: post.frontmatter.hero
            ? post.frontmatter.hero
            : "common/dummy.png", //追記
        },
      })
    })

    // 一覧を出力するコードを追加
    const postsPerPage = 12 //1ページに表示する記事の数

    const count = blogPosts.length //記事の長さ
    let numPages = Math.ceil(count / postsPerPage) //分割されるページの数
    for (let index = 0; index < numPages; index++) {
      const pageNumber = index + 1
      const withPrefix = pageNumber =>
        pageNumber === 1 ? `/blogs/` : `/blogs/page/${pageNumber}/`
      createPage({
        path: withPrefix(pageNumber), //修正
        component: blogList,
        context: {
          limit: postsPerPage, //追加
          skip: index * postsPerPage, //追加
          current: pageNumber, //追加
          page: numPages, //追加
        },
      })
    }

    //カテゴリー一覧追加
    //カテゴリーのリスト取得
    let cates = posts.reduce((cates, edge) => {
      const edgeCates = edge.frontmatter.cate
      return edgeCates ? cates.concat(edgeCates) : cates
    }, [])
    // 重複削除
    cates = [...new Set(cates)]
    // カテゴリー分ページを作成
    cates.forEach(cate => {
      const cateSlug = cate
      const cateCount = posts.filter(
        post => post.frontmatter.cate === cate
      ).length
      const numPages = Math.ceil(cateCount / postsPerPage) //分割されるページの数

      for (let index = 0; index < numPages; index++) {
        const pageNumber = index + 1
        const withPrefix = pageNumber =>
          pageNumber === 1
            ? `/blogs/${cate}/`
            : `/blogs/${cate}/page/${pageNumber}/`

        createPage({
          path: withPrefix(pageNumber),
          component: cateList,
          context: {
            limit: postsPerPage, //追加
            skip: index * postsPerPage, //追加
            current: pageNumber, //追加
            page: numPages, //追加
            cateSlug,
          },
        })
      }
    })

    //タグの一覧作成
    let tags = posts.reduce((tags, edge) => {
      const edgeTags = edge.frontmatter.tags
      return edgeTags ? tags.concat(edgeTags) : tags
    }, [])
    // 重複削除
    tags = [...new Set(tags)]

    // タグ
    tags.forEach(item => {
      const tag = item
      const tagsCount = blogPosts.filter(post =>
        post.frontmatter.tags.includes(item)
      ).length
      const numPages = Math.ceil(tagsCount / postsPerPage) //分割されるページの数
      for (let index = 0; index < numPages; index++) {
        const pageNumber = index + 1
        const withPrefix = pageNumber =>
          pageNumber === 1
            ? `/blogs/tags/${tag}/`
            : `/blogs/tags/${tag}/page/${pageNumber}/`
        createPage({
          path: withPrefix(pageNumber),
          component: tagList,
          context: {
            limit: postsPerPage, //追加
            skip: index * postsPerPage, //追加
            current: pageNumber, //追加
            page: numPages, //追加
            tag,
          },
        })
      }
    })
    const pagePosts = posts.filter(post => post.frontmatter.pagetype !== "blog")

    pagePosts.forEach(post => {
      createPage({
        path: post.fields.slug,
        component: pagePost,
        context: {
          id: post.id,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      # ↓追加↓
      pagetype: String
      tags: [String]
      cate: String
      hero: String
      # ↑追加↑
    }

    type Fields {
      slug: String
    }
  `)
}
