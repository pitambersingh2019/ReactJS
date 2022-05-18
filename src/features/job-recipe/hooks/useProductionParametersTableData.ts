import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { translations } from "../../../locales/translations";
import ColumnFilter from "../components/shared/ColumnFilter/ColumnFilter";
import ParameterCell from "../components/ContentWrapper/ProductionParamatersAccordion/ProductionParameterTable/Cells/ParameterCell/ParameterCell";
import ValueCell from "../components/ContentWrapper/ProductionParamatersAccordion/ProductionParameterTable/Cells/ValueCell";
import { Channel } from "../ts";
import LowerLimitCell from "../components/ContentWrapper/ProductionParamatersAccordion/ProductionParameterTable/Cells/LowerLimitCell";
import UpperLimitCell from "../components/ContentWrapper/ProductionParamatersAccordion/ProductionParameterTable/Cells/UpperLimitCell";
import { loadStateLang } from "../../../AppStart";

type UseProductionParametersTableDataProps = {
  data: Channel[];
  referenceJobRecipeData: Channel[];
};

export default function useProductionParametersTableData({
  data,
  referenceJobRecipeData,
}: UseProductionParametersTableDataProps) {
  const { t } = useTranslation();
  const columns: Column<{}>[] = useMemo(
    () => [
      {
        accessor: "parameter",
        Header: t(translations.JobRecipe.Parameter) || "",
        Filter: ColumnFilter,
        filter: "includesString",
        Cell: ParameterCell,
        width: 400,
      },
      {
        accessor: "value",
        Header: t(translations.JobRecipe.Value) || "",
        disableFilters: true,
        Cell: ValueCell,
      },
      {
        accessor: "lowerLimit",
        Header: t(translations.JobRecipe.LowerLimit) || "",
        disableFilters: true,
        Cell: LowerLimitCell,
      },
      {
        accessor: "upperLimit",
        Header: t(translations.JobRecipe.UpperLimit) || "",
        disableFilters: true,
        Cell: UpperLimitCell,
      },
    ],
    [t]
  );

  const tableData = useMemo(() => {
    const referenceJobRecipeSplits =
      referenceJobRecipeData[0]?.channelSplit[0]?.splits;
    return data[0]?.channelSplit[0].splits.map((split) => {
      const refJobRecipe = referenceJobRecipeSplits?.find(
        (refSplit) => refSplit.PropertyID === split.PropertyID
      );
      const lang = JSON.parse(loadStateLang());
      return {
        parameter: lang === "eng" ? split.PropertyEName : split.PropertyHName,
        value: split.FValue,
        lowerLimit: split.LValue,
        upperLimit: split.HValue,
        ...split,
        referenceJobRecipeValue: refJobRecipe?.FValue,
        referenceJobRecipeLowerLimit: refJobRecipe?.LValue,
        referenceJobRecipeUpperLimit: refJobRecipe?.HValue,
      };
    });
  }, [data, referenceJobRecipeData]);

  return { columns, tableData };
}
