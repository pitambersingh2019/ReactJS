import { useMemo } from "react";
import { Column } from "react-table";
import { Channel } from "../../slice/types";
import { sortTypes, filterTypes } from "../utils";
import { loadStateLang } from "../../../../AppStart";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

type useTableColumnsProps = {
  channelData: Channel;
};

export default function useTableColumns({ channelData }: useTableColumnsProps) {
  const { t } = useTranslation();
  const lang = JSON.parse(loadStateLang());
  const columns: Column<{}>[] = useMemo(() => {
    if (channelData?.ChannelNumber === 0) {
      return [
        {
          Header: t(translations.ProductRecipe.PARAMETER) || "",
          accessor: "PropertyEName",
          filter: filterTypes.defaultText,
          sortType: sortTypes.defaultSort,
          className: "propertyName",
          width: 400,
        },
        {
          Header: t(translations.ProductRecipe.VALUE) || "",
          accessor: "FValue",
          disableFilters: true,
          sortType: sortTypes.defaultSort,
        },
        {
          Header: t(translations.ProductRecipe.LOWER_LIMIT) || "",
          accessor: "LValue",
          disableFilters: true,
          sortType: sortTypes.defaultSort,
        },
        {
          Header: t(translations.ProductRecipe.UPPER_LIMIT) || "",
          accessor: "HValue",
          disableFilters: true,
          sortType: sortTypes.defaultSort,
        },
      ];
    } else {
      const materialColumns = [];
      const dummySplits = channelData?.channelSplit[0]?.splits;
      if (dummySplits) {
        materialColumns.push({
          Header: t(translations.ProductRecipe.SPLIT) || "",
          accessor: "SplitNumber",
          disableFilters: true,
          sortType: sortTypes.defaultSort,
        });
      }

      dummySplits?.map((split) => {
        if (split.RecipeFValue) {
          let columnHeader = {};
          columnHeader = {
            Header: lang === "eng" ? split.PropertyEName : split.PropertyHName,
            accessor: split.PropertyEName,
            filter: filterTypes.materialText,
            sortType: sortTypes.materialSort,
          };
          materialColumns.push(columnHeader);
        }
      });
      const filteredDuplicate = materialColumns.filter(
        (
          (set) => (column: Column) =>
            !set.has(column.Header) && set.add(column.Header)
        )(new Set())
      );

      return filteredDuplicate;
    }
  }, [channelData]);

  return columns;
}
