import { FC, ReactNode } from "react";
import * as Styled from "./style";

interface IProps {
  mainTitle: ReactNode;
  subTitle: ReactNode;
}

const LayoutStep: FC<IProps> = ({ children, mainTitle, subTitle }) => {
  return (
    <Styled.Wrapper>
      <Styled.TitleWrapper>
        <Styled.TitleText>{mainTitle}</Styled.TitleText>
        <Styled.SubTitleText>{subTitle}</Styled.SubTitleText>
      </Styled.TitleWrapper>
      <Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
    </Styled.Wrapper>
  );
};

export default LayoutStep;
