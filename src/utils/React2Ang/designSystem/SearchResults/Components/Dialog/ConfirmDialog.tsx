import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import Button from "../../../../../../Component/DesignSystem/Buttons";
const Content = styled.div`
  padding: 20px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const Title = styled.div`
  padding: 20px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;
interface ToolTipInterface {
  children?: React.ReactChild;
  onConfirm: () => void;
  Title: string;
  Content: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}
export const ConfirmDialog: React.FC<ToolTipInterface> = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const handleConfirm = () => {
    props.onConfirm();
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <div>{props.children}</div>
      <Dialog
        fullScreen={fullScreen}
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Title>{props.Title}</Title>
        <Content>{props.Content}</Content>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "10px",
            marginRight: "10px",
            gap: "10px",
          }}
        >
          <Button
            onClick={handleClose}
            label={t(translations.RulesContainer.TABLEPOPUP.CANCEL)}
            variant="purple-secondary"
            width="45%"
          />
          <Button
            onClick={handleConfirm}
            label={t(translations.RulesContainer.TABLEPOPUP.YES)}
            variant="purple"
            width="45%"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
