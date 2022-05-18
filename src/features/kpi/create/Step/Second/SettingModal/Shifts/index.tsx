import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { IShiftsDef } from "../../../../../api/types";
import { ISecondStep } from "../../../../types";
import HeaderSetting from "../SettingComponents/HeaderSetting";
import ItemShift from "./Item";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import * as Styled from "./style";

interface IData {
  select: IShiftsDef[];
  type: number[];
}

interface IProps {
  shifts: IShiftsDef[];
  selectShifts: string[];
  setSelectFilter: Dispatch<SetStateAction<ISecondStep>>;
}

const getTypes = (shifts: IShiftsDef[]) => {
  const setShifts: number[] = [];
  shifts.forEach((item) => {
    if (setShifts.includes(item.ShiftType)) return;
    setShifts.push(item.ShiftType);
  });

  return setShifts;
};

const Shifts: FC<IProps> = ({ shifts, selectShifts, setSelectFilter }) => {
  const [data, setData] = useState<IData>({
    type: getTypes(shifts),
    select: [],
  });

  const [statusAll, setStatusAll] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setStatusAll(
      shifts.filter(
        (item) =>
          !data.select.find((itemD) => itemD.ShiftName === item.ShiftName)
      ).length === 0
    );
  }, [data.select]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      select: shifts.filter((item) => selectShifts.includes(item.ShiftName)),
    }));
  }, [selectShifts]);

  const onSelect = (names: string[]) => {
    let newSelect = [...data.select];
    for (let i = 0; i < names.length; i++) {
      const day = shifts.find((item) => item.ShiftName === names[i]);
      if (day) {
        if (newSelect.find((item) => item.ShiftName === day.ShiftName)) {
          newSelect = newSelect.filter(
            (item) => item.ShiftName !== day.ShiftName
          );
        } else {
          newSelect = [...newSelect, day];
        }
      }
    }

    setSelectFilter((prev) => {
      return {
        ...prev,
        filter: {
          ...prev.filter,
          ShiftNameFilter: newSelect.map((item) => ({
            ID: 0,
            GroupID: item.ShiftType,
            GroupName: item.ShiftTypeName,
            Name: item.ShiftName,
          })),
        },
      };
    });
  };

  const onClickAll = () => {
    setSelectFilter((prev) => {
      return {
        ...prev,
        filter: {
          ...prev.filter,
          ShiftNameFilter: statusAll
            ? []
            : shifts.map((item) => ({
                ID: 0,
                GroupID: item.ShiftType,
                GroupName: item.ShiftTypeName,
                Name: item.ShiftName,
              })),
        },
      };
    });
  };

  return (
    <Styled.Wrapper>
      <HeaderSetting
        title={t(translations.CustomKPI.SecondStepShiftTypeTitle)}
        status={statusAll}
        onChange={onClickAll}
      />
      <Styled.ItemsWrapper>
        {data.type.map((item) => (
          <ItemShift
            key={"Shift " + item}
            select={data.select}
            onSelect={onSelect}
            shiftName={t(translations.CustomKPI.SecondStepShiftTitle) + item}
            dayName={shifts
              .filter((itemS) => itemS.ShiftType === item)
              .map((item) => item.ShiftName)}
          />
        ))}
      </Styled.ItemsWrapper>
    </Styled.Wrapper>
  );
};

export default Shifts;
