import { Link } from "gatsby"
import React from "react"
import styled from "styled-components" //追加
const Pagination = ({ num, current, type }) => {
  let first
  let prev
  let next
  let last

  if (current === 1) {
    first = (
      <li className="not-work" key="pagination0">
        <span>最新</span>
      </li>
    )
  } else {
    first = (
      <li key="pagination0">
        <Link to={`/blogs/${type}${type ? "/" : ""}`}>最新</Link>
      </li>
    )
  }

  if (current === 1) {
    prev = (
      <li className="not-work" key="pagination1">
        <span>次へ</span>
      </li>
    )
  } else if (current === 2) {
    prev = (
      <li key="pagination1">
        <Link to={`/blogs/${type}${type ? "/" : ""}`}>次へ</Link>
      </li>
    )
  } else {
    prev = (
      <li key="pagination1">
        <Link to={`/blogs/${type}${type ? "/" : ""}page/${current - 1}/`}>
          次へ
        </Link>
      </li>
    )
  }

  if (current === num) {
    next = (
      <li className="not-work" key="pagination3">
        <span>前へ</span>
      </li>
    )
  } else if (current === "") {
    next = (
      <li key="pagination3">
        <Link to={`/blogs/${type}${type ? "/" : ""}page/2/`}>前へ</Link>
      </li>
    )
  } else {
    next = (
      <li key="pagination3">
        <Link to={`/blogs/${type}${type ? "/" : ""}page/${current + 1}/`}>
          前へ
        </Link>
      </li>
    )
  }

  if (current === num) {
    last = (
      <li className="not-work" key="paginatio4">
        <span>最後</span>
      </li>
    )
  } else {
    last = (
      <li key="pagination4">
        <Link to={`/blogs/${type}${type ? "/" : ""}page/${num}/`}>最後</Link>
      </li>
    )
  }
  if (num > 1) {
    return (
      <PaginationWrapper>
        <ul>
          {first}
          {prev}
          <li key="pagination2">
            page {current}/{num}
          </li>
          {next}
          {last}
        </ul>
      </PaginationWrapper>
    )
  } else {
    return ""
  }
}

export default Pagination

const PaginationWrapper = styled.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: center;

    li {
      padding: 0 10px;

      &.not-work span {
        background: rgb(41, 46, 114);
        color: #fff;
        opacity: 0.5;
      }

      span,
      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        font-weight: 700;
        color: rgb(41, 46, 114);
        border-radius: 8px;
        border: 1px solid rgb(41, 46, 114);
        padding: 0 10px;
      }
    }
  }
`
