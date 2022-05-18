import { ReactNode, useLayoutEffect, useState } from "react";
import CustomPopover from "../../../../../../../../Component/CustomModal/CustomPopover";
import Buttons from "./Buttons/Buttons";
import Header from "./Header/Header";
import { Divider, TableWrapper } from "./popover.styles";

type PopoverProps = {
  isOpen: boolean;
  handleClose: () => void;
  headerTitle: string;
  headerSubtitle?: string;
  onApply: () => void;
  tableComponent: ReactNode;
  isApplyDisabled: boolean;
};

function getWindowDimensions() {
  const { innerHeight: height } = window;
  return {
    height,
  };
}

export default function Popover({
  isOpen,
  handleClose,
  headerTitle,
  headerSubtitle = "",
  onApply,
  tableComponent,
  isApplyDisabled,
}: PopoverProps) {
  const [tableWrapperHeight, setTableWrapperHeight] = useState(0);
  const handleApply = () => {
    onApply();
    handleClose();
  };

  useLayoutEffect(() => {
    const updateTableHeight = () => {
      const containerHeight = getWindowDimensions().height * 0.8;
      const tableWrapperHeight = containerHeight - 100;
      setTableWrapperHeight(tableWrapperHeight - 72 - 12);
    };

    updateTableHeight();
    window.addEventListener("resize", updateTableHeight);
    return () => window.removeEventListener("resize", updateTableHeight);
  }, []);

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "80%",
        height: "80%",
        padding: "0px",
      }}
    >
      <Header
        headerTitle={headerTitle}
        headerSubtitle={headerSubtitle}
        onClose={handleClose}
      />
      <Divider />
      <TableWrapper tableWrapperHeight={tableWrapperHeight}>
        {tableComponent}
      </TableWrapper>
      <Buttons
        onCancel={handleClose}
        onApply={handleApply}
        isDisabled={isApplyDisabled}
      />
    </CustomPopover>
  );
}
