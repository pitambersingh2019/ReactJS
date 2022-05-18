import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import ResetColor from "../../../assets/icons/reset_color.svg";
import {
  ClearColors,
  getColorsLocalStorage,
  saveColorinLocalStorage,
} from "./utils";
import Button from "../Buttons";
import Modal from "./Modal";
import Hue from "./Hue";
import Square from "./Square";
import config from "./config";
const { squareSize } = config;
const Wrapper = styled.div`
  width: 312px;
  margin: 4px 0 0;
  padding: 15px 16px 23px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #eeeff1;
  background-color: #ffffff;
`;

const ResetSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: center;
`;

const ResetTitle = styled.div`
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;

const ColorsSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: center;
`;

const ColorWrappeCircle = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: solid 2px #ffffff;
`;
const ColorCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border-collapse: separate;
  border-spacing: 15px;
  border: solid 1px #d1d1d1;
  background-color: ${(p) => p.color};
`;

const ColorCircleSelected = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: solid 2px #1268fb;
`;

const AddColorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const DividerLine = styled.div`
  margin-top: 24px;
  margin-bottom: 20px;
  height: 1px;
  background-color: #d1d1d1;
`;

const AddWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const AddColorTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1268fb;
`;

const ResetColorImg = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const PickerOuter = styled.div`
  width: ${squareSize + 20 + 16 + 16}px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #eeeff1;
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;

const PickerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  justify-content: space-evenly;
  width: 100%;
  height: 88px;
`;

export const Backdrop = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${(p) => (p.show ? "block" : "none")};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  justify-content: space-between;
  width: 100%;
  height: 88px;
`;

const ColorIconPicked = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(p) => p.color};
`;

const Title = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  margin-left: 16px;
  margin-right: 16px;
  text-align: left;
  color: #4a4a4a;
`;

const InputWrapper = styled.div`
  height: 40px;
  padding: 12px 12px 12px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: 4px;
  border: solid 1px #6c7481;
  background-color: #ffffff;
`;

export const InputFieldStyled = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
`;

const HardCodedColors = [
  [
    "#ffffff",
    "#000000",
    "#757575",
    "#fa7922",
    "#fcbe2e",
    "#2f903c",
    "#1579d2",
    "#841da2",
    "#dd2a2f",
  ],
  [
    "#bdbdbd",
    "#906d63",
    "#77919d",
    "#fea428",
    "#cfe157",
    "#1aaa9a",
    "#21cada",
    "#5e6cc0",
    "#f93c7a",
  ],
];

const PalletePicker = ({
  addcolorshow,
  show,
  SelectedColor,
  onSelectColor,
  hue,
  squareXY,
  animate,
  handleHexChange,
  setSquare,
  setSquareXY,
  setAnimate,
  setHueX,
  setHue,
  color,
  setShow,
  hueX,
  hex,
}) => {
  const [colorSelected, setcolorSelected] = useState(
    SelectedColor ?? "#000000"
  );

  useEffect(() => {
    if (SelectedColor) setcolorSelected(SelectedColor);
    else setcolorSelected("#000000");
  }, [SelectedColor]);
  const [Colors, setColors] = useState([]);
  ///^#[0-9A-F]{6}$/i.test(SelectedColor)
  useEffect(() => {
    const colorsArray = getColorsLocalStorage() ?? [];
    setColors(colorsArray);
  }, [show]);

  const handleResetColors = () => {
    ClearColors();
    const colorsArray = getColorsLocalStorage() ?? [];
    setColors(colorsArray);
  };

  const handleColorChange = (color) => {
    if (color === colorSelected) {
      setcolorSelected(null);
      if (onSelectColor) onSelectColor(null);
    } else {
      setcolorSelected(color);
      if (onSelectColor) onSelectColor(color);
    }
  };

  useEffect(() => {
    const colorsArray = getColorsLocalStorage() ?? [];
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    if (reg.test(colorSelected)) {
      if (
        HardCodedColors[0].indexOf(colorSelected) < 0 &&
        HardCodedColors[1].indexOf(colorSelected) < 0 &&
        colorsArray.indexOf(colorSelected) < 0
      ) {
        colorsArray.push(colorSelected);
        setColors(colorsArray);
      }
    }
  }, [colorSelected]);
  const SquareRef = useRef(null);

  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const setOffsets = useCallback(() => {
    const bounding = SquareRef.current.getBoundingClientRect();
    setOffsetTop(bounding.top);
    setOffsetLeft(bounding.left);
    setShow(false);
  }, []);

  useEffect(() => {
    if (show) {
      const bounding = SquareRef.current.getBoundingClientRect();
      setOffsetTop(bounding.top);
      setOffsetLeft(bounding.left);
      window.addEventListener("resizeend", setOffsets);
      window.addEventListener("scroll", setOffsets);
    }

    return () => {
      window.removeEventListener("resizeend", setOffsets);
      window.removeEventListener("scroll", setOffsets);
    };
  }, [setOffsets, show]);

  const handleSelectColor = () => {
    //add to storage
    setShow(false);
    const colorsArray = getColorsLocalStorage() ?? [];
    if (
      HardCodedColors[0].indexOf(colorSelected) < 0 &&
      HardCodedColors[1].indexOf(colorSelected) < 0 &&
      colorsArray.indexOf(colorSelected) < 0
    ) {
      saveColorinLocalStorage(hex);
    }
  };
  return (
    <Wrapper>
      <ResetSection>
        <ResetTitle>Reset</ResetTitle>
      </ResetSection>
      {HardCodedColors.map((colors, index) => (
        <ColorsSection key={index}>
          {colors.map((color, index) =>
            color === colorSelected ? (
              <ColorCircleSelected key={index}>
                <ColorCircle
                  color={color}
                  onClick={() => handleColorChange(color)}
                ></ColorCircle>
              </ColorCircleSelected>
            ) : (
              <ColorWrappeCircle>
                <ColorCircle
                  onClick={() => handleColorChange(color)}
                  color={color}
                ></ColorCircle>
              </ColorWrappeCircle>
            )
          )}
        </ColorsSection>
      ))}

      <DividerLine />
      <AddColorContainer>
        <AddWrapper onClick={() => addcolorshow((prev) => !prev)}>
          <AddIcon style={{ color: "#1268fb", fontSize: "20px" }} />
          <AddColorTitle>Add Color</AddColorTitle>
        </AddWrapper>
        <ResetColorImg src={ResetColor} onClick={handleResetColors} />
      </AddColorContainer>
      <ColorsSection>
        {Colors.map((color) =>
          color === colorSelected ? (
            <ColorCircleSelected>
              <ColorCircle
                color={color}
                onClick={() => handleColorChange(color)}
              ></ColorCircle>
            </ColorCircleSelected>
          ) : (
            <ColorWrappeCircle>
              <ColorCircle
                onClick={() => handleColorChange(color)}
                color={color}
              ></ColorCircle>
            </ColorWrappeCircle>
          )
        )}
      </ColorsSection>
      <Modal show={show} onClose={() => setShow(false)}>
        <PickerOuter>
          <Header>
            <ColorIconPicked color={color} />
            <Title>Hex</Title>
            <InputWrapper>
              <InputFieldStyled
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
              />
            </InputWrapper>
          </Header>

          <PickerInner>
            <Square
              SquareRef={SquareRef}
              hue={hue}
              squareXY={squareXY}
              offsetTop={offsetTop}
              offsetLeft={offsetLeft}
              animate={animate}
              setSquare={setSquare}
              setSquareXY={setSquareXY}
              setAnimate={setAnimate}
            />
            <Hue
              hueX={hueX}
              offsetLeft={offsetLeft}
              animate={animate}
              setHueX={setHueX}
              setHue={setHue}
              setAnimate={setAnimate}
            />
          </PickerInner>
          <Footer>
            <Button
              onClick={() => setShow(false)}
              label="Cancel"
              variant="purple-secondary"
              size="sm"
              width="40%"
            />
            <Button
              onClick={handleSelectColor}
              label="Select"
              variant="purple"
              size="sm"
              width="40%"
            />
          </Footer>
        </PickerOuter>
      </Modal>
    </Wrapper>
  );
};

export default PalletePicker;
