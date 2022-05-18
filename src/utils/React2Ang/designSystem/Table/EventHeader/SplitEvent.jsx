import React, { useMemo, useState } from "react";
import {
  Container,
  Wrapper,
  CloseIconStyled,
  TitleWrapper,
  Header,
  Title,
  ContentWrapper2,
  SubTitle,
  FooterStyled,
} from "./styles";
import moment from "moment";
import Button from "../../../../../Component/DesignSystem/Buttons";
import DatePicker from "../../../../../Component/DesignSystem/DatePicker";
import { DateFormat } from "../../../../../Component/DesignSystem/DatePicker/types";
import { apiCall } from "../../../../Network";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import PopUp from "../../../../../Component/DesignSystem/PopUp";
import ReactDOM from "react-dom";
function ReportStopEvent({ onClose, row }) {
  const [input, setInput] = useState({
    format: DateFormat.DD_MM_YY_HH_MM,
    inputString: "",
  });
  const { t } = useTranslation();
  const [showValidationPopup, setShowValidationPopup] = useState({
    value: false,
    title: t(translations.EditableTable.Error),
    content: "",
  });
  const startTime = useMemo(() => {
    const d = moment(row.values.EventTime);
    if (d.isValid()) return d.format("DD/MM/YYYY HH:mm:ss");
    return null;
  }, [row.values.EventTime]);
  const endtime = useMemo(() => {
    const d = moment(row.values.EndTime);
    if (d.isValid()) return d.format("DD/MM/YYYY HH:mm:ss");
    return null;
  }, [row.values.EndTime]);

  const handleDateChange = (dateobj) => {
    if (typeof dateobj === "object") {
      setInput((prev) => ({
        ...prev,
        inputString: dateobj.dateString,
      }));
    } else {
      setInput((prev) => ({ ...prev, inputString: dateobj }));
    }
  };
  const handleSplitEvent = () => {
    const formattedDate = moment(
      input.inputString,
      DateFormat.DD_MM_YY_HH_MM
    ).format("YYYY-MM-DD HH:mm:ss");
    const request = {
      EventID: row.values.ID,
      SplitTimestamp: formattedDate,
    };
    const compareDate = moment(input.inputString, "DD/MM/YYYY HH:mm:ss");
    if (startTime && endtime) {
      const notBetween =
        compareDate.diff(row.values.EventTime) < 0 ||
        compareDate.diff(row.values.EndTime) > 0;
      if (notBetween) {
        setShowValidationPopup((prev) => ({
          ...prev,
          content: t(
            translations.TABLE.SPLIT_TIME_MUST_BE_BETWEEN_START_END_TIME
          ),
          value: true,
        }));
        return;
      }
      apiCall("SplitStopEvent", "POST", request)
        .then((res) => {
          if (res.error !== null) {
            setShowValidationPopup((prev) => ({
              ...prev,
              content: res.error.ErrorDescription,
              value: true,
            }));
          } else {
            onClose();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Container>
      <Wrapper>
        <Header>
          <TitleWrapper>
            <Title>Split Event Retroactively</Title>
          </TitleWrapper>
          <CloseIconStyled onClick={onClose} />
        </Header>
        <ContentWrapper2>
          <SubTitle>Start Time: {startTime}</SubTitle>
          <SubTitle>End Time: {endtime}</SubTitle>
          <DatePicker
            TitleText="Split time"
            selected={input}
            required={false}
            onDateChange={handleDateChange}
          />
        </ContentWrapper2>
        <FooterStyled>
          <Button
            label="Save"
            variant="purple"
            onClick={handleSplitEvent}
            // disabled={!selectedReason}
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
