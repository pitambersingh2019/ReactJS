import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import HeaderSettingModal from "./header/intex";
import * as Styled from "./style";

interface IProps {
  onClose: () => void;
  title: string;
  imgTitle?: string;
}

const PortalWrapper: FC<IProps> = ({ onClose, children, title, imgTitle }) => {
  const [root] = useState(() => document.createElement("div"));

  useEffect(() => {
    root.classList.add("CustomPortalComponent");
    document.body.appendChild(root);
    return () => {
      document.body.removeChild(root);
    };
  }, []);

  return createPortal(
    <Styled.WrapperBackground>
      <Styled.Wrapper>
        <HeaderSettingModal onClose={onClose} title={title} img={imgTitle} />
        <Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
      </Styled.Wrapper>
    </Styled.WrapperBackground>,
    root
  );
};

export default PortalWrapper;
