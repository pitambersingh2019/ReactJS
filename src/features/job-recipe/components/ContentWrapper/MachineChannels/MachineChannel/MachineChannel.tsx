import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { getCurrentUserId } from "../../../../../tasks-management/utils";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import useMachineSplitsTableData from "../../../../hooks/useMachineSplitsTableData";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setMachineSplitsTableData,
  setInitMachineSplitsTableData,
  updateDrawerExpanded,
} from "../../../../redux/slice";
import { MachineChannel, MachineSplitsTableRow } from "../../../../ts";
import Accordion from "../../../shared/Accordion/Accordion";
import Table from "../../../shared/Table/Table";
import ChannelSummary from "./ChannelSummary/ChannelSummary";

type MachineChannelProps = {
  machineMainChannel: MachineChannel;
};

export default function MainMachineChannel({
  machineMainChannel,
}: MachineChannelProps) {
  const jobId = useAppSelector((state) => state.jobRecipe.jobId);
  const isEditing = useAppSelector((state) => state.jobRecipe.isEditing);

  const key = `${getCurrentUserId()}-${jobId}-${
    machineMainChannel.Cahnnel
  }-hideEmptyLines`;
  const [hideEmptyLines, setHideEmptyLines] = useLocalStorage(key, true);

  const dispatch = useAppDispatch();
  const { showReference, expandedDrawers, machineSplitsTableData } =
    useAppSelector((state) => state.jobRecipe);

  const { columns, tableData } = useMachineSplitsTableData({
    data: machineMainChannel.Split,
  });
  const { t } = useTranslation();

  const channelNumber = machineMainChannel.Cahnnel;

  const channelName = `${t(translations.JobRecipe.Channel)} - ${channelNumber}`;

  const expanded = expandedDrawers.find(
    (drawer) => drawer.drawerId === channelNumber
  )?.expanded;

  const onToggleExpanded = () => {
    dispatch(
      updateDrawerExpanded({
        drawerId: channelNumber,
        expanded: !expanded,
      })
    );
  };

  const onToggleHideEmptyLines = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setHideEmptyLines(!hideEmptyLines);
  };

  const checkIsEmpty = (row: MachineSplitsTableRow) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { splitId, ...otherCells } = row;
    return Object.values(otherCells).some((cell) => {
      return cell.value !== "" && cell.value !== "[ - ]";
    });
  };

  const filteredTableData = hideEmptyLines
    ? machineSplitsTableData[channelNumber]?.filter(checkIsEmpty)
    : machineSplitsTableData[channelNumber];

  const updateData = (
    rowIndex: number,
    columnId: string,
    value: string,
    id?: number
  ) => {
    const newData = machineSplitsTableData[channelNumber]?.map((row, index) => {
      if (index === rowIndex) {
        //if material is empty, set catalog to empty
        //set batch to empty on each material change
        const updatesForMaterial = {
          catalog: {
            ...machineSplitsTableData[channelNumber][rowIndex].catalog,
            value: !value
              ? "[ - ]"
              : machineSplitsTableData[channelNumber][rowIndex].catalog.value,
          },
          batch: {
            ...machineSplitsTableData[channelNumber][rowIndex].batch,
            value: "",
          },
        };

        return {
          ...machineSplitsTableData[channelNumber][rowIndex],
          [columnId]: {
            // @ts-ignore
            ...machineSplitsTableData[channelNumber][rowIndex][columnId],
            value: value === undefined ? "[ - ]" : value,
            ...(id && { KeyValue: id }),
          },
          ...(columnId === "material" && updatesForMaterial),
        };
      }
      return row;
    });
    dispatch(
      setMachineSplitsTableData({
        channelNumber: channelNumber,
        values: newData,
      })
    );
  };

  useEffect(() => {
    dispatch(
      setMachineSplitsTableData({
        channelNumber: channelNumber,
        values: tableData,
      })
    );
    dispatch(
      setInitMachineSplitsTableData({
        channelNumber: channelNumber,
        values: tableData,
      })
    );
  }, [dispatch, channelNumber, tableData]);

  return (
    <Accordion
      summaryComponent={
        <ChannelSummary
          title={channelName}
          channelPC={machineMainChannel.CahnnelPC}
          hideEmptyLines={hideEmptyLines}
          onCheckboxToggle={onToggleHideEmptyLines}
        />
      }
      contentComponent={
        <Table
          columns={columns}
          data={filteredTableData}
          showReference={showReference}
          updateData={updateData}
          channelNumber={channelNumber}
        />
      }
      expanded={expanded}
      updateExpanded={onToggleExpanded}
      changeBorderColor={isEditing}
    />
  );
}
