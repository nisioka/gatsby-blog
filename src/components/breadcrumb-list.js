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
      <ol itemscope itemtype="https://schema.org/BreadcrumbList">
        {List.map((item, index) => {
          return (
            <li
              key={item.location}
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <Link to={item.location} itemprop="item">
                <span itemprop="name">{item.title}</span>
              </Link>
              <meta itemprop="position" content={index + 1} />
            </li>
          )
        })}
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
          key={location.pathname}
        >
          <span itemprop="name">{title}</span>
          <meta itemprop="position" content={List.length + 1} />
        </li>
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
