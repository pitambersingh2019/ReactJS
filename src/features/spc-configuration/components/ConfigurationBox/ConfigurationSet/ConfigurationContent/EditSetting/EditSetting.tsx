import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import { SaveParamsSetting, UpdateSPCTemplate } from "../../../../../slice";
import {
  ControllerField,
  SPCTemplate,
  TestText,
  SPCTestParam,
} from "../../../../../slice/types";
import {
  selectSPCTemplates,
  selectSPCTestsText,
} from "../../../../../slice/selectors";
import SingleSelectWithDelete from "../../../../../../../Component/DesignSystem/DropDown/SingleSelectWithDelete";
import { DropDownMode } from "../../../../../../../Component/DesignSystem/DropDown/types";
import CheckBox from "../../../../../../../Component/DesignSystem/CheckBox";
import Button from "../../../../../../../Component/DesignSystem/Buttons";
import CloseIcon from "@material-ui/icons/Close";
import ApplyModal from "../../../../../components/Modal/ApplyModal";
import DeleteModal from "../../../../../components/Modal/DeleteModal";
import SaveModal from "../../../../../components/Modal/SaveModal";
// import Save from "@material-ui/icons/Save";
import {
  StyledEditContentWrapper,
  StyledSPCTemplateWrapper,
  StyledSPCTemplateLabel,
  StyledTestParamsWrapper,
  StyledTestParamsHeader,
  StyledHeaderTitle,
  StyledSaveAsTemplate,
  StyledParametersRow,
  StyledInputField,
  StyledOthersWrapper,
  StyledOtherContent,
  StyledOtherContentTitle,
  StyledButtonWrapper,
  StyledOtherInputField,
  TitleReq,
  InputLabel,
} from "./edit-setting.styles";

interface EditSettingProps {
  testData: ControllerField;
  onEditSetting: (id: number) => void;
}
const EditSetting: React.FC<EditSettingProps> = ({
  testData,
  onEditSetting,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const SPCTemplates = useSelector(selectSPCTemplates);
  const TestsText = useSelector(selectSPCTestsText);
  const [templateList, setTemplateList] = useState<
    { label: string; value: number }[]
  >([]);
  const [testParamsData, setTestParamsData] = useState(testData);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDeleteModalID, setShowDeleteModalID] = useState<
    number | undefined
  >(undefined);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplateOption, setSelectedTemplateOption] = useState<
    { label: string; value: number } | undefined
  >();

  useEffect(() => {
    let temp: {
      label: string;
      value: number;
    }[] = [];
    SPCTemplates.forEach((ele: SPCTemplate) => {
      temp.push({
        label: ele.TemplateName,
        value: ele.TemplateID,
      });
    });
    if (selectedTemplateOption && SPCTemplates.length > 0) {
      let selectedOption = SPCTemplates.find(
        (ele: SPCTemplate) => ele.TemplateID === selectedTemplateOption.value
      );
      setSelectedTemplateOption({
        value: selectedOption.TemplateID,
        label: selectedOption.TemplateName,
      });
    }
    setTemplateList(temp);
  }, [SPCTemplates]);

  const getTestParamText = (id: number, param: number) => {
    let initialText: string | undefined = TestsText.find((ele: TestText) => {
      return ele.TestID === id;
    })?.TestText;
    // return initialText?.replace(/\[(.*?)\]/, String(param));
    return initialText
      ?.replace(/\[testParam]/, String(param))
      .replace(/\[testParam-1]/, String(param));
  };

  const handleParamsChange = (id: number, name: string, value: number) => {
    let tempParams: SPCTestParam[] = Object.assign(
      [],
      testParamsData.SPCTestParams
    );
    let index = tempParams.findIndex((ele: SPCTestParam) => ele.TestID === id);
    tempParams[index] = {
      TestID: tempParams[index].TestID,
      TestIsActive:
        name === "active"
          ? !tempParams[index].TestIsActive
          : tempParams[index].TestIsActive,
      TestParam: name === "param" ? value : tempParams[index].TestParam,
    };
    setTestParamsData({ ...testParamsData, SPCTestParams: tempParams });
  };

  const handleOtherChange = (name: string, value: number) => {
    if (name === "LimitsBySigmas") {
      setTestParamsData({
        ...testParamsData,
        SPCLimitsBySigmas: value,
      });
    } else if (name === "BySamplesAmount") {
      setTestParamsData({
        ...testParamsData,
        SPCBySamplesAmount: value,
      });
    }
  };

  const handleSaveSettings = () => {
    dispatch(SaveParamsSetting(testParamsData));
  };

  const handleSelectTemplate = (
    item: { label: string; value: number } | undefined
  ) => {
    if (item) {
      let templateParams = SPCTemplates.find(
        (ele: SPCTemplate) => ele.TemplateID === item.value
      );
      setSelectedTemplateOption(item);
      setTemplateName(templateParams.TemplateName);
      setTestParamsData({
        ...testParamsData,
        SPCTestParams: templateParams.SPCTestParams,
      });
    } else {
      setTemplateName("");
      setSelectedTemplateOption(undefined);
      setTestParamsData(testData);
    }
  };

  const onDeleteTemplate = (item: { label: string; value: number }) => {
    setShowDeleteModalID(item.value);
  };

  const handleDeleteTemplate = () => {
    showDeleteModalID &&
      dispatch(
        UpdateSPCTemplate({
          TemplateID: showDeleteModalID,
          TemplateName: "",
          UpsertType: 1,
          Params: { SPCTestParams: [] },
        })
      );
    setShowDeleteModalID(undefined);
  };

  const handleSavetemplate = () => {
    if (selectedTemplateOption) {
      dispatch(
        UpdateSPCTemplate({
          TemplateID: selectedTemplateOption.value,
          TemplateName: templateName,
          UpsertType: 3,
          Params: { SPCTestParams: testParamsData.SPCTestParams },
        })
      );
    } else {
      dispatch(
        UpdateSPCTemplate({
          TemplateID: 0,
          TemplateName: templateName,
          UpsertType: 2,
          Params: { SPCTestParams: testParamsData.SPCTestParams },
        })
      );
    }
    setShowSaveModal(false);
  };

  return (
    <StyledEditContentWrapper>
      <CloseIcon
        onClick={() => onEditSetting(testParamsData.ControllerFieldID)}
      />
      <StyledSPCTemplateWrapper>
        <StyledSPCTemplateLabel>
          {t(translations.SPC.LOAD_SAVED_SPC_TEMPLATE)}
        </StyledSPCTemplateLabel>
        <SingleSelectWithDelete
          placeholder={t(translations.SPC.SELECT_A_TEMPLATE)}
          required={false}
          selectedItem={selectedTemplateOption}
          onSelect={handleSelectTemplate}
          onDelete={onDeleteTemplate}
          TitleText={""}
          items={templateList}
          mode={DropDownMode.selectable}
        />
      </StyledSPCTemplateWrapper>
      <StyledTestParamsWrapper>
        <StyledTestParamsHeader>
          <StyledHeaderTitle>
            {t(translations.SPC.TEST_PARAMETERS)}
          </StyledHeaderTitle>
          <StyledSaveAsTemplate onClick={() => setShowSaveModal(true)}>
            {t(translations.SPC.SAVE_AS_SPC_TEMPLATE)}
          </StyledSaveAsTemplate>
        </StyledTestParamsHeader>
        {testParamsData.SPCTestParams.map((testParam) => (
          <StyledParametersRow key={testParam.TestID}>
            <CheckBox
              onChange={() =>
                handleParamsChange(
                  testParam.TestID,
                  "active",
                  testParam.TestParam
                )
              }
              checked={testParam.TestIsActive}
              TitleText={getTestParamText(
                testParam.TestID,
                testParam.TestParam
              )}
              height={16}
            />
            <StyledInputField
              value={testParam.TestParam ? testParam.TestParam : 0}
              onChange={(e) =>
                handleParamsChange(
                  testParam.TestID,
                  "param",
                  e.target.value ? Number(e.target.value) : 0
                )
              }
              type="tel"
              pattern="[0-9]*"
              disabled={!testParam.TestIsActive}
            />
          </StyledParametersRow>
        ))}
      </StyledTestParamsWrapper>
      <StyledOthersWrapper>
        <StyledOtherContent>
          <StyledOtherContentTitle>
            {t(translations.SPC.PROCESS_LIMITS)}
          </StyledOtherContentTitle>
          <InputLabel>{t(translations.SPC.BY_X_STD)}</InputLabel>
          <StyledOtherInputField
            required
            type="tel"
            pattern="[0-9]*"
            value={
              testParamsData.SPCLimitsBySigmas
                ? testParamsData.SPCLimitsBySigmas
                : 0
            }
            onChange={(e) =>
              handleOtherChange(
                "LimitsBySigmas",
                e.target.value ? Number(e.target.value) : 0
              )
            }
          />
          <TitleReq>* Required</TitleReq>
        </StyledOtherContent>
        <StyledOtherContent>
          <StyledOtherContentTitle>
            {t(translations.SPC.TEXTS_OF_SPC_KPI_CALC)}
          </StyledOtherContentTitle>
          <InputLabel>{t(translations.SPC.LAST_X_TESTS)}</InputLabel>
          <StyledOtherInputField
            required
            type="tel"
            pattern="[0-9]*"
            value={
              testParamsData.SPCBySamplesAmount
                ? testParamsData.SPCBySamplesAmount
                : 0
            }
            onChange={(e) =>
              handleOtherChange(
                "BySamplesAmount",
                e.target.value ? Number(e.target.value) : 0
              )
            }
          />
          <TitleReq>* Required</TitleReq>
        </StyledOtherContent>
      </StyledOthersWrapper>
      <StyledButtonWrapper>
        <Button
          onClick={() => setShowApplyModal(true)}
          label={t(translations.SPC.APPLY_TO_PARAMETERS)}
          variant="secondary"
          size="lg"
        />
        <Button
          onClick={handleSaveSettings}
          label={t(translations.SPC.SAVE_SETTINGS)}
          size="lg"
        />
      </StyledButtonWrapper>
      {showApplyModal && (
        <ApplyModal closeModal={setShowApplyModal} params={testParamsData} />
      )}
      {showDeleteModalID && (
        <DeleteModal
          closeModal={setShowDeleteModalID}
          confirmDeleteTemplate={handleDeleteTemplate}
        />
      )}
      {showSaveModal && (
        <SaveModal
          closeModal={setShowSaveModal}
          templateName={templateName}
          handleTemplateName={setTemplateName}
          saveTemplate={handleSavetemplate}
        />
      )}
    </StyledEditContentWrapper>
  );
};

export default EditSetting;
