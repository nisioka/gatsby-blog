import * as React from "react"
import { Link } from "gatsby"

import { siteMetadata } from "../../gatsby-config"

const Header = ({ location }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let siteName
  if (isRootPath) {
    siteName = <h1>{siteMetadata.title}</h1>
  } else {
    siteName = (
      <p>
        <Link to={rootPath}>{siteMetadata.title}</Link>
      </p>
    )
  }
  return (
    <header>
      {siteName}
      <nav>
        <ul>
          <li>
            <Link to="/blogs/">ブログ</Link>
          </li>
          <li>
            <Link to="/about/">About Me</Link>
          </li>
          <li>
            <Link to="/contact/">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
