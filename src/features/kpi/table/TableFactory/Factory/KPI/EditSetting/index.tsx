import * as Styled from "./style";
import editImg from "./../../../../../assets/img/Edit.svg";
import editWhiteImg from "./../../../../../assets/img/Edit_White.svg";
import duplicateImg from "./../../../../../assets/img/Duplicate.svg";
import duplicateWhiteImg from "./../../../../../assets/img/Duplicate_White.svg";
import deleteImg from "./../../../../../assets/img/delete.svg";
import deleteWhiteImg from "./../../../../../assets/img/delete_White.svg";
import primaryImg from "./../../../../../assets/img/Bookmark_default.svg";
import primaryWhiteImg from "./../../../../../assets/img/Bookmark_default_White.svg";
import PointEditSetting from "./Point";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { dataIKPI } from "../../../../../reducer/types";
import { setCreateState, setIsCreate } from "../../../../../reducer";
import { TDisplay, TGuageType } from "../../../../../create/types";
import {
  DuplicateKPIAC,
  MakePrimaryKPIAC,
} from "../../../../../reducer/actions/intex";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";

interface IProps {
  onClose: () => void;
  kpi: dataIKPI;
  departmentName: string;
  isPrimary: boolean;
  departmentID: number;
  handleConfirmDelete: (FormulaID: number) => void;
}

const getDisplayType = (DisplayType: number): TDisplay => {
  if (DisplayType === 1) return "Percent";
  if (DisplayType === 5) return "Graph";
  return "Gauge";
};

const getGuagleType = (DisplayType: number): TGuageType | "" => {
  if (DisplayType === 2) return "single";
  return "3 ranges";
};

const EditSetting: FC<IProps> = ({
  onClose,
  kpi,
  departmentName,
  isPrimary,
  departmentID,
  handleConfirmDelete,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const editPoint = [
    {
      text: t(translations.CustomKPI.TableEdit),
      img: editImg,
      imgWhite: editWhiteImg,
      onClick: () => {
        dispatch(
          setCreateState({
            isPrimary: kpi.isPrimary,
            isActive: kpi.isActive,
            digists: kpi.DecimalsRound,
            formulaID: kpi.FormulaID,
            DepartmentName: departmentName,
            departmentID: departmentID,
            KPIName: kpi.FormulaName,
            formula: kpi.Formula,
            displayType: getDisplayType(kpi.DisplayType),
            gaugeType: getGuagleType(kpi.DisplayType),
            filter: kpi.Filter,
            displayOrder: kpi.DisplayOrder,
            MaxValue: kpi.MaxValue,
            MaxValueDay: kpi.MaxValueDay,
            MaxValueMonth: kpi.MaxValueMonth,
            MaxValueShift: kpi.MaxValueShift,
            MaxValueWeek: kpi.MaxValueWeek,
            MinValue: kpi.MinValue,
            MinValueDay: kpi.MinValueDay,
            MinValueMonth: kpi.MinValueMonth,
            MinValueShift: kpi.MinValueShift,
            MinValueWeek: kpi.MinValueWeek,
          })
        );
        dispatch(setIsCreate());
      },
    },
    {
      text: t(translations.CustomKPI.TableDuplicate),
      img: duplicateImg,
      imgWhite: duplicateWhiteImg,
      onClick: () => {
        dispatch(DuplicateKPIAC(kpi.FormulaID));
      },
    },
    {
      text: t(translations.CustomKPI.TableDelete),
      img: deleteImg,
      imgWhite: deleteWhiteImg,
      // onClick: () => {
      //   dispatch(DeleteKPIAC(kpi.FormulaID));
      // },
      onClick: () => {
        handleConfirmDelete(kpi.FormulaID);
      },
    },
    {
      text: t(translations.CustomKPI.TableMakePrimary),
      img: primaryImg,
      imgWhite: primaryWhiteImg,
      onClick: () => {
        if (isPrimary || !kpi.isActive) return;
        dispatch(MakePrimaryKPIAC(kpi.FormulaID));
      },
    },
  ];
  return (
    <Styled.Wrapper>
      <Styled.WrapperBackground onClick={onClose} />
      <Styled.WrapperPoints>
        {editPoint.map((props) => (
          <PointEditSetting
            key={props.text}
            {...props}
            isPrimary={isPrimary || !kpi.isActive}
          />
        ))}
      </Styled.WrapperPoints>
    </Styled.Wrapper>
  );
};

export default EditSetting;
