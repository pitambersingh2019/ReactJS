import calendarIcon from "../../../../../../assets/icons/time-range.svg";
import { useState } from "react";
import TimeFrameModal from "./TimeFrameModal/TimeFrameModal";
import { ClickAwayListener } from "@material-ui/core";
import {
  ArrowIcon,
  CalendarIcon,
  TimeFrameContainer,
  TimeFrameLabel,
} from "./time-frame.styles";
import { useTimeFrame } from "../../../../context/useTimeFrame";
import { useCustomTimeFrame } from "../../../../context/useCustomTimeFrame";
import moment from "moment";
import { TIME_FRAME_DATE_FORMAT } from "../../../../constants";
import arrowIcon from "../../../../../../assets/icons/Arowdropdown.svg";

export default function TimeFrame() {
  const [showModal, setShowModal] = useState(false);
  const { timeFrameSelectedOption } = useTimeFrame();
  const {
    dates: { customStartDate, customEndDate },
  } = useCustomTimeFrame();

  const getLabel = () => {
    if (timeFrameSelectedOption.value !== "Custom") {
      return timeFrameSelectedOption.label;
    }

    if (customStartDate && customEndDate) {
      return `${moment(customStartDate).format(
        TIME_FRAME_DATE_FORMAT
      )} - ${moment(customEndDate).format(TIME_FRAME_DATE_FORMAT)}`;
    }

    return timeFrameSelectedOption.label;
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <TimeFrameContainer>
      <CalendarIcon
        src={calendarIcon}
        alt="Calendar icon"
        onClick={onShowModal}
      />
      <TimeFrameLabel>
        <span onClick={onShowModal}>{getLabel()}</span>
        <ArrowIcon src={arrowIcon} alt="arrow icon" onClick={onShowModal} />
        {showModal && (
          <ClickAwayListener onClickAway={onCloseModal}>
            <div>
              <TimeFrameModal onCloseModal={onCloseModal} />
            </div>
          </ClickAwayListener>
        )}
      </TimeFrameLabel>
    </TimeFrameContainer>
  );
}
