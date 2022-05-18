import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Wrapper,
  CloseIconStyled,
  TitleWrapper,
  Header,
  Title,
  ContentWrapper,
  FooterStyled,
} from "./styles";
import ReactDOM from "react-dom";
import Button from "../../../../../Component/DesignSystem/Buttons";
import SingleDropDown from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { apiCall } from "../../../../Network";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { isLocalLanguage } from "../../../../CommonFunctions";
import PopUp from "../../../../../Component/DesignSystem/PopUp";
// import { notifySuccessToast } from "../../../../../Component/Toast/ToastContainer";
function ReportStopEvent({ onClose, machines, eventIDS }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { i18n, t } = useTranslation();
  const [showValidationPopup, setShowValidationPopup] = useState({
    value: false,
    title: t(translations.EditableTable.Error),
    content: "",
  });

  const language = useMemo(() => (i18n ? i18n.language : "eng"), [i18n]);
  const reasons = useMemo(
    () =>
      selectedGroup
        ? selectedGroup.Reasons.map((elem) => ({
            ...elem,
            label: isLocalLanguage(language) ? elem.EName : elem.LName,

            value: elem.ID,
          }))
        : [],
    [language, selectedGroup]
  );
  const [selectedReason, setSelectedReason] = useState(null);

  const request = useMemo(
    () => ({
      machines: machines ?? [],
      isActive: true,
    }),
    [machines]
  );
  useEffect(() => {
    apiCall("GetEventReasonAndGroupsV2", "POST", request)
      .then((res) => {
        setGroups(
          res.EventsAndGroups.map((elem) => ({
            ...elem,
            label: isLocalLanguage(language) ? elem.EName : elem.LName,
            value: elem.ID,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [language, request]);

  const handleSelectedGroup = (item) => {
    setSelectedGroup(item);
    setSelectedReason(null);
  };
  const handleSelectReason = (item) => {
    setSelectedReason(item);
  };

  const handleSaveButton = () => {
    const request = {
      StopSubReasonID: selectedReason ? selectedReason.value : null,
      EventID: eventIDS,
    };
    apiCall("ReportMultiStopEvents", "POST", request)
      .then((res) => {
        if (res.error === null) {
          onClose();
        } else {
          setShowValidationPopup((prev) => ({
            ...prev,
            content: res.error.ErrorDescription,
            value: true,
            width: null,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Wrapper>
        <Header>
          <TitleWrapper>
            <Title>Report Stop Event</Title>
          </TitleWrapper>
          <CloseIconStyled onClick={onClose} />
        </Header>
        <ContentWrapper>
          <div style={{ width: "320px" }}>
            <SingleDropDown
              items={groups}
              TitleText={"Event Group"}
              placeholder={"Select Option"}
              selectedItem={selectedGroup}
              onSelect={handleSelectedGroup}
            />
          </div>
          <div style={{ width: "320px" }}>
            <SingleDropDown
              items={reasons}
              TitleText={"Event Reason"}
              placeholder={"Select Option"}
              selectedItem={selectedReason}
              onSelect={handleSelectReason}
            />
          </div>
        </ContentWrapper>
        <FooterStyled>
          <Button
            label="Save"
            variant="purple"
            onClick={handleSaveButton}
            disabled={!selectedReason}
            size="md"
          />
        </FooterStyled>
      </Wrapper>
      {showValidationPopup.value &&
        ReactDOM.createPortal(
          <PopUp
            TitleText={showValidationPopup.title}
            ContentText={showValidationPopup.content}
            ButtonLabel={t(translations.EditableTable.ButtonLabel)}
            width={showValidationPopup.width}
            onClosePopUp={() =>
              setShowValidationPopup((prev) => ({ ...prev, value: false }))
            }
          />,
          document.body
        )}
    </Container>
  );
}

export default ReportStopEvent;
