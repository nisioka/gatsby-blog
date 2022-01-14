import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Thumbnail = data => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              name
              relativePath
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 200 }
                  width: 200
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    `
  )
  let src = data.src ? data.src : "thumbnail/dummy.png"
  let img = allFile.edges.find(img => img.node.relativePath === src)
  return (
    <GatsbyImage
      image={getImage(img.node.childImageSharp.gatsbyImageData)}
      alt={data.alt}
      key={data.alt}
    />
  )
}
export default Thumbnail
