import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import useProductionParametersTableData from "../../../hooks/useProductionParametersTableData";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Accordion from "../../shared/Accordion/Accordion";
import Summary from "./Summary/Summary";
import Table from "../../shared/Table/Table";
import { PRODUCTION_PARAMETERS_DRAWER_ID } from "../../../constants";
import {
  setInitProductionParametersTableData,
  setProductionParametersTableData,
  updateDrawerExpanded,
} from "../../../redux/slice";
import { useCallback, useEffect, useState } from "react";

export default function ProductionParametersAccordion() {
  const [showBarOnScroll, setShowBarOnScroll] = useState(true);

  const dispatch = useAppDispatch();
  const {
    productRecipeJob,
    referenceRecipeJob,
    showReference,
    expandedDrawers,
    productionParametersTableData,
  } = useAppSelector((state) => state.jobRecipe);

  const { columns, tableData } = useProductionParametersTableData({
    data: productRecipeJob,
    referenceJobRecipeData: referenceRecipeJob,
  });

  const { t } = useTranslation();

  const expanded = expandedDrawers.find(
    (drawer) => drawer.drawerId === PRODUCTION_PARAMETERS_DRAWER_ID
  )?.expanded;

  const onToggleExpanded = () => {
    dispatch(
      updateDrawerExpanded({
        drawerId: PRODUCTION_PARAMETERS_DRAWER_ID,
        expanded: !expanded,
      })
    );
  };

  const updateData = (rowIndex: number, columnId: string, value: string) => {
    const newData = productionParametersTableData.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...productionParametersTableData[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    });
    dispatch(setProductionParametersTableData(newData));
  };

  useEffect(() => {
    dispatch(setProductionParametersTableData(tableData));
    dispatch(setInitProductionParametersTableData(tableData));
  }, [dispatch, tableData]);

  const onScroll = useCallback(
    (show: boolean) => {
      if (show !== showBarOnScroll) {
        setShowBarOnScroll(show);
      }
    },
    [showBarOnScroll]
  );

  return (
    <Accordion
      summaryComponent={
        <Summary title={t(translations.JobRecipe.ProductionParameters)} />
      }
      contentComponent={
        <Table
          columns={columns}
          data={productionParametersTableData}
          showReference={showReference}
          updateData={updateData}
          showBarOnScroll={showBarOnScroll}
        />
      }
      expanded={expanded}
      updateExpanded={onToggleExpanded}
      handleScroll={onScroll}
    />
  );
}
