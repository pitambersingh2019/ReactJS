import { FC } from "react";
import * as Styled from "./style";
import closeImg from "./../../../../assets/img/Calculator_multiplication.svg";
import { IFilter, IFilterLabels } from "../../../../api/types";
import HtmlTooltip from "../../../../../../Component/ToolTip/TooltipSelect";

type TName = keyof IFilterLabels;
interface IProps {
  tabs: IFilterLabels;
  isTooltip: boolean;
  clearFilterID?: (name: TName) => void;
}

const TabsKeyToName = (key: string) => {
  switch (key) {
    case "MachineIdFilter": {
      return "Machine";
    }
    case "ShiftNameFilter": {
      return "Shifts";
    }
    case "ERPJobDefFilter": {
      return "Job def";
    }
    case "ProductGroupFilter": {
      return "Product group";
    }
    case "ProductIdFilter": {
      return "Product id";
    }
    case "MoldGroupFilter": {
      return "Mold group";
    }
    case "MoldIdFilter": {
      return "Mold id";
    }
    case "UserIdFilter": {
      return "User id";
    }
    case "ClientIdFilter": {
      return "Client id";
    }
    case "IsEndOfLineFilter": {
      return "End of line";
    }

    default: {
      return "Any filter";
    }
  }
};

const TitleTooltip = (name: string, value: IFilter[]) => {
  return (
    <Styled.TooltipWrapper>
      {value.map((item) => {
        if (item.GroupName) {
          return (
            <Styled.TooltipText key={item.ID}>
              {item.GroupName + " , " + item.Name}
            </Styled.TooltipText>
          );
        }
        return (
          <Styled.TooltipText key={item.ID}>{item.Name}</Styled.TooltipText>
        );
      })}
    </Styled.TooltipWrapper>
  );
};

const Tabs: FC<IProps> = ({ tabs, clearFilterID, isTooltip }) => {
  const keyTabs = Object.entries(tabs);

  const onClickImg = (name: TName) => {
    if (clearFilterID) {
      clearFilterID(name);
    }
  };

  const getTab = (name: string, value: any) => {
    const tab = (
      <Styled.Tab>
        <Styled.TabName>
          {`${TabsKeyToName(name)} (${value.length})`}
        </Styled.TabName>
        {clearFilterID && (
          <Styled.WrapperCloseImg
            onClick={() => {
              onClickImg(name as TName);
            }}
          >
            <img src={closeImg} alt="" />
          </Styled.WrapperCloseImg>
        )}
      </Styled.Tab>
    );
    if (name === "IsEndOfLineFilter") return tab;
    return (
      <HtmlTooltip
        key={name}
        title={isTooltip ? TitleTooltip(name, value) : ""}
      >
        {tab}
      </HtmlTooltip>
    );
  };

  return (
    <>
      {keyTabs.map(([name, value]) => {
        if (!value.length) return null;
        return getTab(name, value);
      })}
    </>
  );
};

export default Tabs;
