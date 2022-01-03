import * as React from "react"

import { Link } from "gatsby"

import styled from "styled-components"

const BreadCrumbList = ({ type, title, location }) => {
  return (
    <ol>
      <li>
        <Link to="/">ホーム</Link>
      </li>
    </ol>
  )
}

export default BreadCrumbList
