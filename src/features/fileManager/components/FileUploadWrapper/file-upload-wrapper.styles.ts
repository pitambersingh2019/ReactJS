import styled from "styled-components";

const getBorderColor = (isError: boolean) => {
  if (isError) {
    return "red";
  }

  return "gray2";
};

export const FileUploadWrapperContainer = styled.div<{
  isError: boolean;
}>`
  border: ${(props) =>
    `dashed 1px ${props.theme.colors[getBorderColor(props.isError)]}`};
  border-radius: 4px;
  margin: 24px 40px;
  width: 800px;
  height: 488px;
  display: flex;
  flex-direction: column;
`;
