import React from "react"

import styled from "styled-components" //追加

const TableOfContent = props => {
  const list = props.data.replace(/(ul>)/gi, "ol>")

  return (
    <TOC>
      <input type="checkbox" className="mokuji" id="mokuji" />
      <label className="heading" htmlFor="mokuji">
        目次
      </label>
      <div
        dangerouslySetInnerHTML={{
          __html: list,
        }}
      ></div>
    </TOC>
  )
}

export default TableOfContent

const TOC = styled.div`
  border: 1px solid #aaa;
  padding: 0;
  margin: 20px 0;

  input {
    display: none;

    &:checked ~ div {
      max-height: 0;
    }
    &:checked ~ .heading::before {
      transform: rotate(90deg);
    }
  }
  div {
    transition: 0.3s;
    max-height: 200vh;
    overflow: hidden;
    p {
      margin: 0;
    }

    ol {
      counter-reset: cnt;
      list-style: none;
    }
    & > ol {
      margin: 0;
      padding: 10px 20px;
      border-top: 1px solid #aaa;

      li {
        counter-increment: cnt;
        position: relative;
        padding-left: 2em;
        &::before {
          left: 0;
          font-size: 1.4rem;
          font-weight: 700;
          position: absolute;
          content: counters(cnt, " - ") ".";
        }
        ol {
          padding-left: 0;

          li {
            padding-left: 3em;
          }
        }
      }
    }
  }
  .heading {
    background: #eee;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    font-size: 18px;
    margin: 0;
    position: relative;

    &::after,
    &::before {
      position: absolute;
      content: "";
      height: 2px;
      width: 20px;
      background: #999;
      right: 20px;
      top: 19px;
      transition: 0.3s;
    }
  }
`
