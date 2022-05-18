import { CSSProperties } from "react";
import Modal from "react-modal";
import { ModalStyles, OverlayStyles } from "./custom-popover.styles";

Modal.setAppElement("#page-top");
// Modal.setAppElement("#root");

type CustomPopoverProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  customStyles: {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    minHeight?: CSSProperties["minHeight"];
  };
  withBorder?: boolean;
};

export default function CustomPopover({
  isOpen,
  handleClose,
  children,
  customStyles,
  withBorder = true,
}: CustomPopoverProps) {
  const onOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleClose();
  };

  const onModalClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="_"
      overlayClassName="_"
      contentElement={(props, children) => (
        <div onClick={onModalClick}>
          <ModalStyles
            {...props}
            customStyles={customStyles}
            withBorder={withBorder}
          >
            {children}
          </ModalStyles>
        </div>
      )}
      overlayElement={(props, contentElement) => (
        <div onClick={onOverlayClick}>
          <OverlayStyles {...props}>{contentElement}</OverlayStyles>
        </div>
      )}
    >
      {children}
    </Modal>
  );
}
