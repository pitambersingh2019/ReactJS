import styled from "styled-components";

interface TextCellProps {
  required: boolean | undefined;
}

export const TextCellWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
`;

export const ContentText = styled.p<TextCellProps>`
  font-weight: ${(props) => (props.required ? "bold" : "normal")};
  color: #101010;
  font-size: 14px;
  margin-bottom: 0;
  cursor: default;
`;

export const SettingIcon = styled.img`
  width: 19px;
`;
