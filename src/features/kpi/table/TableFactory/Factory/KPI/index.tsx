import React, {
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { Badge } from "@material-ui/core";

import { dataIKPI } from "../../../../reducer/types";
import {
  clickSwitchKPIAC,
  MakePrimaryKPIAC,
} from "../../../../reducer/actions/intex";
import { DeleteKPIAC } from "../../../../reducer/actions/intex";
import { IKPISave } from "../../../../api/types";

import {
  getDisplayComponent,
  IDataDisplayComponent,
} from "../../../../components";
import { ObserveAnimate } from "../../../../../../Containers/RuleContainer/Components/CardView/AnimateCard";
import MySwitch from "../../../../../../Component/CustomComponent/MySwitch";
import HtmlTooltip from "../../../../../../Component/ToolTip/TooltipSelect";
import flagDefault from "./../../../../assets/img/Bookmark_default.svg";
import flagSelected from "./../../../../assets/img/Bookmark_selected.svg";
import dots from "./../../../../assets/img/3_dots_menu.svg";
import dotsHover from "./../../../../assets/img/3_dots_menu_hover.svg";
import EditSetting from "./EditSetting";

import * as Styled from "./style";

interface IProps {
  kpi: dataIKPI;
  filterKPIs: dataIKPI[];
  isPrimary: boolean;
  departmentID: number;
  departmentName: string | null;
  setCurrentKPI: Dispatch<SetStateAction<number>>;
  setDropKPI: (kpi: dataIKPI) => void;
  onDragDrop: () => void;
  creationDate: string;
}

const setViewComponent = (
  displayType: number,
  min: number,
  max: number,
  progress: string | number,
  isResultValid: boolean
) => {
  progress = typeof progress !== "number" || isNaN(progress) ? 0 : progress;
  const data: IDataDisplayComponent = {
    size: "m",
    min,
    max,
    progress,
    isPersent: true,
    isPrimary: false,
    media: {},
    isResultValid,
  };

  const dataL: IDataDisplayComponent = {
    ...data,
    size: "l",
  };

  if (displayType >= 2 && displayType <= 4) {
    return getDisplayComponent.getGauge(
      data,
      (displayType / 2) as 1 | 2,
      "white"
    );
  }
  if (displayType === 5) {
    return getDisplayComponent.getGraph(data);
  }
  return getDisplayComponent.getValuePercent(dataL, "bottom-left");
};

const KPI: FC<IProps> = ({
  kpi,
  isPrimary,
  departmentID,
  departmentName,
  filterKPIs,
  setCurrentKPI,
  setDropKPI,
  onDragDrop,
  creationDate,
}) => {
  const [isOpenDots, setIsOpenDots] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [isNewKPI, setIsNewKPI] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [kpiId, setKpiId] = useState<number>(0);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const observeElement = ObserveAnimate();

  let ViewComponent = setViewComponent(
    kpi.DisplayType,
    kpi.MinValue,
    kpi.MaxValue,
    kpi.Result,
    kpi.isResultValid
  );

  const initialKPI: IKPISave = {
    MainKPI: kpi.isActive,
    FormulaID: kpi.FormulaID,
    FormulaName: kpi.FormulaName,
    Formula: kpi.Formula,
    Filter: kpi.Filter,
    MinValue: kpi.MinValue,
    MaxValue: kpi.MaxValue,
    MinValueShift: kpi.MinValueShift,
    MaxValueShift: kpi.MaxValueShift,
    MinValueDay: kpi.MinValueDay,
    MaxValueDay: kpi.MaxValueDay,
    MinValueWeek: kpi.MinValueWeek,
    MaxValueWeek: kpi.MaxValueWeek,
    MinValueMonth: kpi.MinValueMonth,
    MaxValueMonth: kpi.MaxValueMonth,
    IsActive: kpi.isActive,
    DecimalsRound: kpi.DecimalsRound,
    DepartmentID: departmentID,
    DisplayType: kpi.DisplayType,
  };

  const onClickDots = () => {
    setIsScale(false);
    setIsOpenDots((prev) => !prev);
  };

  const onDragStartHandler = () => {
    setCurrentKPI(kpi.FormulaID);
  };
  const onDragLeaveHandler = () => {
    setIsDragOver(false);
  };
  const onDragEndHandler = () => {
    setIsDragOver(false);
    setIsDrag(false);
    onDragDrop();
  };
  const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropKPI(kpi);
    setIsDragOver(true);
  };
  const onDragHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    setIsDrag(true);
  };

  const onClickSwitch = () => {
    const kpiSave: IKPISave = {
      ...initialKPI,
      MainKPI: isPrimary && !kpi.isActive,
      IsActive: !kpi.isActive,
    };
    dispatch(clickSwitchKPIAC(kpiSave, departmentID, isPrimary));
  };

  const onClickPrimary = () => {
    if (!kpi.isActive) return;

    dispatch(MakePrimaryKPIAC(kpi.FormulaID));
  };

  const getNameComponent = () => {
    const name =
      kpi.FormulaName.length > 21
        ? kpi.FormulaName.slice(0, 18) + "..."
        : kpi.FormulaName;

    const component = <Styled.KPIFormulaName>{name}</Styled.KPIFormulaName>;

    if (kpi.FormulaName.length > 21 && !isDrag) {
      return (
        <HtmlTooltip title={<div>{kpi.FormulaName}</div>}>
          {component}
        </HtmlTooltip>
      );
    }
    return component;
  };

  const handleConfirmDelete = (id: number) => {
    setIsOpenDots(false);
    setOpenConfirmDialog(true);
    setKpiId(id);
  };

  const handleDeleteKpi = () => {
    dispatch(DeleteKPIAC(kpiId));
  };

  useEffect(() => {
    setIsDragOver(false);
  }, [filterKPIs]);

  useEffect(() => {
    if (creationDate) {
      const currentDate = Date.parse(new Date().toString());
      const kpiCreationDate = Date.parse(creationDate);
      const diff = currentDate - kpiCreationDate;
      const minute = 60 * 1000;
      const isNew = diff < minute;
      if (isNew) {
        // @ts-ignore
        const kpiToScale = JSON.parse(sessionStorage.getItem("newKpi"));
        const isKpiToScale = kpiToScale?.id === kpi.FormulaID;
        setIsScale(isKpiToScale);
      }
      setIsNewKPI(isNew);
    }
  }, [creationDate]);

  return (
    <Styled.Wrapper
      onDragStart={onDragStartHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragOverHandler}
      onDrag={onDragHandler}
      onDragEnd={onDragEndHandler}
      draggable={!!filterKPIs.length && !isOpenDots}
      isDragOver={isDragOver}
      isDrag={isDrag}
      ref={(node) => {
        if (node && isNewKPI && isScale) {
          observeElement(node, "kpi");
          node.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      }}
    >
      <Styled.KPISetting>
        <MySwitch checked={kpi.isActive} onChange={onClickSwitch} />
        <Styled.SettingFlag>
          <HtmlTooltip
            title={
              <div>
                {isPrimary
                  ? t(translations.CustomKPI.TablePrimary)
                  : t(translations.CustomKPI.TableMakePrimary)}
              </div>
            }
          >
            <Styled.FlagWrapper
              onClick={onClickPrimary}
              isActiveKPI={kpi.isActive}
            >
              <img
                src={isPrimary ? flagSelected : flagDefault}
                draggable={false}
                alt=""
              />
            </Styled.FlagWrapper>
          </HtmlTooltip>
          <Styled.DotsWrapper>
            <img src={dots} onClick={onClickDots} draggable={false} alt="" />
            <img
              src={dotsHover}
              onClick={onClickDots}
              draggable={false}
              alt=""
            />
            {isOpenDots && departmentID !== null && departmentName !== null && (
              <EditSetting
                onClose={onClickDots}
                kpi={kpi}
                departmentName={departmentName}
                departmentID={departmentID}
                isPrimary={isPrimary}
                handleConfirmDelete={handleConfirmDelete}
              />
            )}
          </Styled.DotsWrapper>
        </Styled.SettingFlag>
      </Styled.KPISetting>
      <Styled.DisplayWrapper>{ViewComponent}</Styled.DisplayWrapper>
      <Styled.KPINameWrapper>{getNameComponent()}</Styled.KPINameWrapper>
      <Styled.KPIFooter>
        <Badge badgeContent={1} color={"primary"} invisible={true}>
          <Styled.KPIFooterBadge visible={isNewKPI}>
            {t(translations.CustomKPI.NewLabel)}
          </Styled.KPIFooterBadge>
        </Badge>
      </Styled.KPIFooter>
      {openConfirmDialog && (
        <Styled.PopupWrapper opened={openConfirmDialog}>
          <Styled.Popup>
            <Styled.PopupTitleContainer>
              <Styled.PopupTitle>
                {t(translations.CustomKPI.DeleteKpiConfirmationTitle)}
              </Styled.PopupTitle>
            </Styled.PopupTitleContainer>
            <Styled.PopupBottom>
              <Styled.PopupCancel onClick={() => setOpenConfirmDialog(false)}>
                {t(translations.CustomKPI.CancelButtonTitle)}
              </Styled.PopupCancel>
              <Styled.PopupDelete onClick={() => handleDeleteKpi()}>
                {t(translations.CustomKPI.TableDelete)}
              </Styled.PopupDelete>
            </Styled.PopupBottom>
          </Styled.Popup>
        </Styled.PopupWrapper>
      )}
    </Styled.Wrapper>
  );
};

export default KPI;
