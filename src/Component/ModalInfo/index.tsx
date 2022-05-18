import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/CloseOutlined";
// @ts-ignore
import rtl from "styled-components-rtl";

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: "background.paper";
  border: "2px solid #000";
  box-shadow: 24;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  width: 4px;
  height: 48px;
  border-radius: 2px;

  ${rtl`
     margin-right: 8px;
  `}
  background-color: #ff9900;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${rtl`
     margin-left: 12px;
  `}
`;

const Title = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;

  ${rtl`
     text-align: left;
  `}
  color: #000;
`;

const SubTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  ${rtl`
     text-align: left;
  `}
  color: #757575;
`;

interface ModalInterface {
  TitleText: string;
  ContentText: string;
  showModal: boolean;
  setshowModal: (state: boolean) => void;
}

const ModalInfo: React.FC<ModalInterface> = (props) => {
  const { TitleText, ContentText, showModal, setshowModal } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setshowModal(false);
  };

  return (
    <div>
      <div onClick={handleOpen}> {props.children} </div>
      {showModal ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Container>
              <LeftSide>
                <Line />
                <InfoIcon
                  style={{ color: "#ff9900", height: "24px", width: "24px" }}
                />
                <TextWrapper>
                  <Title>{TitleText}</Title>
                  <SubTitle>{ContentText}</SubTitle>
                </TextWrapper>
              </LeftSide>
              <RightSide>
                <CloseIcon
                  onClick={handleClose}
                  style={{ height: "24px", width: "24px", cursor: "pointer" }}
                />
              </RightSide>
            </Container>
          </Fade>
        </Modal>
      ) : null}
    </div>
  );
};

export default ModalInfo;
