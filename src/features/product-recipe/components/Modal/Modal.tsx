import { useState, useRef, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import Button from "../../../../Component/DesignSystem/Buttons";
import closeIcon from "../../../../assets/icons/closeIcon.svg";
import {
  StyledModalBackground,
  StyledModalContentWrapper,
  StyledModalContent,
  StyledModalHeader,
  StyleModalHeaderTitle,
  StyledModalDescription,
  StyledButtonGroup,
  StlyledCloseIcon,
} from "./modal.styles";

interface ModalProps {
  closeModal: () => void;
  handleApply: () => void;
  title?: string;
  description?: string;
  Content: ReactNode;
  disableApply: boolean;
}

const DefaultModal: React.FC<ModalProps> = ({
  closeModal,
  handleApply,
  title,
  description,
  Content,
  disableApply,
}) => {
  const { t } = useTranslation();
  const modalHeader = useRef<HTMLDivElement>(null);
  const [modalHeaderHeight, SetModalHeaderHeight] = useState(0);

  useEffect(() => {
    if (modalHeader.current) {
      SetModalHeaderHeight(modalHeader.current.clientHeight);
    }
  }, []);

  return (
    <StyledModalBackground>
      <StyledModalContentWrapper>
        <StlyledCloseIcon
          src={closeIcon}
          alt="close icon"
          onClick={closeModal}
        />
        <StyledModalHeader ref={modalHeader}>
          <StyleModalHeaderTitle>{title}</StyleModalHeaderTitle>
          <StyledModalDescription>{description}</StyledModalDescription>
        </StyledModalHeader>
        <StyledModalContent headerHeight={modalHeaderHeight}>
          {Content}
        </StyledModalContent>
        <StyledButtonGroup justify="right">
          <Button
            onClick={closeModal}
            label={t(translations.ProductRecipe.CANCEL)}
            size="lg"
            variant="secondary"
          />
          <Button
            onClick={handleApply}
            label={t(translations.ProductRecipe.APPLY)}
            size="lg"
            disabled={disableApply}
          />
        </StyledButtonGroup>
      </StyledModalContentWrapper>
    </StyledModalBackground>
  );
};

export default DefaultModal;
