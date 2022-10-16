import { css } from "@emotion/react";

export const global = css`
  @import url("//cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css");

  * {
    box-sizing: border-box;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", sans-serif;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    transition: 0.2s ease;
    :hover {
      transform: scale(0.9);
    }
  }
`;
