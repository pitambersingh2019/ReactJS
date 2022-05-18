import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Header = styled.div`
  width: 100%;
  gap: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserGroupTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    margin: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
