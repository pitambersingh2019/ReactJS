import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { translations } from "../../locales/translations";
import Button from "../DesignSystem/Buttons";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ButtonOld = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 7px 25px;
  background-color: #0080ff;
  border-radius: 5px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: white;

  &:hover {
    opacity: 0.5;
  }
`;
interface ToolTipInterface {
  children?: React.ReactChild;
  onConfirm: () => void;
  Title: string;
  Content: string;
}
export const ConfirmDialog: React.FC<ToolTipInterface> = (props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    props.onConfirm();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{props.children}</div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
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
            label={t(translations.RulesContainer.TABLEPOPUP.CANCEL)}
            onClick={handleClose}
            width="45%"
            size="md"
            variant="purple-secondary"
          />
          {/*<Button style={{ flex: "1" }} onClick={handleClose}>*/}
          {/*  {t(translations.RulesContainer.TABLEPOPUP.CANCEL)}*/}
          {/*</Button>*/}
          <Button
            label={t(translations.RulesContainer.TABLEPOPUP.YES)}
            onClick={handleConfirm}
            width="45%"
            size="md"
            variant="purple"
          />
          {/*<Button style={{ flex: "1" }} onClick={handleConfirm}>*/}
          {/*  {t(translations.RulesContainer.TABLEPOPUP.YES)}*/}
          {/*</Button>*/}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
