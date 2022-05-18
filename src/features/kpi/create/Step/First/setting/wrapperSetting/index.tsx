import { FC } from "react";
import * as Styled from "./style";

interface IProps {
  title: string;
  gap: number;
  isActive: boolean;
}

const WrapperSetting: FC<IProps> = ({ title, gap, isActive, children }) => {
  return (
    <Styled.Wrapper>
      <Styled.TitleSetting isActive={isActive}>{title}</Styled.TitleSetting>
      <Styled.WrapperChildren gap={gap}>{children}</Styled.WrapperChildren>
    </Styled.Wrapper>
  );
};

export default WrapperSetting;
