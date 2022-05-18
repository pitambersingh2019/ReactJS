import { Radio, RadioButtonContainer } from "./check-cell.styles";

const CheckCell = (props) => {
  const selectedProps = props.row.getToggleRowSelectedProps();

  const onClick = () => {
    props.toggleAllRowsSelected(false);
    props.row.toggleRowSelected();
  };

  return (
    <RadioButtonContainer>
      <Radio
        type="radio"
        checked={selectedProps.checked}
        onClick={onClick}
        onChange={selectedProps.onChange}
      />
    </RadioButtonContainer>
  );
};

export default CheckCell;
