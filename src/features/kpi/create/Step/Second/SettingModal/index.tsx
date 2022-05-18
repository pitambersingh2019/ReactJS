import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PortalWrapper from "../../../../../../Component/CustomComponent/Portal";
import { KPIApi } from "../../../../api";
import {
  IDataGetResultSearchFields,
  IFilterLabels,
  IResponseFilter,
  TFilterMenu,
} from "../../../../api/types";
import Tabs from "../Tabs";
import GetFilter from "./GetFilter/inter";
import MenuPointModal from "./Machines/MenuPoint";
import setting from "./../../../../assets/img/Filter_modal.svg";
import { translations } from "../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import * as Styled from "./style";

type TNameFilterId = keyof IFilterLabels;

interface IProps {
  onClose: () => void;
  filterData: IResponseFilter;
  filter: IFilterLabels;
  clearFilter: (name: TNameFilterId) => void;
}

const getTabsStatus = (filter: IFilterLabels) => {
  const arrName: TNameFilterId[] = [
    "ClientIdFilter",
    "ERPJobDefFilter",
    "IsEndOfLineFilter",
    "MachineIdFilter",
    "MoldGroupFilter",
    "MoldIdFilter",
    "ProductGroupFilter",
    "ProductIdFilter",
    "ShiftNameFilter",
    "UserIdFilter",
  ];
  let status = false;
  arrName.forEach((name) => {
    if (filter[name].length !== 0) {
      status = true;
    }
  });
  return status;
};

const SettingModal: FC<IProps> = ({
  onClose,
  filterData,
  filter,
  clearFilter,
}) => {
  const [root] = useState(() => document.createElement("div"));
  const [openMenu, setOpenMenu] = useState<TFilterMenu>("Machines");
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<IDataGetResultSearchFields>([
    [],
    [],
    [],
    [],
  ]);
  const { t } = useTranslation();
  useEffect(() => {
    root.classList.add("settingPortal");
    document.body.appendChild(root);
    return () => {
      document.body.removeChild(root);
    };
  }, []);

  useEffect(() => {
    const reportId = filterData.Filters.find(
      (item) => item.Name === openMenu
    )?.ReportID;
    if (reportId) {
      setReportData([[], [], [], []]);
      setIsLoading(true);
      KPIApi.getResultSearchFields(reportId).then((response) => {
        setReportData(response.data);
        setIsLoading(false);
      });
    }
  }, [openMenu]);

  const onClickMenuPoint = (value: TFilterMenu) => {
    if (isLoading) return;
    setOpenMenu(value);
  };

  return createPortal(
    <PortalWrapper
      onClose={onClose}
      title={t(translations.CustomKPI.SecondStepFilterSetting)}
      imgTitle={setting}
    >
      {getTabsStatus(filter) && (
        <Styled.WrapperTabs>
          <Tabs tabs={filter} clearFilterID={clearFilter} isTooltip={false} />
        </Styled.WrapperTabs>
      )}
      <Styled.WrapperContent>
        <Styled.WrapperMenu>
          <Styled.LineWrapper>
            {filterData.Filters.map((item) => {
              return (
                <MenuPointModal
                  key={item.DisplayName}
                  text={item.DisplayName}
                  isActive={openMenu === item.Name}
                  onClick={onClickMenuPoint}
                  name={item.Name}
                />
              );
            })}
          </Styled.LineWrapper>
        </Styled.WrapperMenu>
        <Styled.WrapperFilter>
          <GetFilter
            openFilter={openMenu}
            filterData={filterData}
            dataTable={reportData}
          />
        </Styled.WrapperFilter>
      </Styled.WrapperContent>
      <Styled.ButtonWrapper>
        <Styled.Button onClick={onClose}>
          {t(translations.CustomKPI.DoneButtonTitle)}
        </Styled.Button>
      </Styled.ButtonWrapper>
    </PortalWrapper>,
    root
  );
};

export default SettingModal;
