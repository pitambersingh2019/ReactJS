import {
  ColumnChooserContainer,
  ColumnChooserIcon,
} from "./column-chooser.styles";
import icon from "../../../assets/row-chooser.svg";

export default function ColumnChooser() {
  return (
    <ColumnChooserContainer>
      <ColumnChooserIcon src={icon} alt="chooser icon" />
    </ColumnChooserContainer>
  );
}
