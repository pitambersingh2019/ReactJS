import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Settings from "@material-ui/icons/Settings";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import Button from "../../../../Component/DesignSystem/Buttons";
import { ApplyParamsSetting } from "../../slice";
import { selectTreeDepartments } from "../../slice/selectors";
import { TreeData, SelectedMachine, ControllerField } from "../../slice/types";
import {
  StyledModalBackground,
  StyledModalContentWrapper,
  StyledModalContent,
  StyledModalHeader,
  StyleModalHeaderTitle,
  StyledButtonGroup,
  StyledModalDescription,
  StyledTreeWrapper,
} from "./modal.styles";
import TreeSelect from "../Tree/TreeSelect";

interface ApplyModalProps {
  params: ControllerField;
  closeModal: (value: boolean) => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ closeModal, params }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const departmentTree = useSelector(selectTreeDepartments);
  const [treeData, setTreeData] = useState<TreeData[]>([]);
  const [fieldIDList, setFieldIDList] = useState<number[]>([]);
  const [selectedList, setSelectedList] = useState<SelectedMachine[]>();
  const [expandedOption, setExpandedOption] = useState({});
  useEffect(() => {
    let tempTreeData = departmentTree[0];
    let tempSub3: TreeData[] = [];
    let tempSub2: TreeData[] = [];
    tempTreeData.subOptions.map((ele) => {
      let tempSub1: TreeData[] = [];
      ele.subOptions.map((ele1) => {
        let tempSub: TreeData[] = [];
        ele1.SPCControllerFields?.map((ele2) => {
          tempSub.push({
            id: ele2.ControllerFieldID,
            name: ele2.ControllerFieldName,
            parentID: ele1.id,
            subOptions: [],
          });
        });
        ele1 = { ...ele1, subOptions: tempSub };
        tempSub1.push(ele1);
      });
      ele = { ...ele, subOptions: tempSub1 };
      tempSub2.push(ele);
    });
    tempTreeData = { ...tempTreeData, subOptions: tempSub2 };
    tempSub3.push(tempTreeData);
    setTreeData(tempSub3);
    setExpandedOption({ [tempTreeData.id]: {} });
  }, [departmentTree]);

  const handleData = useCallback((checkedList: SelectedMachine[]) => {
    setSelectedList(checkedList);
    let idList = checkedList.map((obj) => obj.id);
    setFieldIDList(idList);
  }, []);

  const handleApplySetting = () => {
    dispatch(ApplyParamsSetting({ Params: params, ids: fieldIDList }));
    closeModal(false);
  };

  return (
    <StyledModalBackground>
      <StyledModalContentWrapper width="640px" height="640px">
        <StyledModalContent>
          <StyledModalHeader>
            <Settings
              style={{
                fontSize: "24px",
                color: "#5900d3",
                border: "1px solid #5900d3",
                borderRadius: "50%",
                padding: "2px",
              }}
            />
            <StyleModalHeaderTitle>
              {t(translations.SPC.APPLY_SPC_SETTING_TO_PARAMETERS)}
            </StyleModalHeaderTitle>
          </StyledModalHeader>
          <StyledModalDescription>
            {t(translations.SPC.APPLY_SPC_SETTING_DESCRIPTION)}
          </StyledModalDescription>
          <StyledTreeWrapper>
            <TreeSelect
              toppingOptions={treeData}
              selectedIDS={selectedList}
              handleData={handleData}
              expandedOption={expandedOption}
            />
          </StyledTreeWrapper>
        </StyledModalContent>
        <StyledButtonGroup justify="right">
          <Button
            onClick={() => closeModal(false)}
            label={t(translations.SPC.CANCEL)}
            size="md"
            variant="secondary"
          />
          <Button
            onClick={handleApplySetting}
            label={t(translations.SPC.APPLY_SETTINGS)}
            size="md"
          />
        </StyledButtonGroup>
      </StyledModalContentWrapper>
    </StyledModalBackground>
  );
};

export default ApplyModal;
