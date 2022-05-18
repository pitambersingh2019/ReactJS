import { FC, useMemo } from "react";
import arrow from "../../../../assets/img/Arow_dropdown.svg";
import { ISearchKpis } from "../../../../reducer/types";
import { translations } from "../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import * as Styled from "./style";

interface IProps {
  departmentName: string;
  NumberOfKPIs: number;
  open: boolean;
  searchKPILength: ISearchKpis[];
}

const InfoFactory: FC<IProps> = ({
  departmentName,
  NumberOfKPIs,
  open,
  searchKPILength,
}) => {
  const { t } = useTranslation();

  const numberOfKPIs = useMemo(() => {
    return searchKPILength.find(
      (item: ISearchKpis) => item.departmentName === departmentName
    )?.numberOfKPIs;
  }, [searchKPILength, departmentName]);

  const title = useMemo(() => {
    let number = numberOfKPIs ? numberOfKPIs : NumberOfKPIs;
    let text =
      number > 1
        ? t(translations.CustomKPI.KPIsTitle)
        : t(translations.CustomKPI.KPITitle);
    return `${number} ${text}`;
  }, [numberOfKPIs, NumberOfKPIs]);

  return (
    <Styled.FirstColumn>
      <Styled.ArrowWrapper open={open}>
        <img src={arrow} alt="" />
      </Styled.ArrowWrapper>
      <Styled.KPINameWrapper>
        <Styled.KPIName>{departmentName}</Styled.KPIName>
        <Styled.KPICount>{title}</Styled.KPICount>
      </Styled.KPINameWrapper>
    </Styled.FirstColumn>
  );
};

export default InfoFactory;
