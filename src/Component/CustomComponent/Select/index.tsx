import React, { createRef, FC, useEffect, useState } from "react";
import ItemSelect from "./Item";
import * as Styled from "./style";
import arrowImg from "../../../assets/icons/Arowdropdown.svg";
import selectSingleImg from "./../../../assets/icons/selectMark.svg";
import selectMultiImg from "./../../../assets/icons/saved-tick.svg";
import SelectAhowAll from "./ShowAll";
import SelectSearch from "./Search";
import TitleRequired from "../TitleRequired";

export interface IDataSelectComponent {
  id: number;
  value: string;
}

export interface IDataPositionSelect {
  x: number;
  y: number;
}

interface IDataMedia {
  width: number;
}

export interface IMediaSelect {
  sm?: IDataMedia; //640
  md?: IDataMedia; //1024
  lg?: IDataMedia; //1200
  xl?: IDataMedia; //1400
}

interface IProps {
  width: number;
  mode: "single" | "multi";
  selectValue: IDataSelectComponent[];
  placeholder: string;
  data: IDataSelectComponent[];
  isRequired: boolean;
  onSelect: (item: IDataSelectComponent) => void;
  warning?: string;
  title?: string;
  media?: IMediaSelect;
}

const getWidthMedia = (media: IMediaSelect, width: number) => {
  const widthWindow = window.innerWidth;
  if (widthWindow <= 640 && media.sm) {
    return media.sm.width;
  }
  if (widthWindow <= 1024 && media.md) {
    return media.md.width;
  }
  if (widthWindow <= 1200 && media.lg) {
    return media.lg.width;
  }
  if (widthWindow <= 1400 && media.xl) {
    return media.xl.width;
  }
  return width;
};

const getTextPreview = (
  data: string[],
  length: number,
  mode: "single" | "multi",
  media?: IMediaSelect
) => {
  let width = media ? getWidthMedia(media, length) - 94 : length - 94;
  if (mode === "single") return data[0];
  const element = document.createElement("div");
  element.style.cssText = `
    position:fixed;
    z-index:-55;
    white-space: nowrap;
    font-family: ProximaNova;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
  `;
  document.body.appendChild(element);
  let start = 0;
  let deleteCount = 0;
  let arrText = [...data];
  let text = arrText.join(",");
  element.innerHTML = text;
  while (width < element.offsetWidth) {
    if (start + 1 === data.length) {
      text = start + 1 + " Items";
      break;
    }
    arrText.pop();
    deleteCount++;
    if (!arrText.length) {
      start++;
      deleteCount = start;
      arrText = data.slice(start);
    }
    text = arrText.join(",");
    text = !deleteCount ? text : text + "... +" + deleteCount + "More";
    element.innerHTML = text;
  }
  document.body.removeChild(element);
  return text;
};

const getIncludeItem = (
  selectValue: IDataSelectComponent[],
  item: IDataSelectComponent
) => {
  return !!selectValue.filter((itemS) => itemS.id === item.id).length;
};

const SelectComponent: FC<IProps> = ({
  selectValue,
  placeholder,
  data,
  mode,
  width,
  warning,
  isRequired,
  title,
  media,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFits, setIsFits] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showData, setShowData] = useState<IDataSelectComponent[]>([]);
  const [position, setPositin] = useState<IDataPositionSelect>({ x: 0, y: 0 });
  const ref = createRef<HTMLDivElement>();
  const isPlaceholder =
    mode === "single"
      ? !selectValue[0] || selectValue[0].value === ""
      : !selectValue.length;
  const selectImg = mode === "single" ? selectSingleImg : selectMultiImg;

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  useEffect(() => {
    if (!selectValue.length) setShowAll(false);
  }, [selectValue]);

  useEffect(() => {
    setShowData(
      data
        .filter((item) =>
          item.value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .filter((item) => (showAll ? selectValue.includes(item) : item))
    );
  }, [showAll, search]);

  const changePosition = () => {
    if (!ref.current) return;
    const { x, y } = ref.current.getBoundingClientRect();
    setPositin(() => {
      changeIsFits(y);
      return { x, y };
    });
  };

  const changeIsFits = (y: number) => {
    let value = y + 116;
    data.length > 5 ? (value += 255) : (value += data.length * 40);
    if (mode === "multi") value += 31;
    setIsFits(window.innerHeight > value);
  };

  const onChangeOpen = () => {
    changePosition();
    setOpen((prev) => !prev);
  };

  const onClickShowAll = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!selectValue.length) return;
    setShowAll((prev) => !prev);
  };

  const onSelectItem = (item: IDataSelectComponent) => {
    onSelect(item);
    if (mode === "single") {
      onChangeOpen();
    }
  };

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <TitleRequired isRequired={isRequired} status="editable" title={title}>
      <Styled.HeightWrapper ref={ref} width={width} breakpoint={media}>
        {open && <Styled.BackgroundWrapper onClick={onChangeOpen} />}
        <Styled.Wrapper
          isOpen={open}
          isFits={isFits}
          width={width}
          position={position}
          breakpoint={media}
        >
          <ItemSelect
            onClick={onChangeOpen}
            warning={warning}
            text={
              isPlaceholder
                ? placeholder
                : getTextPreview(
                    selectValue.map((item) => item.value),
                    width,
                    mode,
                    media
                  )
            }
            colorText={isPlaceholder ? "#6c7481" : "#101010"}
            isBorder={open}
            isFits={isFits}
            img={arrowImg}
          />
          {open && (
            <>
              <Styled.SettingWrapper
                isFits={isFits}
                isSetting={data.length > 5 || mode === "multi"}
              >
                {data.length > 5 && (
                  <SelectSearch value={search} onChange={onChangeSearch} />
                )}
                {mode === "multi" && (
                  <SelectAhowAll
                    color={!selectValue.length ? "#ad9ebe" : "#5900d3"}
                    onClick={onClickShowAll}
                    showAll={showAll}
                    count={selectValue.length}
                  />
                )}
              </Styled.SettingWrapper>

              <Styled.WrapperScroll isFits={isFits}>
                {showData.map((item, index) => (
                  <ItemSelect
                    key={item + "Select" + index}
                    onClick={() => {
                      onSelectItem(item);
                    }}
                    text={item.value}
                    colorText={
                      getIncludeItem(selectValue, item) ? "#5900d3" : "#101010"
                    }
                    img={getIncludeItem(selectValue, item) ? selectImg : ""}
                  />
                ))}
              </Styled.WrapperScroll>
            </>
          )}
        </Styled.Wrapper>
      </Styled.HeightWrapper>
    </TitleRequired>
  );
};

export default SelectComponent;
