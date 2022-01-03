import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import FirstView from "./first-view"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let firstview = isRootPath ? <FirstView></FirstView> : ""

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header location={location} />
      {firstview}
      <main className="container">{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
