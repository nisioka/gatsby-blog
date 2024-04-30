import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import styled from "styled-components"

const FirstView = () => {
  return (
    <Wrapper>
      <StaticImage
        className="first-view"
        layout="fullWidth"
        formats={["auto", "webp", "avif"]}
        src="../images/common/first-view.jpg"
        width={1200}
        height={900}
        quality={95}
        alt="Profile picture"
      />
      <h1>Programing is my life.</h1>
    </Wrapper>
  )
}
export default FirstView

const Wrapper = styled.div`
  height: 30vh;
  overflow: hidden;
  position: relative;
  z-index: 500;

  h1 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    position: absolute;
    color: #fff;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    font-size: 2.2rem;
    @media screen and (min-width: 768px) {
      font-size: 3rem;
    }
  }
  .first-view {
    height: 100%;
  }
`
