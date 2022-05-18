import { useState } from "react";
import DateTimePicker from "./DateTimePicker";
import ManualInput from "./ManualInput";
import { Container } from "./styles";

type DateTimePickerComponentProps = {
  label?: string;
  date?: Date;
  onChange: (date: Date) => void;
};

export default function DateTimePickerComponent({
  label,
  date,
  onChange,
}: DateTimePickerComponentProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const onHideDatePicker = () => {
    setShowDatePicker(false);
  };
  return (
    <Container>
      <ManualInput
        onShowDatePicker={onShowDatePicker}
        label={label}
        initDate={date}
        onChange={onChange}
      />
      {showDatePicker && (
        <DateTimePicker
          onClose={onHideDatePicker}
          onChange={onChange}
          initDate={date}
        />
      )}
    </Container>
  );
}
