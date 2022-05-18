import { TimeOption, useTimeFrame } from "../../../../../context/useTimeFrame";
import CustomOptionItem from "../CustomOptionItem/CustomOptionItem";
import { OptionItem, TimeFrameModalContainer } from "./time-frame-modal.styles";

type TimeFrameModalProps = {
  onCloseModal: () => void;
};

export default function TimeFrameModal({ onCloseModal }: TimeFrameModalProps) {
  const {
    timeFrameOptions,
    setTimeFrameSelectedOption,
    timeFrameSelectedOption,
  } = useTimeFrame();

  const onOptionClick = (option: TimeOption) => {
    setTimeFrameSelectedOption(option);
    option.label !== "Custom" && onCloseModal();
  };
  return (
    <TimeFrameModalContainer>
      {timeFrameOptions.map(({ value, label }) => (
        <div key={value} onClick={() => onOptionClick({ value, label })}>
          {value === "Custom" ? (
            <CustomOptionItem
              isSelected={value === timeFrameSelectedOption.value}
              label={label}
              onCloseModal={onCloseModal}
            />
          ) : (
            <OptionItem isSelected={value === timeFrameSelectedOption.value}>
              {label}
            </OptionItem>
          )}
        </div>
      ))}
    </TimeFrameModalContainer>
  );
}
