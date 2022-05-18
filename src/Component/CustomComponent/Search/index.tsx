import * as Styled from "./style";
import searchImg from "../../../assets/icons/Search.svg";
import clearImg from "../../../assets/icons/Calculator_multiplication.svg";
import React, { createRef, FC, useEffect, useState } from "react";

interface IProps {
  onChange: (text: string) => void;
  value: string;
  placeholder?: string;
  isPadding?: boolean;
  border: "all" | "bottom" | "without";
  type?: string;
}

const SearchComponent: FC<IProps> = ({
  onChange,
  value,
  border,
  placeholder,
  isPadding = true,
  type,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [clearMode, setClearMode] = useState(false);
  const [ph, setPh] = useState<string>();
  const refInput = createRef<HTMLInputElement>();

  useEffect(() => {
    if (isActive) {
      setPh(undefined);
    } else {
      setPh(placeholder);
    }
  }, [isActive]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const changeStatus = () => {
    setIsActive((prev) => !prev);
    if (clearMode && refInput.current) {
      setClearMode(false);
      refInput.current.focus();
    }
  };

  const onClickClear = () => {
    onChange("");
    setClearMode(true);
  };

  const onClickWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!refInput.current) return;
    refInput.current.focus();
  };

  return (
    <Styled.Wrapper
      border={border}
      isActive={isActive}
      isPadding={isPadding}
      onClick={onClickWrapper}
      type={type}
    >
      {!isActive && value === "" && (
        <Styled.ImgWrapper cursor={false} type={type}>
          <img src={searchImg} alt="" />
        </Styled.ImgWrapper>
      )}

      <Styled.Input
        ref={refInput}
        value={value}
        onChange={onChangeInput}
        onFocus={changeStatus}
        onBlur={changeStatus}
        placeholder={ph}
        type={type}
      />

      {value !== "" && (
        <Styled.ImgWrapper cursor={true} onMouseDown={onClickClear}>
          <img src={clearImg} alt="" />
        </Styled.ImgWrapper>
      )}
    </Styled.Wrapper>
  );
};

export default SearchComponent;
