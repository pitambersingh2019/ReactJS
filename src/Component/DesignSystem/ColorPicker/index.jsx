import React, { useState, useEffect } from "react";
import styled from "styled-components";
import config from "./config";
import PalletePicker from "./PalletePicker";
import FillColor from "../../../assets/icons/FillColor.svg";

import { PositioningPortal } from "@codastic/react-positioning-portal";
const { squareSize, barSize, crossSize } = config;

export const TitleText = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #404d61;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const PickerWrapper = styled.div`
  user-select: none;
  position: relative;
`;

export const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 80%;
  &:hover {
    background-color: #d1d1d1;
  }
  cursor: pointer;
`;

function computeHueX(h) {
  return Math.round((squareSize / 360) * h - barSize / 2);
}

function computeSquareXY(s, l) {
  const t = (s * (l < 50 ? l : 100 - l)) / 100;
  const s1 = Math.round((200 * t) / (l + t)) | 0;
  const b1 = Math.round(t + l);
  const x = (squareSize / 100) * s1 - crossSize / 2;
  const y = squareSize - (squareSize / 100) * b1 - crossSize / 2;
  return [x, y];
}

const Picker = ({ TitleContent, SelectedColor, onSelectColor }) => {
  const [show, setShow] = useState(false);
  const [showPallete, setshowPallete] = useState(false);
  const [hue, setHue] = useState(180);
  const [hueX, setHueX] = useState(() => squareSize / 2 - barSize / 2);
  const [square, setSquare] = useState([100, 50]);
  const [squareXY, setSquareXY] = useState(() => [
    squareSize - crossSize / 2,
    crossSize / -2,
  ]);

  const [color, setColor] = useState(`hsla(180, 100%, 50%, 1)`);
  const [hex, sethex] = useState("#00ffff");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setColor(`hsla(${hue}, ${square[0]}%, ${square[1]}%, 1)`);
  }, [hue, square]);

  function hexToHSL(hex) {
    var HSL = {};

    try {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h,
        s,
        l = (max + min) / 2;
      if (max === min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
          default:
            break;
        }
        h /= 6;
      }

      HSL["h"] = h;
      HSL["s"] = s;
      HSL["l"] = l;
      return HSL;
    } catch {
      HSL["h"] = 0;
      HSL["s"] = 0;
      HSL["l"] = 0;
      return HSL;
    }
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  useEffect(() => {
    sethex(hslToHex(hue, square[0], square[1]));
  }, [hue, square]);

  function onHueChange(n) {
    setAnimate(true);
    setHue(n);
    setHueX(computeHueX(n));
  }

  // function onSaturationChange(n) {
  //   setAnimate(true)
  //   setSquare([n, square[1]])
  //   setSquareXY(computeSquareXY(n, square[1]))
  // }

  // function onLightnessChange(n) {
  //   setAnimate(true)
  //   setSquare([square[0], n])
  //   setSquareXY(computeSquareXY(square[0], n))
  // }

  const handleHexChange = (hex) => {
    sethex(hex);
    if (hex.length === 7) {
      setAnimate(true);
      setSquare([
        (hexToHSL(hex).s * 100).toFixed(),
        (hexToHSL(hex).l * 100).toFixed(),
      ]);
      setSquareXY(
        computeSquareXY(
          (hexToHSL(hex).s * 100).toFixed(),
          (hexToHSL(hex).l * 100).toFixed()
        )
      );
      onHueChange(hexToHSL(hex).h * 360);
      // onSaturationChange((hexToHSL(hex).s*100).toFixed());
    }
  };

  return (
    <Container>
      <PositioningPortal
        isOpen={showPallete}
        onOpen={() => setshowPallete(true)}
        onShouldClose={() => setshowPallete(false)}
        portalElement={
          <div style={{ position: "absolute", zIndex: 9999999 }} />
        }
        portalContent={
          <PalletePicker
            addcolorshow={setShow}
            show={show}
            SelectedColor={SelectedColor}
            onSelectColor={onSelectColor}
            hue={hue}
            hex={hex}
            squareXY={squareXY}
            setShow={setShow}
            animate={animate}
            hueX={hueX}
            handleHexChange={handleHexChange}
            setSquare={setSquare}
            setSquareXY={setSquareXY}
            setAnimate={setAnimate}
            setHueX={setHueX}
            setHue={setHue}
            color={color}
          />
        }
      >
        <div>
          {TitleContent && <TitleText> {TitleContent} </TitleText>}
          <PickerWrapper>
            <IconStyled
              src={FillColor}
              onClick={() => setshowPallete((prev) => !prev)}
            />
          </PickerWrapper>
        </div>
      </PositioningPortal>
    </Container>
  );
};

export default Picker;
