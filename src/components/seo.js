/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = props => {
  const {
    description,
    img,
    location,
    lang,
    title,
    meta,
    type,
    date,
    modified,
  } = props
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              name
            }
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const imgPath = `${site.siteMetadata.siteUrl.replace(/\/$/, "")}${
    img ? img : "/images/ogp.png"
  }`
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let blogUrl = location ? location.href : site.siteMetadata.siteUrl
  // ページネーション削除
  blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "")

  // 執筆者情報
  const author = [
    {
      "@type": "Person",
      name: site.siteMetadata.author.name,
      description: site.siteMetadata.author.summary,
      url: site.siteMetadata.siteUrl,
      sameAs: [
        site.siteMetadata.social.twitter,
        site.siteMetadata.social.instagram,
      ],
    },
  ]

  // 公開する組織など
  const publisher = {
    "@type": "Organization",
    name: site.siteMetadata.title,
    description: site.siteMetadata.description,
    logo: {
      "@type": "ImageObject",
      url: `${site.siteMetadata.siteUrl}images/logo.png`,
      width: 72,
      height: 72,
    },
  }

  // JSON+LDの設定
  let jsonLdConfigs = [
    {
      "@context": "http://schema.org",
      "@type": isRootPath ? "webSite" : "webPage",
      inLanguage: "ja",
      url: blogUrl,
      name: title,
      author,
      publisher,
      image: imgPath,
      description: metaDescription,
    },
  ]
  if (type === "blog") {
    const article = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: blogUrl,
      name: title,
      headline: title,
      image: {
        "@type": "ImageObject",
        url: imgPath,
      },
      description: description,
      datePublished: date,
      dateModified: modified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": blogUrl,
      },
      author,
      publisher,
    }
    jsonLdConfigs = [...jsonLdConfigs, article]
  }

  if (!isRootPath) {
    let breadCrumbList = [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${site.siteMetadata.siteUrl}/`,
          name: "ホーム",
        },
      },
    ]
    if (type === "blog") {
      breadCrumbList = [
        ...breadCrumbList,
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": `${site.siteMetadata.siteUrl}/blogs/`,
            name: `ブログ一覧`,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": blogUrl,
            name: title,
          },
        },
      ]
    } else if (type === "list") {
      breadCrumbList = [
        ...breadCrumbList,
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": `${site.siteMetadata.siteUrl}/blogs/`,
            name: `ブログ一覧`,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": blogUrl,
            name: title,
          },
        },
      ]
    } else {
      breadCrumbList = [
        ...breadCrumbList,
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": blogUrl,
            name: title,
          },
        },
      ]
    }
    jsonLdConfigs = [
      ...jsonLdConfigs,
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadCrumbList,
      },
    ]
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `thumbnail`,
          content: imgPath,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `${isRootPath ? "website" : "webpage"}`,
        },
        {
          property: `og:url`,
          content: imgPath,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: imgPath,
        },
      ].concat(meta)}
    >
      <link rel="canonical" href={blogUrl} />
      <script type="application/ld+json">
        {JSON.stringify(jsonLdConfigs)}
      </script>
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
