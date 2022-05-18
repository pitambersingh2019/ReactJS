import styled from "styled-components";

export const UploadButtonContainer = styled.div`
  height: 24px;
  max-width: fit-content;
  display: flex;
  border-radius: 4px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.lightBlue2};
  padding: 0px 12px 0 2px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primaryBlue};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue3};
    color: ${(props) => props.theme.colors.blue4};
  }
`;

export const Icon = styled.img`
  height: 20px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;
