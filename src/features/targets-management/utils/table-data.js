import { Translation } from "react-i18next";
import { translations } from "../../../locales/translations";
import CellFixed from "../components/CellFixed/CellFixed";
import EditableCell from "../components/EditableCell/EditableCell";
import ExpandableCell from "../components/ExpandableCell/ExpandableCell";
import HeaderFixed from "../components/HeaderFixed/HeaderFixed";
import LastColumnHeader from "../components/LastColumnHeader/LastColumnHeader";
import SaveCancelIcons from "../components/SaveCancelIcons/SaveCancelIcons";
import RankedCell from "../components/RankedCell/RankedCell";

const convertToPercentage = (number) => Math.round(number * 100) + "%";

const createTargetsObj = (targetKeys, targetValues) => {
  const obj = {};
  for (const target of targetKeys) {
    obj[target] = convertToPercentage(targetValues[target]);
  }
  return obj;
};

export const prepareTableData = (data) => {
  const targets = data.KpiTargetName.map(({ Name }) => Name);

  const { DepartmentName, IsFixedTarget } = data.AllFactory[0].DepartmentTarget;

  return [
    {
      levels: DepartmentName,
      IsFixedTarget: IsFixedTarget,
      ...createTargetsObj(targets, data.AllFactory[0].DepartmentTarget),
      subRows: data.AllFactory.slice(1).map(
        ({ DepartmentTarget, DepartmentMachines }, idx) => ({
          levels: DepartmentTarget.DepartmentName,
          IsFixedTarget: DepartmentTarget.IsFixedTarget,
          ...createTargetsObj(targets, DepartmentTarget),
          bgStyle: idx % 2 === 0,
          DepartmentID: DepartmentTarget.ID,
          subRows: Object.values(DepartmentMachines).map(
            ({ MachineName, IsFixedTarget, MachineRank, ID, ...rest }) => ({
              levels: MachineName,
              IsFixedTarget,
              ...createTargetsObj(targets, rest),
              bgStyle: idx % 2 === 0,
              MachineRank,
              MachineID: ID,
            })
          ),
        })
      ),
    },
  ];
};

export const prepareColumns = (data) => {
  const columnsData = [
    {
      Header: HeaderFixed,
      accessor: "IsFixedTarget",
      Cell: function CustomCell({ value, ...otherProps }) {
        return <CellFixed value={value} {...otherProps} />;
      },
    },
    {
      Header: (
        <Translation>
          {(t) => t(translations.TargetsManagement.Ranked)}
        </Translation>
      ),
      accessor: "MachineRank",
      Cell: RankedCell,
    },
  ].concat(
    data.KpiTargetName.map((item) =>
      item.Name !== "PEETarget" && item.Name !== "OEETarget"
        ? {
            Header: item.LName,
            accessor: item.Name,
            Cell: EditableCell,
          }
        : {
            Header: item.LName,
            accessor: item.Name,
          }
    )
  );

  const lastColumn = [
    {
      Header: function lastHeader() {
        return <LastColumnHeader />;
      },
      accessor: "chooser",
      Cell: SaveCancelIcons,
    },
  ];

  return [
    {
      accessor: "levels",
      Header: (
        <Translation>
          {(t) => t(translations.TargetsManagement.Levels)}
        </Translation>
      ),
      Cell: ExpandableCell,
    },
  ]
    .concat(columnsData)
    .concat(lastColumn);
};

export const hiddenColumns = (data) => {
  return data.KpiTargetName.filter(({ IsActive }) => !IsActive).map(
    ({ Name }) => Name
  );
};
