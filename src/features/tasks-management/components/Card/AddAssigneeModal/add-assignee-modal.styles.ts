import styled from "styled-components";

export const StyledAddAssigneeModal = styled.div<{ isOnScreen: boolean }>`
  width: 120px;
  max-height: 176px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  position: absolute;
  left: 0;
  top: ${(props) => (props.isOnScreen ? "19px" : "unset")};
  bottom: ${(props) => (props.isOnScreen ? "unset" : "100%")};
  padding: 0px 12px 0px;
  z-index: 100;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }

  input {
    position: sticky;
    top: 0;
    background-color: #fff;
    border: none;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #798290;
    width: 100%;
    margin-bottom: 1px;
    padding-top: 8px;

    &:focus {
      outline: none;
    }
  }

  .item {
    font-size: 12px;
    font-weight: normal;
    color: #101010;
    margin-top: 10px;

    &:hover {
      cursor: pointer;
    }
  }

  .no-users {
    display: flex;
    height: 70%;
    justify-content: center;
    align-items: center;
  }
`;
