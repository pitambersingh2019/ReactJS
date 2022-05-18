import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.lightGray2};
  padding: 14px 16px 10px 8px;
`;

export const Name = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PencilIcon = styled.img`
  height: 14px;
  margin-inline-end: 16px;
  cursor: pointer;
`;

export const DeleteIcon = styled.img`
  height: 20px;
  cursor: pointer;
`;
