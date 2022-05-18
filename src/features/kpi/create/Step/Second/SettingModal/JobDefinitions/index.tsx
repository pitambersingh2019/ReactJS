import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { IJobDef } from "../../../../../api/types";
import { ISecondStep } from "../../../../types";
import HeaderSetting from "../SettingComponents/HeaderSetting";
import GroupView from "./Items";
import { translations } from "../../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import * as Styled from "./style";

interface IProps {
  definitions: IJobDef[];
  selectJob: number[];
  setSelectFilter: Dispatch<SetStateAction<ISecondStep>>;
}

const getStatusAll = (selectItem: IJobDef[], definitions: IJobDef[]) => {
  let status = true;
  definitions.forEach((item) => {
    if (!selectItem.find((itemS) => itemS.id === item.id)) {
      status = false;
    }
    return;
  });
  return status;
};

const JobDefinitions: FC<IProps> = ({
  definitions,
  setSelectFilter,
  selectJob,
}) => {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectItem, setSelectItem] = useState<IJobDef[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    setSelectItem(definitions.filter((item) => selectJob.includes(item.id)));
  }, [selectJob]);

  useEffect(() => {
    setIsSelectAll(getStatusAll(selectItem, definitions));
  }, [selectItem]);

  const onClickSelectAll = () => {
    setSelectFilter((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        ERPJobDefFilter: isSelectAll
          ? []
          : definitions.map((item) => ({
              ID: item.id,
              GroupID: 0,
              GroupName: "",
              Name: item.DisplayName,
            })),
      },
    }));
    setIsSelectAll((prev) => !prev);
  };

  const onClickName = (id: number) => {
    const job = definitions.find((item) => item.id === id);
    let newJobDef = [...selectItem];
    if (!job) return;
    if (newJobDef.find((item) => item.id === id)) {
      newJobDef = newJobDef.filter((item) => item.id !== id);
    } else {
      newJobDef = [...newJobDef, job];
    }

    if (!job) return;
    setSelectFilter((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        ERPJobDefFilter: newJobDef.map((item) => ({
          ID: item.id,
          GroupID: 0,
          GroupName: "",
          Name: item.DisplayName,
        })),
      },
    }));
  };

  return (
    <Styled.Wrapper>
      <HeaderSetting
        status={isSelectAll}
        onChange={onClickSelectAll}
        title={t(translations.CustomKPI.SecondStepJobDefinitionsTitle)}
      />
      <Styled.WrapperScroll>
        <GroupView
          selected={selectItem.map((item) => ({
            id: item.id,
            name: item.DisplayName,
          }))}
          allItem={definitions.map((item) => ({
            id: item.id,
            name: item.DisplayName,
          }))}
          onClickName={onClickName}
        />
      </Styled.WrapperScroll>
    </Styled.Wrapper>
  );
};

export default JobDefinitions;
