import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const BreadCrumbList = ({ parent, title, location }) => {
  let List = [{ location: "/", title: "ホーム" }]
  if (parent === "blogs") {
    List = [...List, { location: "/blogs/", title: "記事一覧" }]
  }
  return (
    <BreadCrumbNav>
      <ol>
        {List.map(item => {
          return (
            <li key={item.location}>
              <Link to={item.location}>{item.title}</Link>
            </li>
          )
        })}
        <li key={location.pathname}>{title}</li>
      </ol>
    </BreadCrumbNav>
  )
}
export default BreadCrumbList

const BreadCrumbNav = styled.nav`
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 700;
      margin-right: 10px;

      &::after {
        margin-left: 10px;
        content: "";
        width: 4px;
        height: 4px;
        display: inline-block;
        transform: rotate(45deg);
        border-top: 2px solid var(--black);
        border-right: 2px solid var(--black);
      }
      &:last-child::after {
        content: none;
      }
    }
    a {
      color: var(--black);
      &:hover {
        opacity: 0.5;
      }
    }
  }
`
