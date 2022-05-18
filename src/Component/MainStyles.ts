import styled from "styled-components";

export const Scroll = styled.div<{ height?: number }>`
  overflow-y: auto;
  overflow-x: hidden;
  height: ${(props) => props.height || "80%"}px;

  &::-webkit-scrollbar {
    width: 4px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }

  /*
  *{
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  
   */
`;
