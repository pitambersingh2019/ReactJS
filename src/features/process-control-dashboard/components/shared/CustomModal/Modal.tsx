import { CSSProperties, ReactNode } from "react";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  customStyles?: {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    minHeight?: CSSProperties["minHeight"];
  };
};

export default function Modal({
  isOpen,
  handleClose,
  children,
  customStyles,
}: ModalProps) {
  const styles = customStyles || {
    width: "380px",
    height: "280px",
    padding: "32px 16px 16px 24px",
  };
  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={styles}
    >
      {children}
    </CustomPopover>
  );
}
