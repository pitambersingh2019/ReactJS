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
    width: CSSProperties["width"];
    height: CSSProperties["height"];
    padding: CSSProperties["padding"];
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="_"
      overlayClassName="_"
      contentElement={(props, children) => (
        <ModalStyles
          {...props}
          customStyles={customStyles}
          withBorder={withBorder}
        >
          {children}
        </ModalStyles>
      )}
      overlayElement={(props, contentElement) => (
        <OverlayStyles {...props}>{contentElement}</OverlayStyles>
      )}
    >
      {children}
    </Modal>
  );
}
