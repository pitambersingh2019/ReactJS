import { FC } from "react";
import InputDefault from "../../../../../../../../../Component/CustomComponent/InputDefault";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../../../locales/translations";
import * as Styled from "./style";

export type TGroup = "Ungrouped" | "Machine Type" | "Shifts Type";

interface IProps {
  groupName: TGroup[];
  selectGroup: TGroup;
  onClickGroupName: (name: TGroup) => void;
}

const GroupByWrapper: FC<IProps> = ({
  groupName,
  selectGroup,
  onClickGroupName,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Styled.Wrapper>
      <Styled.Title>
        <div>{t(translations.TasksManagement.GroupBy)}</div>
      </Styled.Title>
      <Styled.GroupNameWrapper>
        {groupName.map((item) => (
          <InputDefault
            key={item}
            type="radio"
            text={item}
            onClick={() => {
              onClickGroupName(item);
            }}
            isActive={selectGroup === item}
            color="#6d6dc5"
          />
        ))}
      </Styled.GroupNameWrapper>
      <Styled.Title>
        <div>{t(translations.CustomKPI.SecondStepSelectMachineTitle)}</div>
      </Styled.Title>
      <Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
    </Styled.Wrapper>
  );
};

export default GroupByWrapper;
